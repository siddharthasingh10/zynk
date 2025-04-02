
import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button';
import { readFileAsDataURL } from '../lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '../redux/postSlice';
function Createpost({ openPost, setOpenPost }) {
    const [file, setFile] = useState('')
    const [caption, setCaption] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [loading, setLoading] = useState(false)
    const inputRef = useRef(null);

    const {user}=useSelector(store=>store.auth);
    const {posts}=useSelector(store=>store.post);
    const dispatch=useDispatch();

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file)
            const dataUrl = await readFileAsDataURL(file);
            setImagePreview(dataUrl);
        }
    }
    const createPostHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('caption', caption);
        if (imagePreview) formData.append('image', file);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/v1/post/addpost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, withCredentials: true

            })
            if (response.data.success) {
                console.log(response.data.post)
                dispatch(setPost([response.data.post,...posts]))
                toast.success(response.data.message)
                setOpenPost(false);
                setCaption("")
                setImagePreview('')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }

    }
    return (
        <Dialog open={openPost}>
            <DialogContent className='' onInteractOutside={() => setOpenPost(false)}>
                <DialogTitle></DialogTitle>


                <DialogHeader className='text-center font-semibold '>Create a New Post</DialogHeader>

                <div className='flex gap-3 items-center '>
                    <Avatar>
                        <AvatarImage src={user.profilePicture} alt='avtar' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>   
                    <div>
                        <h1 className='font-semibold'>{user?.username}</h1>
                        <span className='text-gray-600'>{user?.bio}</span>
                    </div>
                </div>
                <Textarea value={caption} onChange={(e) => setCaption(e.target.value)}
                    className="w-full resize-none rounded-lg border-none bg-transparent px-3 py-2 text-[15px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0"
                    placeholder="Write a caption..."
                    rows={1}
                />
              
                {
  imagePreview && (
    <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-lg">
      <img 
        src={imagePreview} 
        alt="preview" 
        className="max-w-full max-h-full object-contain"
      />
    </div>
  )
}

                <input ref={inputRef} type='file' className='hidden' onChange={fileChangeHandler} />
                <Button onClick={() => inputRef.current.click()}
                    className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] cursor-pointer'>Select from your computer</Button>
                {
                    imagePreview && (
                        loading ? (<Button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please Wait
                        </Button>) : (
                            <Button onClick={createPostHandler} type='submit' className='w-fit mx-auto bg-[#1794e7] hover:bg-[#258bcf] cursor-pointer'>Post</Button>
                        )

                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default Createpost