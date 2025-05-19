import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file as Data URL"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsDataURL(file);
  });
};

export const unfollowHandler=async()=>{
  try {
    const  res=await axios.post(`http://localhost:5000/api/v1/user/unfollow/${userId}`,{
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    if (res.data.success) {
      dispatch(setUser(res.data.user));
    
    }
  } catch (error) {
    console.log(error);
  }
}