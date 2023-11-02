import mongoose from "mongoose";

const imgStichSchema = new mongoose.Schema({
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  image4: {
    type: String,
  },
});

export default mongoose.model("ImageParanoma", imgStichSchema);
