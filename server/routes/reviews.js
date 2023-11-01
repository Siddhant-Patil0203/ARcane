import express from "express";
import { addComments, deleteComments, getComments, updateComments } from "../controllers/reviews.js";
import authUser from "../middlewares/authUser.js";
const router = express.Router();

router.get("/",authUser , getComments);
router.post("/add/:id" , addComments);
router.put("/update/:id",authUser , updateComments);
router.delete("/delete/:id",authUser , deleteComments);

export default router;