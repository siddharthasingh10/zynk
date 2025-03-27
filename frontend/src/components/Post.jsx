import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import { Dialog, DialogClose } from './ui/dialog'
import { DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";


function Post() {
    return (
        <div className='my-8 w-full max-w-sm mx-auto'>
            <div className='flex  justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src="  " alt='post_image' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div> <h1>username</h1></div>


                </div>

                <Dialog>

                    <DialogTrigger asChild>
                        <button className="p-2 ">
                            <MoreHorizontal className="cursor-pointer" />
                        </button>
                    </DialogTrigger>


                    <DialogContent className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-xl w-80 relative">

                            <DialogClose className="absolute top-2 right-2  text-red-600 text-md cursor-pointer">
                                ❌
                            </DialogClose>


                            <div className="flex flex-col gap-3 mt-2">

                                <Button variant='otuline' className="w-full cursor-pointer border-gray-400 text-red-600 border hover:bg-gray-100">
                                    Unfollow
                                </Button>

                                <Button variant="outline" className="w-full cursor-pointer border-gray-400 hover:bg-gray-100">
                                    Bookmark
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <img
                className='rounded-sm my-0 width-full aspect-square object-cover'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4lwY3cc6BOmSLs6T2IOlTEykvleJTEUojzw&s' />

            <div className='flex justify-between items-center py-2'>
                <div className='flex items-center gap-3' >
                    <FaRegHeart className='cursor-pointer hover:text-gray-600' size={'24px'} />
                    <MessageCircle className='cursor-pointer hover:text-gray-600' />
                    <Send   className='cursor-pointer hover:text-gray-600'/>
                </div>
                <Bookmark className='cursor-pointer hover:text-gray-600' />
            </div>
            <span className='font-medium block mb-2 '>2k likes</span>
<p>
    <span className='font-medium mr-2 '>username</span>
    caption
</p>
<span>view all 10 comments</span>

        </div>

    )
}

export default Post