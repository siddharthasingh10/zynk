import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import { Dialog, DialogClose } from "./ui/dialog";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Commentdialog from "./Commentdialog";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setSelectedPost } from "../redux/postSlice";

function Post({ post }) {
  const { posts } = useSelector((store) => store.post);
  const { user } = useSelector((store) => store.auth);

  const [text, setText] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const [liked, setLiked] = useState(post.likes.includes(user?.id) || false);
  const [comment, setComment] = useState(post.comments);
  const [postLike, setPostLike] = useState(post.likes.length);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const value = e.target.value;
    if (value.trim()) {
      setText(value);
    } else {
      setText("");
    }
  };
  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/post/${post._id}/delete`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedPosts = posts.filter(
          (postItem) => postItem._id.toString() !== post._id.toString()
        );

        dispatch(setPost(updatedPosts));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const likeOrDislikeHnadler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      console.log(`http://localhost:5000/api/v1/post/${post._id}/${action}`);
      const res = await axios.get(
        `http://localhost:5000/api/v1/post/${post._id}/${action}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedPostLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedPostLikes);
        setLiked(!liked);
        //now change the posts data as it have array of likes
        const updatedPostData = posts.map((p) =>
          p.id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [user._id, ...p],
              }
            : p
        );
        dispatch(setPost(updatedPostData));

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  // const commentHandler = async () => {

  //     try {
  //         const res = await axios.post(`http://localhost:5000/api/v1/post/${post._id}/comment`, { content:text }, {
  //             headers: {
  //                 'Content-Type': 'application/json'
  //             },
  //             withCredentials: true
  //         });
  //         console.log(res.data);
  //         if (res.data.success) {
  //             const updatedCommentData = [...comment, res.data.comment];
  //             setComment(updatedCommentData);

  //                 // same as we done in likes
  //             const updatedPostData = posts.map(p =>
  //                 p._id === post._id ? { ...p, comments: updatedCommentData } : p
  //             );

  //             dispatch(setPost(updatedPostData));
  //             toast.success(res.data.message);
  //             setText("");
  //         }
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  const commentHandler = async () => {
    try {
      if (!text.trim()) {
        toast.error("Comment cannot be empty!");
        return;
      }

      const res = await axios.post(
        `http://localhost:5000/api/v1/post/${post._id}/comment`,
        { content: text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Response from backend:", res.data);

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPost(updatedPostData));

        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.error("Error Response:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="my-8 w-full max-w-6xl mx-auto ">
      <div className="flex  justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            {" "}
            <h1 className="font-medium">{post.author?.username}</h1>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button className="p-2 ">
              <MoreHorizontal className="cursor-pointer" />
            </button>
          </DialogTrigger>

          <DialogContent className="fixed  inset-0 flex items-center justify-center z-50 ">
            <div className="bg-gray-50 p-6 rounded-xl shadow-xl w-80 relative">
              <div className="flex flex-col gap-3 m-4">
                <Button
                  variant="otuline"
                  className="w-full cursor-pointer border-gray-400 text-red-600 border hover:bg-gray-200"
                >
                  Unfollow
                </Button>
                <Button
                  onClick={deletePostHandler}
                  variant="otuline"
                  className="w-full cursor-pointer border-gray-400 text-red-600 border hover:bg-gray-200"
                >
                  Delete
                </Button>

                <Button
                  variant="outline"
                  className="w-full cursor-pointer border-gray-400 hover:bg-gray-200"
                >
                  Bookmark
                </Button>
                <DialogClose>
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer border-gray-400 text-red-600 border hover:text-red-600 hover:bg-gray-200"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <img
        onClick={() => {setOpenComment(true) 
        dispatch(setSelectedPost(post)) }}
        className="rounded-sm my-0 width-full aspect-square object-cover cursor-pointer"
        src={post.image}
      />

      <div className="flex justify-between items-center py-2">
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHnadler}
              className="text-red-500 cursor-pointer hover:text-red-600"
              size={"24px"}
            />
          ) : (
            <FaRegHeart
              onClick={likeOrDislikeHnadler}
              className="cursor-pointer hover:text-gray-600"
              size={"24px"}
            />
          )}
          <MessageCircle
            className="cursor-pointer hover:text-gray-600"
            onClick={() => { 
                dispatch(setSelectedPost(post))
                setOpenComment(true)}}
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium block mb-2 ">{postLike} likes</span>
      <p>
        <span className="font-medium mr-2 ">{post.author.username}</span>
        {post.caption}
      </p>
      {
        comment.length>0 && (
          <span
     
     onClick={() =>{ dispatch(setSelectedPost(post))
          setOpenComment(true) }}
     className="cursor-pointer text-gray-600"
   >view all {comment.length} comments
   </span>

        )
      }
    
      <Commentdialog
        openComment={openComment}
        setOpenComment={setOpenComment}
      />

      <div className="flex items-center justify-between ">
        <input
          type="text"
          className=" outline-none text-sm w-full p-1 text-gray-600"
          placeholder="Add a comment..."
          value={text}
          onChange={changeHandler}
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-blue-700 cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
}

export default Post;
