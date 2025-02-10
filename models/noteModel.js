import mongoose, { Schema } from "mongoose";

const noteModel = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Note", noteModel);
