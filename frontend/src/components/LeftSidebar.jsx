import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../components/ui/avatar"
import axios from 'axios'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';
import Createpost from './Createpost';
import { setPost, setSelectedPost } from '../redux/postSlice';



function LeftSidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user}=useSelector((state)=>state.auth);
    const [openPost,setOpenPost]=useState(false)
    
const siderBarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    { icon: <TrendingUp />, text: "Explore" },
    {
        icon: <Avatar className="w-7 h-7">
            <AvatarImage src={user?.profilePicture} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>, text: "Profile"
    },
    { icon: <LogOut />, text: "Logout" }

]
    const logoutHandler = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/user/logout', {
                withCredentials: true
            })
            if (response.data.success) {
                dispatch(setSelectedPost(null))
                dispatch(setAuthUser(null))
                dispatch(setPost([]));
                navigate('/login')
                toast.success(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const sidebarHandler=async (item) => {
        if (item.text === "Logout") {
            logoutHandler()
        } else if (item.text === "Home") {
            navigate('/')
        } else if (item.text === "Search") {
            navigate('/search')
        } else if (item.text === "Messages") {
            navigate('/messages')
        } else if (item.text === "Notifications") {
            navigate('/notifications')
        } else if (item.text === "Create") {
            setOpenPost(true);
        } else if (item.text === "Explore") {
            navigate('/explore')
        } else if (item.text === "Profile") {
            navigate(`/profile/${user._id}`)
        }
    }



    return (
        <div className='fixed top-0 left-0 h-screen w-[16%] px-4 border-r-1 z-10 border-gray-300 bg-gray-100'>
            <div className='flex flex-col'>
                <h1 className='my-8 pl-8 font-bold text-xl text-indigo-500'>ZYNK</h1>
                <div>

                    {
                        siderBarItems.map((item, index) => {
                            return (
                                <div onClick={()=>sidebarHandler(item)} key={index} className='flex items-center gap-4 p-3 relative hover:bg-gray-200 rounded-md cursor-pointer'>
                                    {item.icon}
                                    <span>{item.text}</span>
                                </div>
                            )
                        }

                        )}
                </div>
            </div>
                <Createpost openPost={openPost} setOpenPost={setOpenPost}/>
        </div>
    )
}

export default LeftSidebar