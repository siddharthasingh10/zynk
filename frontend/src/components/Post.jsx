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
import { Link } from 'react-router-dom';



function Post({ post }) {
  const { posts } = useSelector((store) => store.post);
  const { user } = useSelector((store) => store.auth);

  const [text, setText] = useState("");
  const [openComment, setOpenComment] = useState(false);

  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  
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
      const res = await axios.get(
        `http://localhost:5000/api/v1/post/${post._id}/${action}`,
        { withCredentials: true }
      );
  
      if (res.data.success) {
        const updatedLikes = liked 
          ? post.likes.filter((id) => id !== user._id) 
          : [...post.likes, user._id]; 
  
        setLiked(!liked); 
        setPostLike(updatedLikes.length); 
  
    
        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, likes: updatedLikes } : p
        );
        dispatch(setPost(updatedPostData));
  
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  
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
  const bookmarkHandler = async () => {
    try {
      
        const res = await axios.get(`http://localhost:5000/api/v1/post/${post?._id}/bookmark`, {withCredentials:true});
        if(res.data.success){
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className="my-3 w-full max-w-6xl mx-auto  py-3 ">
      <div className="flex  justify-between items-center ">


        <div className="flex items-center space-x-3">
  
  <div className="w-8 h-8 rounded-full overflow-hidden border-1 border-pink-500">
    <img src={post.author?.profilePicture} alt="User" className="w-full h-full object-cover" />
  </div>

  <div>
            {" "}
            <h1 className="font-medium">{post.author?.username}</h1>
          </div>
  {/* <span className="text-sm font-semibold">{post?.author?.username}</span> */}
</div>

   

        <Dialog>
          <DialogTrigger asChild>
            <button className="p-2 ">
              <MoreHorizontal className="cursor-pointer " />
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
  onClick={() => { setOpenComment(true); dispatch(setSelectedPost(post)); }}
  className="rounded-sm my-0 w-full max-w-[800px] max-h-[400px] object-cover cursor-pointer"
  src={post.image}
/>
<div className=" p-2">
<div className="flex justify-between items-center py-2  ">
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
        <Bookmark onClick={bookmarkHandler} className="cursor-pointer hover:text-gray-600" />
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


    </div>
  );
}

export default Post;

// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// import React, { useState } from "react";
// import { Dialog, DialogClose } from "./ui/dialog";
// import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
// import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
// import { Button } from "./ui/button";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import Commentdialog from "./Commentdialog";
// import { toast } from "sonner";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setPost, setSelectedPost } from "../redux/postSlice";

// function Post({ post }) {
//   const { posts } = useSelector((store) => store.post);
//   const { user } = useSelector((store) => store.auth);

//   const [text, setText] = useState("");
//   const [openComment, setOpenComment] = useState(false);
//   const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
//   const [comment, setComment] = useState(post.comments);
//   const [postLike, setPostLike] = useState(post.likes.length);
//   const dispatch = useDispatch();

//   const changeHandler = (e) => {
//     const value = e.target.value;
//     if (value.trim()) {
//       setText(value);
//     } else {
//       setText("");
//     }
//   };

//   const deletePostHandler = async () => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:5000/api/v1/post/${post._id}/delete`,
//         {
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         const updatedPosts = posts.filter(
//           (postItem) => postItem._id.toString() !== post._id.toString()
//         );
//         dispatch(setPost(updatedPosts));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const likeOrDislikeHnadler = async () => {
//     try {
//       const action = liked ? "dislike" : "like";
//       const res = await axios.get(
//         `http://localhost:5000/api/v1/post/${post._id}/${action}`,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         const updatedLikes = liked
//           ? post.likes.filter((id) => id !== user._id)
//           : [...post.likes, user._id];

//         setLiked(!liked);
//         setPostLike(updatedLikes.length);

//         const updatedPostData = posts.map((p) =>
//           p._id === post._id ? { ...p, likes: updatedLikes } : p
//         );
//         dispatch(setPost(updatedPostData));

//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   const commentHandler = async () => {
//     try {
//       if (!text.trim()) {
//         toast.error("Comment cannot be empty!");
//         return;
//       }

//       const res = await axios.post(
//         `http://localhost:5000/api/v1/post/${post._id}/comment`,
//         { content: text },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         const updatedCommentData = [...comment, res.data.comment];
//         setComment(updatedCommentData);

//         const updatedPostData = posts.map((p) =>
//           p._id === post._id ? { ...p, comments: updatedCommentData } : p
//         );
//         dispatch(setPost(updatedPostData));

//         toast.success(res.data.message);
//         setText("");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="my-8 w-full max-w-6xl mx-auto">
//       <div className="flex justify-between items-center py-2 px-4 bg-white rounded-lg shadow-sm">
//         <div className="flex items-center gap-3">
//           <Avatar>
//             <AvatarImage src={post.author?.profilePicture} alt="post_image" />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>

//           <div>
//             <h1 className="font-semibold text-lg">{post.author?.username}</h1>
//           </div>
//         </div>

//         <Dialog>
//           <DialogTrigger asChild>
//             <button className="p-2">
//               <MoreHorizontal className="cursor-pointer" />
//             </button>
//           </DialogTrigger>

//           <DialogContent className="fixed inset-0 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
//               <div className="flex flex-col gap-3">
//                 <Button
//                   variant="outline"
//                   className="w-full border-gray-400 text-red-600 border hover:bg-gray-100"
//                 >
//                   Unfollow
//                 </Button>
//                 <Button
//                   onClick={deletePostHandler}
//                   variant="outline"
//                   className="w-full border-gray-400 text-red-600 border hover:bg-gray-100"
//                 >
//                   Delete
//                 </Button>

//                 <Button
//                   variant="outline"
//                   className="w-full border-gray-400 hover:bg-gray-100"
//                 >
//                   Bookmark
//                 </Button>

//                 <DialogClose>
//                   <Button
//                     variant="outline"
//                     className="w-full text-red-600 border-gray-400 hover:bg-gray-100"
//                   >
//                     Cancel
//                   </Button>
//                 </DialogClose>
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

    
//       <img
//   onClick={() => { setOpenComment(true); dispatch(setSelectedPost(post)); }}
//   className="rounded-sm my-0 w-full max-w-[6000px] max-h-[500px] object-cover cursor-pointer"
//   src={post.image}
// />


//       <div className="flex justify-between items-center py-2">
//         <div className="flex items-center gap-3">
//           {liked ? (
//             <FaHeart
//               onClick={likeOrDislikeHnadler}
//               className="text-red-500 cursor-pointer hover:text-red-600"
//               size="24px"
//             />
//           ) : (
//             <FaRegHeart
//               onClick={likeOrDislikeHnadler}
//               className="cursor-pointer hover:text-gray-600"
//               size="24px"
//             />
//           )}
//           <MessageCircle
//             className="cursor-pointer hover:text-gray-600"
//             onClick={() => {
//               dispatch(setSelectedPost(post));
//               setOpenComment(true);
//             }}
//           />
//           <Send className="cursor-pointer hover:text-gray-600" />
//         </div>
//         <Bookmark className="cursor-pointer hover:text-gray-600" />
//       </div>

//       <span className="font-medium block mb-2">{postLike} likes</span>
//       <p>
//         <span className="font-medium mr-2">{post.author.username}</span>
//         {post.caption}
//       </p>

//       {comment.length > 0 && (
//         <span
//           onClick={() => {
//             dispatch(setSelectedPost(post));
//             setOpenComment(true);
//           }}
//           className="cursor-pointer text-gray-600"
//         >
//           View all {comment.length} comments
//         </span>
//       )}

//       <Commentdialog openComment={openComment} setOpenComment={setOpenComment} />

//       <div className="flex items-center justify-between mt-4">
//         <input
//           type="text"
//           className="outline-none text-sm w-full p-2 text-gray-600"
//           placeholder="Add a comment..."
//           value={text}
//           onChange={changeHandler}
//         />
//         {text && (
//           <span
//             onClick={commentHandler}
//             className="text-blue-700 cursor-pointer"
//           >
//             Post
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Post;
