import express from "express";
import { addFav, remFav , getFavProperties} from "../controllers/favourites.js";
import authUser from "../middlewares/authUser.js";
const router = express.Router();

router.get("/getFav", authUser , getFavProperties);
router.post("/addFav/:id", authUser, addFav);
router.delete("/remFav/:id", authUser , remFav);

export default router;