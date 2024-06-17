import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../Components/Navbar";
import SideBar from "../../Components/SideBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL, timeAgo } from "../../Constants";
import Post from "../../Components/Post";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [comments, setComments] = useState([]);
  const [skip, setSkip] = useState(0);
  const [commentMessage, setCommentMessage] = useState(true);
  const user = JSON.parse(window.localStorage.getItem("user"));
  const postId = useParams().postId;
  const commentRef = useRef();
  const replyRef = useRef();

  const handleReply = async (commentId) => {
    const reply = replyRef.current.value;
    if(!reply){
      alert('Please enter a reply');
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/posts/reply/${commentId}?userId=${user._id}`, {reply});
      if(response.status!==201){
        console.error('Error replying to comment:', response);
        return;
      }
      console.log(response);
      replyRef.current.value = "";
      window.location.reload();
    } catch (error) {
      console.error("Error occured while replying to comment:", error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/posts/${postId}`);
      if (response.status === 200) {
        setPost(response.data.data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
        console.error("Error fetching post:", response);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error("Error fetching post:", error);
    }
  }

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/posts/comment/${postId}?skip=${skip}?limit=6`);
      if(response.status === 200){
        setComments([...comments, ...response.data.data]);
      }else if(response.status === 204){
        setCommentMessage(false);
      }else{
        console.error('Error fetching comments:', response);
      }
      
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [skip]);

  const handleCommentPost = async () => {
    const comment = commentRef.current.value;
    if (!comment) {
      alert("Please enter a comment");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/posts/comment/${postId}?userId=${user._id}`, { comment });
      if (response.status !== 201) {
        console.error("Error posting comment:", response);
        return;
      }
      setPost(response.data.data);
      console.log(response);
      commentRef.current.value = "";
      window.location.reload();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }

  return (
    <div className='h-screen flex flex-col pt-4 w-full'>
      <div className='w-screen'>
        <Navbar setOpenSidebar={setOpenSidebar}/>
      </div>
      <div className='flex h-full'>
        <SideBar openSidebar={openSidebar}/>
        <div className="mx-4 p-2 overflow-y-auto flex-1 md:ml-52 flex flex-col gap-6 items-center mt-24">
            {loading && (<div className="flex items-center justify-center h-full w-full">Loading...</div>)}
            {error && (<div className="flex items-center justify-center h-full w-full">Error fetching post</div>)}
            {post && <Post post={post} />}
            {/* Comments */}
            <div className="w-full bg-white border-2 border-black rounded-lg p-4 flex flex-col gap-2">
                <h1 className="text-xl font-bold">Comments</h1>
                <div className="flex w-full gap-2">
                    <img src={user.profileUrl} className="h-10 rounded-full border-2 border-black"/>
                    <input type="text" placeholder="Add a comment..." className="flex-1 border-2 border-black rounded-full px-4 py-1 text-lg font-semibold" ref={commentRef}/>
                    <div className="border-2 border-black rounded-full p-1 h-10 w-10 flex items-center justify-center hover:scale-105 cursor-pointer bg-[#efffb4]" onClick={handleCommentPost}>
                        <img src="../send.svg" className="h-6"/>
                    </div>
                </div>
                {/* Displaying comments here */}
                <div className="flex flex-col w-full p-2 gap-2">
                  {comments.length > 0 && comments.map((comment) => (
                    <div className="flex flex-col w-full" key={comment._id}>
                      <div className="flex flex-col border-2 border-black rounded-2xl p-2 gap-2 bg-[#efffb4]">
                        <div className="flex w-full gap-2 items-center justify-start border-2 border-black rounded-2xl p-2 bg-white ">
                          <img src={comment.createdBy.profileUrl} className="h-10 rounded-full border-2 border-black"/>
                          <div className="flex flex-col w-full">
                            <div className="text-sm font-bold flex justify-between flex-wrap w-full">
                              <div className=" text-red-400 cursor-pointer hover:underline">{comment.createdBy.fullName}</div>
                              <div className="text-xs font-thin">{timeAgo(comment.createdAt)}</div>
                            </div>
                            <p className=" font-semibold text-wrap text-lg">{comment.message}</p>
                          </div>
                          
                        </div>

                        <div className="flex w-full gap-2">
                          <img src={user.profileUrl} className="h-10 rounded-full border-2 border-black"/>
                          <input type="text" placeholder={`Reply to ${comment.createdBy.fullName}`} className="flex-1 border-2 border-black rounded-full px-4 py-1 text-lg" ref={replyRef}/>
                          <div className="border-2 border-black rounded-full p-1 h-10 w-10 flex items-center justify-center hover:scale-105 cursor-pointer bg-white" onClick={()=>{handleReply(comment._id)}}>
                            <img src="../send.svg" className="h-6"/>
                        </div>
                        </div>

                        <div className="flex flex-col w-full">
                          {
                            comment.replies.length > 0 && comment.replies.map((reply, ind)=>(
                              <div className="flex w-full gap-2 items-center justify-start rounded-2xl p-2" key={ind}>
                                <img src={reply.repliedBy.profileUrl} className="h-10 rounded-full border-2 border-black"/>
                                <div className="flex flex-col w-full">
                                  <div className="text-sm font-bold flex justify-between flex-wrap w-full">
                                    <div className=" text-blue-400 cursor-pointer hover:underline">{reply.repliedBy.fullName}</div>
                                    <div className="text-xs font-thin">{timeAgo(reply.createdAt)}</div>
                                  </div>
                                  <div>{reply.reply}</div>
                                </div>
                                
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="m-2">{commentMessage?<p onClick={()=>{
                    setSkip(comments.length);
                  }} className="cursor-pointer text-blue-400 hover:underline">Load More Comments</p>:""}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
};

export default PostPage;