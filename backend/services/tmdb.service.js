import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
  // const url = "https://api.themoviedb.org/3/authentication";
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMBDB_API_READ_ACCESS_TOKEN,
    },
  };

  const response = await axios.get(url,options);
  
  if(response.status !==200){
    throw new Error('Failed to fetch data from TMDB' + response.statusText);
  }
  return response.data;
};