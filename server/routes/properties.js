import express from "express";
import {addProperty, getProperties, getPropertiesByStatus, updateProperty, deleteProperty} from "../controllers/properties.js";
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.get("/fetch",getProperties);
router.get("/fetch/:status",getPropertiesByStatus);
router.post("/Add", authUser ,addProperty);
router.put("/update/:id", updateProperty);
router.delete("/delete/:id",deleteProperty);

export default router;