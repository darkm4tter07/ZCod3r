import React from 'react'
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  return (
    <div className={`absolute left-0 top-24 my-4 mx-4 min-h-[520px] bg-white rounded-lg border-[3px] border-black w-44 ${!openSidebar?"hidden": ""} md:block z-50`} >
        {
          (<div className='flex flex-col justify-center p-4 border-b-2 border-gray-600 mx-1'>
            {["Home", "Problems", "Saved"].map((item, ind)=>(
              <div className={`my-2 p-2 rounded-md hover:invert font-bold cursor-pointer bg-white flex gap-1.5 text-md justify-start 
                 items-center ${location.pathname===`/${item.toLowerCase()}`?"invert":""} py-2`} key={ind}><img src={`${item}.svg`} alt={item} className='w-6'/><p>{item.toUpperCase()}</p></div>
            )
            )}
          </div>)
        }
    </div>
  )
}

export default SideBar