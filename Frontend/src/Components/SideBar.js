import React, {useState, useEffect} from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Constants';
import axios from 'axios';

const contests = [
  {
    date: "2022-10-01",
    platform: "Codeforces",
    link: "https://codeforces.com"
  },
  {
    date: "2022-10-05",
    platform: "Topcoder",
    link: "https://www.topcoder.com"
  },
  {
    date: "2022-10-10",
    platform: "AtCoder",
    link: "https://atcoder.jp"
  },
  {
    date: "2022-10-15",
    platform: "LeetCode",
    link: "https://leetcode.com"
  },
  {
    date: "2022-10-20",
    platform: "HackerRank",
    link: "https://www.hackerrank.com"
  }
];

const SideBar = ({openSidebar}) => {
  const [topCoders, setTopCoders] = useState([]);
  const navigate = useNavigate();
  const fetchTopCoders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/topcoders`);
      if (response.status === 200) {
        setTopCoders(response.data.data);
      } else {
        console.error('Error fetching top coders:', response);
      }
    } catch (error) {
      console.error('Error fetching top coders:', error);
    }
  }

  useEffect(() => {
    fetchTopCoders();
  }, []);
  const location = useLocation();
  return (
    <div className={`absolute left-0 top-24 my-4 mx-4 min-h-[82vh] bg-white rounded-lg border-[3px] border-black w-44 ${!openSidebar?"hidden": ""} md:block z-50`} >
        <div className='flex flex-col justify-center p-4 border-b-2 border-gray-600 mx-1'>
            <Link to="/home">
              <div className={`my-2 p-2 rounded-md hover:invert font-bold cursor-pointer bg-white flex gap-1.5 text-md justify-start items-center ${location.pathname===`/home`?"invert":""} py-2`}>
                <img src="/Home.svg" alt="Home" className='w-6'/>
                <p>HOME</p>
              </div>
            </Link>
            <Link to="/problems">
              <div className={`my-2 p-2 rounded-md hover:invert font-bold cursor-pointer bg-white flex gap-1.5 text-md justify-start items-center ${location.pathname===`/problems`?"invert":""} py-2`}>
                <img src="/Problems.svg" alt="Home" className='w-6'/>
                <p>PROBLEMS</p>
              </div>
            </Link>
            <Link to="/chats">
              <div className={`my-2 p-2 rounded-md hover:invert font-bold cursor-pointer bg-white flex gap-1.5 text-md justify-start items-center ${location.pathname===`/chats`?"invert":""} py-2`}>
                <img src="/Chat.svg" alt="Home" className='w-6'/>
                <p>CHAT</p>
              </div>
            </Link>
        </div>
        <div className='flex flex-col justify-center p-4  border-gray-600 mx-1'>
          <div className="font-bold ">
            <p className='bg-[#d9d9d9] inline rounded-md p-[1px]'>
              TOP CODERS
            </p>
            <div className='flex flex-col gap-2 py-2 my-2'>
            {topCoders.length>0 && topCoders.map((coder, ind)=>(
              <div className='flex gap-2 items-center overflow-hidden py-1 cursor-pointer hover:bg-[#EDF4D3] rounded-lg' key={ind} onClick={()=>{
                navigate(`/profile/${coder.username}`);
              }} title={coder.fullName}>
                <img src={coder.profileUrl? coder.profileUrl: "/profile.png"} className='w-8 h-8 rounded-full'/>
                <p>{coder.fullName.slice(0,10)}</p>
              </div>
            ))}
            </div>
          </div>
        </div>

    </div>
  )
}

export default SideBar