import User from "../models/userModel.js";
import Note from "../models/noteModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register Controller
export const register = async (req, res) => {
  const { username, password, email } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: encryptedPassword, email });
  user
    .save()
    .then(() => res.status(201).json({ message: "Registered Successfully" }))
    .catch((error) => res.status(400).json({ error }));
};

//Login Controller
export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid Username" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Password" });
  }
  const jwtToken = jwt.sign(username, "MY_SECRET_KEY");
  res.status(201).json({ message:"Login Success", jwtToken, userId: user._id, userName: user.username });
};

//Get Notes Controller  (for a specific user)  // getNotes/:userId  - GET Method
export const getNotes = async (req, res) => {
  const userId = req.query.userId;
  const notes = await Note.find({ userId });
  res.status(200).json({ notes });
};

//Create Note Controller
export const createNote = async (req, res) => {
  const { userId, title, content } = req.body;
  const note = new Note({ title, content, userId });
  await note.save();
  res.status(201).json({ message: "Note created successfully", note });
};

//Get Note Controller  (for a specific note)  // getNote/:id  - GET Method
export const getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json({ note });
};

//Update Note Controller  (for a specific note)  // editNote/:id  - PUT Method  // Note: this should only allow the user to update their own notes.
export const editNote = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const note = await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json({ message: "Note updated successfully", note });
};

//Delete Note Controller  (for a specific note)  // deleteNote/:id  - DELETE Method  // Note: this should only allow the user to delete their own notes.
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findByIdAndDelete(id);
  if (!note) {
    res.send(404).json({ message: "Note Not Found" });
  }
  res.status(200).json({ message: "Note Deleted Successfully" });
};
