import React from 'react'
import Post from './Post'

function Posts() {
  return (
    <div>
        {
            [1,2,3].map((item,index)=>{
                return(
                   <Post key={index}/>
                )
            })
        }
    </div>
  )
}

export default Posts
