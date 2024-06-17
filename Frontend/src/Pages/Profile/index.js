import React, {useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Constants';

const Profile = () => {
  const {id} = useParams();
  const currUser = JSON.parse(window.localStorage.getItem('user'));
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUserItself, setIsUserItself] = useState(false);

  const fetchUser = async () => {
    if(id === currUser.username){
      setUser(currUser);
      setIsUserItself(true);
      return;
    }else{
      try {
        const response = await axios.get(`${BASE_URL}/api/users/${id}`);
        if(response.status === 200){
          setUser(response.data.data);
        }else{
          setError(true);
          console.error('Error fetching user:', response);
        }
      } catch (error) {
        setError(true);
        console.error('Error fetching user:', error);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, [id, currUser.username]);

  return (
    <div>
      {error && (<div>No user found with this username...</div>)}
      {loading && (<div>Loading...</div>)}
      {!loading && user && (<div>Welcome {user.fullName}</div>)}
    </div>
  )
}

export default Profile;