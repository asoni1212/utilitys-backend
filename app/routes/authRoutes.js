import express from "express";
import {addressUpdateOrInsertRequest, allAddressRequest, loginUserRequest, profileRequest, registerUserRequest, verifyRequest} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authjwt.js";

const router = express.Router();
// Get a list of all users
router.post('/registration',[], registerUserRequest);
router.post('/login' , loginUserRequest);
router.post('/profile' , profileRequest);
router.post('/editaddress', [verifyToken] , addressUpdateOrInsertRequest),
router.post('/alladdress', [verifyToken] , allAddressRequest),
router.get('/verify', [verifyToken] , verifyRequest )

export default router;