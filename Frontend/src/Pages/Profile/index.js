import React, {useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Constants';
import Navbar from '../../Components/Navbar';
import SideBar from '../../Components/SideBar';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  const {id} = useParams();
  const [currUser,setCurrUser] = useState(JSON.parse(window.localStorage.getItem('user')));
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isUserItself, setIsUserItself] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/user/${id}`);
      if (response.status === 200) {
        setUser(response.data.data);
        setError(false);
        if (currUser.username === response.data.data.username) {
          setIsUserItself(true);
        }
      } else {
        setError(true);
        setUser(null);
        console.error('Error fetching user:', response);
      }
    } catch (error) {
      setError(true);
      setUser(null);
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  }
  

  useEffect(() => {
    fetchUser();
  }, [id, currUser.username]);


  const toggleFollowing = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/toggle-following`, {
        userId: currUser._id,
        followId: user._id
      });
      if (response.status === 200) {
        const updatedCurrUser = response.data.data;
        setCurrUser(updatedCurrUser);
        window.localStorage.setItem('user', JSON.stringify(updatedCurrUser));
        setUser(prevUser => ({
          ...prevUser,
          followers: prevUser.followers.includes(currUser._id)
            ? prevUser.followers.filter(id => id !== currUser._id)
            : [...prevUser.followers, currUser._id]
        }));
      }
    } catch (error) {
      console.error('Error toggling following:', error);
    }
  };
  

  const handleAvatarChange = async () => {};

  const handleUserDetailsChange = async () => {};

  return (
    <div className='h-screen flex flex-col pt-4 w-full'>
      <div className='w-screen'>
        <Navbar setOpenSidebar={setOpenSidebar}/>
      </div>
      <div className='flex h-full'>
        <SideBar openSidebar={openSidebar}/>
        <div className="mx-4 p-2 overflow-y-auto flex-1 md:ml-52 flex flex-col gap-6 items-center mt-24">
          {loading && <div>Loading...</div>}
          {error && <div>Error fetching user</div>}
          {!loading && user && (
            <div className='border-2 w-full flex flex-col h-full'>
              <div className='flex gap-4 flex-wrap items-center p-2'>
                <div className='relative'>
                  <img src={user.profileUrl} className='w-32 h-32 rounded-full'/>
                  {isUserItself && (
                    <div className='bg-white h-10 w-10 rounded-full z-50 absolute bottom-0 right-0 border-2 border-black hover:scale-95 cursor-pointer'> 
                      <img src="/edit.png" className='p-1 object-cover'/>
                    </div>
                  )}
                </div>
                <div className='px-4 flex flex-col justify-center'>
                  <h1 className='font-bold text-3xl md:text-5xl'>{user.fullName}</h1>
                  <h2 className=' text-xl md:text-2xl'>{user.username}</h2>
                </div>
                {!isUserItself && (
                  currUser.following.includes(user._id) ? (
                    <div className='bg-red-500 text-white h-10 p-2 rounded-md cursor-pointer' onClick={toggleFollowing}>Following</div>
                  ) : (
                    <div className='bg-blue-500 text-white h-10 p-2 rounded-md cursor-pointer hover:translate-y-1 hover:scale-95' onClick={toggleFollowing}>Follow</div>
                  )
                )}
              </div>
              <div className='flex gap-4 p-2 m-2 rounded-lg justify-start flex-wrap font-bold'>
                <div className=' p-2 rounded-md bg-[#d6ff40] border-2 border-black'>
                  <h1>{`${user.followers.length} Followers`}</h1>
                </div>
                <div className=' p-2 rounded-md bg-[#d6ff40] border-2 border-black'>
                <h1>{`${user.following.length} Following`}</h1>
                </div>
                <div className=' p-2 rounded-md bg-[#d6ff40] border-2 border-black'>
                <h1>{`${user.solvedProblems.length} Solved`}</h1>
                </div>
                <div className=' p-2 rounded-md bg-[#d6ff40] border-2 border-black'>
                  <h1>{`${user.createdPosts.length} Posts`}</h1>
                </div>
              </div>
              {/* Navbar for subroutes of profile page*/}
              <div className='flex gap-4 font-semibold p-2 bg-black m-2 flex-wrap rounded-lg'>
                <Link to="followers">
                  <div className={`${location.pathname.endsWith("followers") ? "bg-white text-black" : "text-white"} p-2 rounded-lg border-2 border-black `}>Followers</div>
                </Link>
                <Link to="following">
                  <div className={`${location.pathname.endsWith("following") ? "bg-white text-black" : "text-white"} p-2 rounded-lg border-2 border-black`}>Following</div>
                </Link>
                <Link to="saved">
                  <div className={`${location.pathname.endsWith("saved") ? "bg-white text-black" : "text-white"} p-2 rounded-lg border-2 border-black`}>Saved</div>
                </Link>
                <Link to="posts">
                  <div className={`${location.pathname.endsWith("posts") ? "bg-white text-black" : "text-white"} p-2 rounded-lg border-2 border-black`}>Posts</div>
                </Link>
              </div>
              <Outlet context={{ user, currUser, isUserItself }}/>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile;