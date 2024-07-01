import { Router } from "express";
import { loginUser, getUser, updateProfilePicture, updateProfile, toggleFollowing, getTopCoders, searchUsers } from '../controllers/user.controller.js';

import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route('/login').post(loginUser);

router.route('/user/:username').get(getUser);

router.route('/toggle-following').post(toggleFollowing);

router.route('/topcoders').get(getTopCoders);

router.route('/search').get(searchUsers);

export default router;