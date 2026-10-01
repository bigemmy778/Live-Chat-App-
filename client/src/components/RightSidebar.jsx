import React, { useContext, useState, useEffect } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {

    const { selectedUser, messages, showRightBar, setShowRightBar } = useContext(ChatContext)
    const { logout, onlineUsers } = useContext(AuthContext)
    const [msgImages, setMsgImages] = useState([])
    const [showProfilePic, setShowProfilePic] = useState(false)

    // whenever messages change, pull out just the image messages for the Media section
    useEffect(() => {
        setMsgImages(
            messages.filter(msg => msg.image).map(msg => msg.image)
        )
    }, [messages])

    // only render when a user is selected AND the panel has been opened (via profile pic click)
    return selectedUser && showRightBar && (
        <div className='fixed inset-0 z-40 flex justify-end'>
            {/* backdrop - click outside the panel to close it */}
            <div
                onClick={() => setShowRightBar(false)}
                className='absolute inset-0 bg-black/50'
            ></div>

            {/* panel - full width on mobile, fixed width on larger screens */}
            <div className='relative bg-[#18182b]/60 backdrop-blur-xl text-white w-full sm:w-[320px] h-full overflow-y-scroll shadow-2xl border-l border-white/10'>
            {/* <div className='relative bg-[#8185B2]/10 backdrop-blur-xl text-white w-full sm:w-[320px] h-full overflow-y-scroll'> */}
                {/* close button */}
                <button
                    onClick={() => setShowRightBar(false)}
                    className='absolute top-4 right-4 text-white text-2xl leading-none cursor-pointer'
                >
                    ×
                </button>

                {/* profile info */}
                <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
               <img
                onClick={() => setShowProfilePic(true)}
                src={selectedUser?.profilePic || assets.avatar_icon}
                alt=""
                className='w-20 h-20 rounded-full object-cover cursor-pointer'
                />
                    <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
                        {/* green dot only shows if this user is currently online */}
                        {onlineUsers.includes(selectedUser._id) &&
                            <p className='w-2 h-2 rounded-full bg-green-500'></p>}
                        {selectedUser.fullName}
                    </h1>
                    <p className='px-10 mx-auto'>{selectedUser.bio}</p>
                </div>

                <hr className='border-[#ffffff50] my-4' />

            {/* shared media - all images exchanged in this chat */}
                
            {msgImages.length > 0 && (
              <div className='px-5 mt-6'>
                  <div className='flex items-center justify-between mb-3'>
                      <p className='text-sm font-medium text-white'>
                          Media
                      </p>

                  <span className='text-xs text-gray-400'>
                      {msgImages.length} {msgImages.length === 1 ? 'image' : 'images'}
                  </span>
              </div>

        <div className='bg-white/5 border border-white/10 rounded-xl p-3'>
            <div className='grid grid-cols-2 gap-3'>
                {msgImages.map((url, index) => (
                    <div
                        key={index}
                        onClick={() => window.open(url)}
                        className='group cursor-pointer overflow-hidden rounded-lg border border-white/10'
                    >
                        <img
                            src={url}
                            className='w-full h-28 object-cover transition-transform duration-300 group-hover:scale-105'
                            alt=''
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
)}
                
                {/* <div className='px-5 text-xs'>
                    <p>Media</p>
                    <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
                        {msgImages.map((url, index) => (
                            // click a thumbnail to open full image in a new tab
                            <div key={index} onClick={() => window.open(url)}
                                className='cursor-pointer rounded'>
                                <img src={url} className='h-full rounded-md' alt="" />
                            </div>
                        ))}
                    </div>
                </div> */}

                <button onClick={() => logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2
                 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none
                 text-sm font-light py-2 px-20 rounded-full cursor-pointer'>
                    Logout
                </button>
            </div>

            {showProfilePic && (
            <div
                onClick={() => setShowProfilePic(false)}
                className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center'
            >
                <button
                    onClick={() => setShowProfilePic(false)}
                    className='absolute top-5 right-6 text-white text-4xl cursor-pointer'
                >
                    ×
                </button>

                <img
                    src={selectedUser?.profilePic || assets.avatar_icon}
                    alt=""
                    onClick={(e) => e.stopPropagation()}
                    className='max-w-[90%] max-h-[85%] object-contain rounded-lg'
                />
            </div>
        )}
        </div>
    )
}

export default RightSidebar

// import React, { useContext, useState , useEffect} from 'react'
// import assets, { imagesDummyData } from '../assets/assets'
// import { ChatContext } from '../../context/ChatContext'
// import { AuthContext } from '../../context/AuthContext'

// const RightSidebar = () => {
  
//    const {selectedUser, messages} = useContext(ChatContext)
//    const {logout, onlineUsers} = useContext(AuthContext)
//    const [msgImages, setMsgImages] = useState([])

//    //Get all the images from the messages and set them to state
//    useEffect((()=>{
//        setMsgImages(
//           messages.filter(msg => msg.image).map(msg=>msg.image)
//        )
//    }),[messages])



//   // if the selected user is true it  the this div will display
//   return selectedUser && (
//     <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}>
//       <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
//         <img src={selectedUser?.profilePic || assets.avatar_icon} alt=""
//           className='w-20 aspect-[1/1] rounded-full' />
//         <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
//             {onlineUsers.includes(selectedUser._id) &&
//              <p className='w-2 h-2 rounded-full bg-green-500'></p>}
//             {selectedUser.fullName}
//         </h1>
//         <p className='px-10 mx-auto'>{selectedUser.bio}</p>
//       </div>

//       <hr className='border-[#ffffff50] my-4' />

//       {/* Media container */}
//       <div className='px-5 text-xs'>
//         <p>Media</p>
//         <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2
//           gap-4 opacity-80'>
//             {/* media data */}
//             {msgImages.map((url, index)=>(
//                <div key={index} onClick={()=> window.open(url)} 
//                className='cursor-pointer rounded'>
//                     <img src={url} className='h-full rounded-md' alt="" />  
//                </div>
//             ))}
//         </div>
//       </div>

//       <button onClick={()=> logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2
//        bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none
//        text-sm font-light py-2 px-20 rounded-full cursor-pointer'>  
//         Logout
//       </button>

//     </div>
//   )
// }

// export default RightSidebar