// import React, { useState } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import useGetUserProfile from '@/hooks/useGetUserProfile';
// import { Link, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { AtSign, Heart, MessageCircle } from 'lucide-react';

// const Profile = () => {
//   const params = useParams();
//   const userId = params.id;
//   useGetUserProfile(userId);
//   const [activeTab, setActiveTab] = useState('posts');

//   const { userProfile, user } = useSelector(store => store.auth);

//   const isLoggedInUserProfile = user?._id === userProfile?._id;
//   const isFollowing = false;

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   }

//   const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

//   return (
//     <div className='flex max-w-5xl justify-center mx-auto pl-10 '>
//       <div className='flex flex-col gap-20 p-8'>
//         <div className='grid grid-cols-2'>
//           <section className='flex items-center justify-center'>
//             <Avatar className='h-32 w-32 '>
//               <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//           </section>
//           <section>
//             <div className='flex flex-col gap-5'>
//               <div className='flex items-center gap-2'>
//                 <span>{userProfile?.username}</span>
//                 {
//                   isLoggedInUserProfile ? (
//                     <>
//                       <Link to="/account/edit"><Button variant='secondary' className='hover:bg-gray-200 h-8'>Edit profile</Button></Link>
//                       <Button variant='secondary' className='hover:bg-gray-200 h-8'>View archive</Button>
//                       <Button variant='secondary' className='hover:bg-gray-200 h-8'>Ad tools</Button>
//                     </>
//                   ) : (
//                     isFollowing ? (
//                       <>
//                         <Button variant='secondary' className='h-8'>Unfollow</Button>
//                         <Button variant='secondary' className='h-8'>Message</Button>
//                       </>
//                     ) : (
//                       <Button className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
//                     )
//                   )
//                 }
//               </div>
//               <div className='flex items-center gap-4'>
//                 <p><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
//                 <p><span className='font-semibold'>{userProfile?.followers.length} </span>followers</p>
//                 <p><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
//               </div>
//               <div className='flex flex-col gap-1 p-2'>
//                 <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
//                 <Badge className='w-fit p-1' variant='secondary'><AtSign /> <span className='pl-1'>{userProfile?.username}</span> </Badge>
          
//               </div>
//             </div>
//           </section>
//         </div>
//         <div className='border-t border-t-gray-200'>
//           <div className='flex items-center justify-center gap-10 text-sm'>
//             <span className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`} onClick={() => handleTabChange('posts')}>
//               POSTS
//             </span>
//             <span className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`} onClick={() => handleTabChange('saved')}>
//               SAVED
//             </span>
          
//           </div>
//           <div className='grid grid-cols-3 gap-1'>
//             {
//               displayedPost?.map((post) => {
//                 return (
//                   <div key={post?._id} className='relative group cursor-pointer'>
//                     <img src={post.image} alt='postimage' className='rounded-sm my-2 w-full aspect-square object-cover' />
//                     <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//                       <div className='flex items-center text-white space-x-4'>
//                         <button className='flex items-center gap-2 hover:text-gray-300'>
//                           <Heart />
//                           <span>{post?.likes.length}</span>
//                         </button>
//                         <button className='flex items-center gap-2 hover:text-gray-300'>
//                           <MessageCircle />
//                           <span>{post?.comments.length}</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile


import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button'; 
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');
  const { userProfile, user } = useSelector(store => store.auth);
  
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => setActiveTab(tab);
  const displayedPost = activeTab === 'posts' ? userProfile?.posts || [] : userProfile?.bookmarks || [];

  return (
    <div className='max-w-5xl mx-auto px-4'>
      <div className='flex flex-col gap-10 p-8'>
        {/* Profile Header */}
        <div className='flex items-center gap-10 justify-center'>
          <Avatar className='h-32 w-32'>
            <AvatarImage src={userProfile?.profilePicture} alt='profilephoto' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <span className='text-2xl font-semibold'>{userProfile?.username}</span>
              {isLoggedInUserProfile ? (
                <>
                  <Link to='/account/edit'><Button variant='secondary' className='cursor-pointer'>Edit Profile</Button></Link>
               
                </>
              ) : (
                isFollowing ? (
                  <>
                    <Button variant='secondary'>Unfollow</Button>
                    <Button variant='secondary'>Message</Button>
                  </>
                ) : (
                  <Button className='bg-[#0095F6] hover:bg-[#3192d2]'>Follow</Button>
                )
              )}
            </div>
            <div className='flex gap-6 text-sm'>
              <p><span className='font-semibold'>{userProfile?.posts?.length || 0}</span> posts</p>
              <p><span className='font-semibold'>{userProfile?.followers?.length || 0}</span> followers</p>
              <p><span className='font-semibold'>{userProfile?.following?.length || 0}</span> following</p>
            </div>
            <div>
              <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
              <Badge className='w-fit p-1 mt-2 flex items-center'><AtSign /><span className='pl-1'>{userProfile?.username}</span></Badge>
            </div>
          </div>
        </div>
        {/* Posts / Saved Tabs */}
        <div className='border-t border-gray-200 mt-4'>
          <div className='flex justify-center gap-10 py-3 text-sm font-semibold'>
            <span className={`cursor-pointer ${activeTab === 'posts' ? 'border-b-2 border-black' : ''}`} onClick={() => handleTabChange('posts')}>
              POSTS
            </span>
            <span className={`cursor-pointer ${activeTab === 'saved' ? 'border-b-2 border-black' : ''}`} onClick={() => handleTabChange('saved')}>
              SAVED
            </span>
          </div>
          {/* Posts / Saved Grid */}
          <div className='grid grid-cols-3 gap-1 min-h-[300px]'>
            {displayedPost.length > 0 ? (
              displayedPost.map((post) => (
                <div key={post?._id} className='relative group cursor-pointer'>
                  <img src={post.image} alt='postimage' className='rounded-sm w-full aspect-square object-cover' />
                  <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='flex items-center text-white space-x-4'>
                      <button className='flex items-center gap-2'>
                        <Heart /> <span>{post?.likes.length}</span>
                      </button>
                      <button className='flex items-center gap-2'>
                        <MessageCircle /> <span>{post?.comments.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='col-span-3 flex justify-center items-center h-[300px] text-gray-500'>
                {activeTab === 'posts' ? 'No posts yet' : 'No saved posts'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;