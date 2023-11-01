import express from "express";
import { addComments, deleteComments, getComments, updateComments } from "../controllers/reviews.js";
import authUser from "../middlewares/authUser.js";
const router = express.Router();

router.post("/add/:id" , addComments);
router.get("/get/:id",authUser , getComments);
router.put("/update/:id",authUser , updateComments);
router.delete("/delete/:id",authUser , deleteComments);

export default router;