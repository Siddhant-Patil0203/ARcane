import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/user.js";
import googleAuthRoutes from "./routes/googleAuth.js"
import initializePassport from './middlewares/passportConfig.js';
import dalleRoutes from "./routes/dalle.js";
import profileRoutes from "./routes/profile.js";
import propertiesRoutes from "./routes/properties.js";
import favouritesRoutes from "./routes/favourites.js";
import reviewsRouter from "./routes/reviews.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

initializePassport(app)

app.get("/", (req, res) => {
  res.send("ARcane Server");
});

app.use("/user", userRoutes);
app.use("/auth", googleAuthRoutes)
app.use("/api/v1/dalle", dalleRoutes);
app.use("/profile", profileRoutes);
app.use("/api/v1/properties", propertiesRoutes);
app.use("/api/v1/fav", favouritesRoutes);
app.use("/api/v1/reviews", reviewsRouter);

const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
