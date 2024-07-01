import React, {useState, useEffect, useRef} from 'react'
import { BASE_URL } from '../Constants';
import axios from 'axios';
import Post from './Post';

const PostContainer = () => {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);

  const fetchPosts = async () => {
    try{
      const response = await axios.get(`${BASE_URL}/api/posts?skip=${skip}`);
      if(response.status === 200){
        setPosts([...posts,...response.data.data]);
      }else{
        console.error('Error fetching posts:', response);
      }
    }catch(error){
      console.error('Error fetching posts:', error);
    }
  }


  const handleScroll = (e) => {
    const {offsetHeight, scrollTop, scrollHeight} = e.target;
    if(scrollTop + offsetHeight >= scrollHeight){
      setSkip(posts?.length);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [skip]);

  return (
    <div  className='m-4 p-2 overflow-y-auto  md:ml-52 flex flex-col gap-6 mt-24 items-start' onScroll={handleScroll}>
      {posts.length>0 && posts.map(post => (
        <Post key={post._id} post={post} />
      ))}
      
    </div>
  );
}

export default PostContainer