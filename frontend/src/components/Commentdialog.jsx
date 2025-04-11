

import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import { setPost } from "../redux/postSlice";
import { toast } from "sonner";
import axios from "axios";


function CommentDialog({ openComment, setOpenComment }) {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector(store => store.post);
 
const [comment,setComment]=useState(selectedPost?.comments || []);

  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeHandler = (e) => {
    setText(e.target.value.trim() ? e.target.value : "");
  };
  const sendMessageHandler = async () => {

    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/post/${selectedPost?._id}/comment`, 
        { content: text }, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map(p =>
          p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPost(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (!openComment) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
      onClick={() => {
        setText("");
        setOpenComment(false)
      }}
    >
      <div
        className="flex flex-col bg-white min-w-[400px] max-w-[1000px] h-[65vh] rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full h-full">
          <div className="w-1/2 bg-black flex items-center justify-center">
            <img
              className="h-full w-full object-contain"
              src={selectedPost?.image}
              alt="Comment Image"
            />
          </div>

          <div className="w-1/2 flex flex-col justify-between bg-white">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage src={selectedPost?.author?.profilePicture } />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{selectedPost?.author?.username}</p>
                  {/* <p className="text-gray-500 text-xs">Bio here</p> */}
                </div>
              </div>
              <button
                onClick={() => {
                  setOpenComment(false)
                  setText("")
                }}
                className="text-red-600 text-lg"
              >
                ❌
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
            
            {
              comment.map((comm)=>   <Comment  key={ comm._id} comment={comm}/>)
            }
           
   
            </div>

            <div className="border-t p-4 flex items-center gap-3">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full p-2 text-sm border rounded-lg outline-none"
                value={text}
                onChange={changeHandler}
              />
              <button disabled={!text.trim()} onClick={sendMessageHandler} className="text-blue-500 font-semibold cursor-pointer">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentDialog;
