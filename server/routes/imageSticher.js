import express from "express";
import {addLinks , getLinks} from "../controllers/imageSticher.js";
const router = express.Router();

router.get("/get/:id",getLinks);
router.post("/add",addLinks);
router.get("/op",(req, res)=>{
    res.send("working");
})


export default router;