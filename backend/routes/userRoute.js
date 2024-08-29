import express from 'express';
import { bookmark, follow, getMyProfile, getOtherUsers, loginUser, logoutuser, registerUser, unfollow } from '../controllers/userController.js';
import isAuthenticated from '../config/auth.js';

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser)

router.route("/logout").get(logoutuser)

router.route("/bookmark/:id").put(isAuthenticated, bookmark)

router.route("/profile/:id").get(isAuthenticated,getMyProfile)

router.route("/otheruser/:id").get(isAuthenticated, getOtherUsers);
router.route("/follow/:id").post(isAuthenticated, follow);
router.route("/unfollow/:id").post(isAuthenticated, unfollow);


export default router;
