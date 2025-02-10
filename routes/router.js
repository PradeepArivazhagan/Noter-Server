import express from "express";
import {
  login,
  register,
  createNote,
  getNotes,
  editNote,
  getNote,
  deleteNote,
} from "../controllers/controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/notes", getNotes);
router.post("/notes/createNote", createNote);
router.put("/notes/editNote/:id", editNote);
router.get("/notes/editNote/:id", getNote);
router.delete("/notes/deleteNote/:id", deleteNote);

export default router;
