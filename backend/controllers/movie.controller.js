import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovies(req, res) {
  try {
    const { type } = req.params;
    const url = `https://api.themoviedb.org/3/trending/${type}/day?language=en-US&include_adult=false`;
    const data = await fetchFromTMDB(url);
    console.log(data);
    const randomTrendingMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomTrendingMovie });
  } catch (error) {
    res.status(500).json({ success: false, content: "Internal Server Error" });
    console.log("Error in movie controller:" + error);
  }
}

export async function getMovieTrailers(req, res) {
  try {
    const { id, type } = req.params;
    const url = `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US&include_adult=false`;
    const data = await fetchFromTMDB(url);
    res.json({ success: true, content: data.results });
  } catch (error) {
    if (error.response.status === 404) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, content: "Internal Server Error" });
    console.log("Error in movie controller:" + error);
  }
}

export async function getMovieDetails(req, res) {
  try {
    const { id, type } = req.params;
    const url = `https://api.themoviedb.org/3/${type}/${id}`;
    const data = await fetchFromTMDB(url);
    res.json({ success: true, details: data });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).send(null);
    }
    console.log("Error in movie controller:" + error.message);
    return res
      .status(500)
      .json({ success: false, content: "Internal Server Error" });
  }
}

export async function getSimilarMovies(req, res) {
  try {
    const { id, type } = req.params;
    const url = `https://api.themoviedb.org/3/${type}/${id}/similar?&include_adult=false`;
    const data = await fetchFromTMDB(url);
    res.json({ success: true, content: data.results });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).send(null);
    }
    console.log("Error in movie controller:" + error.message);
    return res
      .status(500)
      .json({ success: false, content: "Internal Server Error" });
  }
}

export async function getMoviesByCategory(req, res) {
  try {
    const { category, type } = req.params;

    const url = `https://api.themoviedb.org/3/${type}/${category}?include_adult=false`;
    const data = await fetchFromTMDB(url);
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in movie controller:" + error.message);
    return res
      .status(500)
      .json({ success: false, content: "Internal Server Error" });
  }
}
