import React, {useState, useEffect} from 'react';
import Navbar from '../../Components/Navbar';
import SideBar from '../../Components/SideBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Constants';
import Post from '../../Components/Post';

const PostPage = () => {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [openSidebar, setOpenSidebar] = useState(false);
    const postId = useParams().postId;

    const fetchPosts = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/api/posts/${postId}`);
            if(response.status === 200){
                setPost(response.data.data);
                setLoading(false);
            }else{
                setError(true);
                console.error('Error fetching post:', response);
            }
        }catch(error){
            setError(true);
            console.error('Error fetching post:', error);
        }
    }
    
    useEffect(() => {
        fetchPosts();
    }, []);
    
    return (
      <div className='h-screen flex flex-col pt-4'>
        <Navbar setOpenSidebar={setOpenSidebar}/>
        <div className='flex p-4 md:ml-48'>
          <SideBar openSidebar={openSidebar}/>
          <div className='flex flex-col flex-1'>
            {loading && <div className='flex items-center justify-center h-full w-full'>Loading...</div>}
            {error && <div className='flex items-center justify-center h-full w-full'>Error fetching post</div>}
            {post && <Post post={post} />}
            {/* comments */}
            <div className='flex-1 bg-white border-2 border-black rounded-lg p-4 my-4'>

            </div>
          </div>
        </div>
          
      </div>
    )
}

export default PostPage