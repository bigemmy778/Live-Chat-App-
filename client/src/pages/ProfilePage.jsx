import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

function ProfilePage() {

  const { authUser, updateProfile } = useContext(AuthContext)

  const [isSubmitting, setIsSubmitting] = useState(false) // disable button after first click to let request process
  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    try {
      if (!selectedImg) {
        await updateProfile({ fullName: name, bio })
        navigate('/')
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(selectedImg)
      reader.onload = async () => {
        const base64Image = reader.result;
        console.log("IMAGE DATA:", base64Image.substring(0, 100));
        await updateProfile({ profilePic: base64Image, fullName: name, bio })
        navigate('/');
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='relative w-5/6 max-w-2xl backdrop-blur-2xl text-2xl text-gray-300 border-2
        border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg
      '>
        {/* <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-2xl text-gray-300 border-2
        border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg
       '> */}

        <button
          type='button'
          onClick={() => navigate('/')}
          className='absolute top-4 right-5 text-white text-3xl leading-none
          hover:text-gray-400 cursor-pointer'
        >
          ×
        </button>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile details</h3>
          <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e) => setSelectedImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} />
            upload profile image
          </label>

          <input onChange={(e) => setName(e.target.value)} value={name}
            type="text" required placeholder='Your name'
            className='p-2 border border-gray-500 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-violet-500'/>

          <textarea onChange={(e) => setBio(e.target.value)} value={bio}
            placeholder='Write profile bio' required
            className='p-2 border border-gray-500 rounded-md
             focus:outline-none focus:ring-2 focus:ring-violet-500' rows={4} id=''>
          </textarea>

          <button type='submit' disabled={isSubmitting}
            className='bg-gradient-to-r from-purple-400 to-violet-600 
             text-white p-2 rounded-full text-lg cursor-pointer'>
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
        <img className={`max-w-44 aspect-square rounded-full mx-10 ax-sm:mt-10 ${selectedImg && 'rounded-full'}`}
          src={authUser?.profilePic || assets.logo_icon}
          alt='' />
      </div>
    </div>
  )
}

export default ProfilePage