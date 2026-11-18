import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const userData = useSelector(store=>store.user)
  return (
    <div className='flex justify-center'>
      {userData&&<EditProfile users={userData}/>}
    </div>
  )
}

export default Profile
