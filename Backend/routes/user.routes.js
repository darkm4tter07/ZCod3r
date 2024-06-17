import { Router } from "express";
import { loginUser, getUser, updateProfilePicture, updateProfile, getAllUsers} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route('/login').post(loginUser);

router.route('/:username').get(getUser);

export default router;