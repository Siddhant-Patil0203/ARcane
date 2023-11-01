import express from "express";
import * as dotenv from "dotenv";
import Replicate from "replicate";
import axios from "axios";
dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

router.route("/").post(async (req, res) => {
  const { prompt } = req.body;

  // console.log(prompt);
  //Text - To - Image
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    // Assuming 'output' is the URL of the image
    const response = await axios.get(output, {
      responseType: "arraybuffer",
    });

    // Convert the image data to a base64 string
    const imageBase64 = Buffer.from(response.data).toString("base64");

    // Send the base64 string in the response
    res.status(200).json({ image: imageBase64 });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.error(error);
  }
});

export default router;
