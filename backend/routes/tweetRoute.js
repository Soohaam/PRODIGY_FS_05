import express from 'express';
import { loginUser, logoutuser, registerUser } from '../controllers/userController.js';
import isAuthenticated from '../config/auth.js';
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeOrDislike } from '../controllers/tweetController.js';

const router = express.Router();

router.route("/create").post(isAuthenticated,createTweet)
router.route("/delete/:id").delete(deleteTweet)
router.route("/like/:id").put(likeOrDislike)
router.route("/alltweets/:id").get(isAuthenticated, getAllTweets);
router.route("/followingtweets/:id").get(isAuthenticated, getFollowingTweets);

export default router;
