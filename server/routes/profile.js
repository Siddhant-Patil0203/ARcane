import express from 'express';
import { updateAccount } from '../controllers/profile.js'
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post("/update", authUser, updateAccount);

export default router;