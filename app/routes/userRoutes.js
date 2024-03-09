import express from "express";
import {getAllUserData, getUserDataByID, test} from "../controllers/userController.js";

const router = express.Router();
// Get a list of all users
router.get('/', getAllUserData);
router.get('/getUser', getUserDataByID);
router.get('/gettest', test);

export default router;