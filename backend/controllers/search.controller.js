import { response } from "express";
import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchContentByType(req, res) {
  const { type, keyword } = req.params;
  if (!["person", "movie", "tv"].includes(type))
    return res.status(404).json({ success: false, message: "Invalid Type" });
  const url = `https://api.themoviedb.org/3/search/${type}?query=${keyword}&include_adult=false&language=en-US&page=1`;

  try {
    const data = await fetchFromTMDB(url);
    console.log(data);
    if (data.results?.length === 0) {
      return res.status(404).send(null);
    }
    const checkHistory = await User.findOne({
      _id: req.user._id,
      "searchHistory.id": data.results[0].id, // Look for the specific ID in the searchHistory array
    });
    if (checkHistory) {
      await User.updateOne(
        {
          _id: req.user._id,
          "searchHistory.id": data.results[0].id, // Match the specific entry in the array
        },
        {
          $set: { "searchHistory.$.lastSearchDate": new Date() }, // Update the `searchedAt` field of the matched entry
        }
      );
    } else {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            image:
              type == "person"
                ? data.results[0].profile_path
                : data.results[0].poster_path,
            title:
              type == "movie" ? data.results[0].title : data.results[0].name,
            searchType: type,
            createdOn: new Date(),
            lastSearchDate: new Date(),
          },
        },
      });
    }
    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in search controller:" + error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    return res
      .status(200)
      .json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    console.log("Error in search history controller:" + error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function deleteItemFromSearchHistory(req, res) {
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });
    res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    console.log("Error in delete search history controller:" + error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function searchPerson(req, res) {
  const { type, q } = req.params;
  const url = `https://api.themoviedb.org/3/search/person?query=${q}&page=1`;

  try {
    const data = await fetchFromTMDB(url);
    if (data.results.lenght === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          type: "person",
        },
      },
    });
    return res.status(200).json({ success: true, result: data.results });
  } catch (error) {}
}
