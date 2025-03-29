// import React from 'react'
// import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
// import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
// import { Link } from 'react-router-dom';



// function Commentdialog({ openComment, setOpenComment }) {

//     return (



// <Dialog open={openComment} onOpenChange={setOpenComment}>
// <DialogContent className="flex flex-col bg-white   min-w-[500px] h-[90vh] rounded-lg p-0 overflow-hidden">

//     <div className="flex w-full h-full">
      
//       {/* Image Section (Half Width) */}
//       <div className="w-1/2 bg-black flex items-center justify-center">
//         <img
//           className="h-full w-full object-contain"
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4lwY3cc6BOmSLs6T2IOlTEykvleJTEUojzw&s"
//           alt="Comment Image"
//         />
//       </div>

//       {/* Comment Section (Half Width) */}
//       <div className="w-1/2 flex flex-col justify-between bg-white">
        
//         {/* Header: User Info */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <div className="flex gap-3 items-center">
//             <Link>
//               <Avatar>
//                 <AvatarImage src="" />
//                 <AvatarFallback>CN</AvatarFallback>
//               </Avatar>
//             </Link>
//             <div>
//               <Link className="font-semibold text-sm">username</Link>
//               <p className="text-gray-500 text-xs">Bio here</p>
//             </div>
//           </div>
//         </div>

//         {/* Comments Section (Scrollable) */}
//         <div className="flex-1 overflow-y-auto p-4">
//           <p className="text-gray-700 text-sm">Sample comment text...</p>
//           <p className="text-gray-700 text-sm">Another comment...</p>
//           <p className="text-gray-700 text-sm">More comments here...</p>
//         </div>

//         {/* Footer: Input Box */}
//         <div className="border-t p-4 flex items-center gap-3">
//           <input
//             type="text"
//             placeholder="Add a comment..."
//             className="w-full p-2 text-sm border rounded-lg outline-none"
//           />
//           <button className="text-blue-500 font-semibold">Post</button>
//         </div>

//       </div>
//     </div>
//   </DialogContent>
// </Dialog>


//     )
// }

// export default Commentdialog

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const CommentDialog = ({ openComment, setOpenComment }) => {
  if (!openComment) return null; // If not open, don't render anything

  return (
//     <div
//       className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
//       onClick={() => setOpenComment(false)} // Close when clicking outside
//     >
//       <div
//         className="flex flex-col bg-white min-w-[400px] h-[65vh] rounded-lg p-0 overflow-hidden"
//         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//       >
//         <div className="flex w-full h-full">
          
//           {/* Image Section (Half Width) */}
//           <div className="w-1/2 bg-black flex items-center justify-center">
//             <img
//               className="h-full w-full object-contain"
//               src="https://images.unsplash.com/photo-1574285013029-29296a71930e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVydGljYWx8ZW58MHx8MHx8fDA%3D"
//               alt="Comment Image"
//             />
//           </div>

//           {/* Comment Section (Half Width) */}
//           <div className="w-1/2 flex flex-col justify-between bg-white">
            
//             {/* Header: User Info */}
//             <div className="flex items-center justify-between p-4 border-b">
//               <div className="flex gap-3 items-center">
//                 <Avatar>
//                   <AvatarImage src="" />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-semibold text-sm">username</p>
//                   <p className="text-gray-500 text-xs">Bio here</p>
//                 </div>
//               </div>
//               {/* Close Button */}
//               <button onClick={() => setOpenComment(false)} className="text-red-600 text-lg">
//                 ❌
//               </button>
//             </div>

//             {/* Comments Section (Scrollable) */}
//             <div className="flex-1 overflow-y-auto p-4">
//   <p className="text-gray-700 text-sm break-words">
//     Sample comment text that is to                                       erkjioerrrrrrrrrrrrrrrrrrwwtead of causing the div to expand...
//   </p>
//   <p className="text-gray-700 text-sm break-words">
//     Another long comment twrap properly inside the fixed width container...
//   </p>
// </div>

//             {/* Footer: Input Box */}
//             <div className="border-t p-4 flex items-center gap-3">
//               <input
//                 type="text"
//                 placeholder="Add a comment..."
//                 className="w-full p-2 text-sm border rounded-lg outline-none"
//               />
//               <button className="text-blue-500 font-semibold">Post</button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
<div
  className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
  onClick={() => setOpenComment(false)} // Close when clicking outside
>
  <div
    className="flex flex-col bg-white min-w-[400px] max-w-[600px] h-[65vh] rounded-lg overflow-hidden"
    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
  >
    <div className="flex w-full h-full">
      
      {/* Image Section (Fixed Width) */}
      <div className="w-1/2 bg-black flex items-center justify-center">
        <img
          className="h-full w-full object-contain"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4lwY3cc6BOmSLs6T2IOlTEykvleJTEUojzw&s"
          alt="Comment Image"
        />
      </div>

      {/* Comment Section (Fixed Width & Height) */}
      <div className="w-1/2 flex flex-col justify-between bg-white">
        
        {/* Header: User Info */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">username</p>
              <p className="text-gray-500 text-xs">Bio here</p>
            </div>
          </div>
          {/* Close Button */}
          <button onClick={() => setOpenComment(false)} className="text-red-600 text-lg">
            ❌
          </button>
        </div>

        {/* Comments Section (Fixed Height & Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="text-gray-700 text-sm break-words">
         should wrap to the next line instead and...
          </p>
          <p className="text-gray-700 text-sm break-words">
            Another long c inside the fixed width container...
          </p>
          <p className="text-gray-700 text-sm break-words">
            More and more comments can go here without affecting the height...
          </p>
        </div>

        {/* Footer: Input Box */}
        <div className="border-t p-4 flex items-center gap-3">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full p-2 text-sm border rounded-lg outline-none"
          />
          <button className="text-blue-500 font-semibold">Send</button>
        </div>

      </div>
    </div>
  </div>
</div>

  );
};

export default CommentDialog;
