import express from 'express';
const router = express.Router();
import { authGoogle, callbackGoogle, authenticated, failed }  from '../controllers/googleAuth.js'


router.get('/google',authGoogle)
router.get('/google/callback', callbackGoogle)
router.get('/protected', authenticated)
router.get('/failed', failed)
export default router;
