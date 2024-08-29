import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { CiHeart, CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { MdOutlineDeleteOutline } from "react-icons/md";



const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const likehandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to like the tweet");
    }
  };

  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete the tweet");
      console.log(error);
    }
  };

  const imageUrl = `http://localhost:8080${tweet.image}`;

  return (
    <div className="border-b border-gray-200">
      <div className="flex p-4">
        <Avatar
           src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
           size="40"
           round={true}
        />
        <div className="ml-2 w-full">
          <div className="flex items-center">
            <h1 className="font-bold">{tweet?.userDetails[0]?.name || "Anonymous"}</h1>
            <p className="text-gray-500 text-sm ml-1">
              @{tweet?.userDetails[0]?.username || "unknown"}
            </p>
          </div>
          <div>
            <p>{tweet.description || "No description available"}</p>
          </div>
          {tweet.image && (
            <div className="">
              <img
                src={imageUrl}
                alt="Tweet "
                className='w-full object-cover'
              />
            </div>
          )}
          <div className="flex justify-between my-3">
            <div className="flex items-center">
              <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                <FaRegComment size="20px" />
              </div>
              <p>{tweet?.comments || 0}</p>
            </div>
            <div className="flex items-center">
              <div
                onClick={() => likehandler(tweet?._id)}
                className="p-2 hover:bg-pink-200 rounded-full cursor-pointer"
              >
                <CiHeart size="24px" />
              </div>
              <p>{tweet?.likes.length || 0}</p>
            </div>
            <div className="flex items-center">
              <div className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
                <CiBookmark size="24px" />
              </div>
              <p>0</p>
            </div>
            {user?._id === tweet?.userId && (
              <div
                onClick={() => deleteTweetHandler(tweet?._id)}
                className="flex items-center"
              >
                <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
                  <MdOutlineDeleteOutline size="24px" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
