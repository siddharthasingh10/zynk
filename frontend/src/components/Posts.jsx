import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

function Posts() {
  const {posts}=useSelector(store=>store.post)
  return (
    <div className=''>
        {
            posts.map((post)=>{
                return(
                   <Post key={post._id} post={post} />
                )
            })
        }
    </div>
  )
}

export default Posts
