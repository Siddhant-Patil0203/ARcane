import express from 'express';
import { signin, signup, deleteAccount } from '../controllers/user.js'
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/delete", authUser, deleteAccount);

export default router;