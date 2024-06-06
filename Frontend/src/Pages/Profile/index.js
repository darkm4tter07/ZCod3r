import React from 'react'
import { useParams } from 'react-router-dom';

const Profile = () => {
  const {id} = useParams();
  const user = JSON.parse(window.localStorage.getItem('user')) || []; 
  return (
    <div>
      {user && (<div>Welcome {user.fullName}</div>)}
    </div>
  )
}

export default Profile;