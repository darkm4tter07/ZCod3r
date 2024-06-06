import { Router } from "express";
import { loginUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route('/login').post(loginUser);

export default router;