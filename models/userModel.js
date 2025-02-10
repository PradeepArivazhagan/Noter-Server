import mongoose, { Schema } from "mongoose"

const userModel = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
})

export default mongoose.model("User", userModel)