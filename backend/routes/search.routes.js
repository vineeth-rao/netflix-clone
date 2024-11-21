import express from "express";
import { searchContentByType, getSearchHistory, deleteItemFromSearchHistory } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/:type/:keyword", searchContentByType);
router.get("/history", getSearchHistory);
router.delete("/history/:id", deleteItemFromSearchHistory);
// router.get("/person/:keyword", searchPerson);

export default router;