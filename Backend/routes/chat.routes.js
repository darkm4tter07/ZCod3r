import { Router } from "express";
import {createChat, getChats, getChat, createGroupChat, addUsersToGroup, removeUserFromGroup, renameGroup} from "../controllers/chat.controller.js";

const router = Router();

router.route('/create').post(createChat);
router.route('/').get(getChats);
router.route('/chat/:id').get(getChat);
router.route('/creategroup').post(createGroupChat);
router.route('/addusers').post(addUsersToGroup);
router.route('/removeuser').post(removeUserFromGroup);
router.route('/rename').put(renameGroup);



export default router;