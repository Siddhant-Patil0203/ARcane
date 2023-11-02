import express from "express";
import {addLinks , getLinks} from "../controllers/ImgSticher.js";
const router = express.Router();

router.get("/get/:id",getLinks);
router.post("/add",addLinks);
router.get("/op",(res,res)=>{
    res.send("working");
})


export default router;