import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
// import { setPost } from "../redux/postSlice";
import {  setUserProfile } from "../redux/authSlice";

const useGetUserProfile = (userId) => {
    const dispatch = useDispatch(); 

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {

                const res = await axios.get(`http://localhost:5000/api/v1/user/${userId}/profile`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setUserProfile(res.data.user)); 
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserProfile(); 
    }, [userId,dispatch]);

};

export default useGetUserProfile;
