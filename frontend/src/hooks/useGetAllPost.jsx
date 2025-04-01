import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setPost } from "../redux/postSlice";

const useGetAllPost = () => {
    const dispatch = useDispatch(); 
    useEffect(() => {
        const fetchAllPost = async () => {
            try {

                const res = await axios.get("http://localhost:5000/api/v1/post/getAllPosts", {
                    withCredentials: true,
                });
                if (res.data.success) {

                  
                    dispatch(setPost(res.data.posts)); 
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllPost(); 
    }, [dispatch]);

};

export default useGetAllPost;
