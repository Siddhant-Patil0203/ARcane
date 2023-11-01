import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: {type: String },
    googleId: { type: String },
    googleProfile: { type: String },
    picture: { type: String },
    name: { type: String },
    email: {type: String},
    password: {type: String},
})

export default mongoose.model("Users", userSchema);