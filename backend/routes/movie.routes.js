import express from "express";
import { getMoviesByCategory, getSimilarMovies, getMovieDetails, getMovieTrailers, getTrendingMovies } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/:type/trending", getTrendingMovies);
router.get("/:type/:id/trailers", getMovieTrailers)
router.get("/:type/:id/details", getMovieDetails)
router.get("/:type/:id/similar", getSimilarMovies)
router.get("/:type/:category", getMoviesByCategory)

export default router;
