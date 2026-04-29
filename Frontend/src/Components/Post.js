import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Constants';
import { useLocation, useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState(post?.likes?.includes(user._id) || false);
  const [isLiking, setIsLiking] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const previousImage = () => {
    if (current === 0) {
      setCurrent(post.imageLinks.length - 1);
    } else {
      setCurrent(current - 1);
    }
  };

  const nextImage = () => {
    if (current === post.imageLinks.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  const toggleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    const previousLiked = liked;
    
    // Optimistic update
    if (liked) {
      setLiked(false);
      post.likes = post.likes.filter(like => like !== user._id);
    } else {
      setLiked(true);
      post.likes.push(user._id);
    }

    try {
      const response = await axios.put(`${BASE_URL}/api/posts/toggleLike/${post._id}?userId=${user._id}`);
      if (response.status !== 200) {
        // Revert on error
        setLiked(previousLiked);
        if (previousLiked) {
          post.likes.push(user._id);
        } else {
          post.likes = post.likes.filter(like => like !== user._id);
        }
        console.error('Error toggling like:', response);
      }
    } catch (error) {
      // Revert on error
      setLiked(previousLiked);
      if (previousLiked) {
        post.likes.push(user._id);
      } else {
        post.likes = post.likes.filter(like => like !== user._id);
      }
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="
      bg-black 
      border-2 
      border-yellowgreen 
      rounded-lg 
      p-6 
      font-mono 
      text-white 
      shadow-lg 
      hover:shadow-yellowgreen/20 
      transition-all 
      duration-300 
      w-full 
      max-w-2xl 
      mx-auto
    ">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-yellowgreen/30">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-yellowgreen text-sm">~/posts/{post._id.slice(-8)}</span>
      </div>

      {/* Post Header */}
      <div className="flex w-full gap-3 mb-4">
        <img
          src={post.createdBy.profileUrl || '/profile.png'}
          alt="profile"
          className="w-12 h-12 rounded-full border-2 border-yellowgreen object-cover"
        />
        <div className="flex flex-col flex-1">
          <div className="text-yellowgreen font-bold text-lg">
            {post.createdBy.fullName}
          </div>
          <div 
            className="text-gray-400 text-sm hover:text-yellowgreen cursor-pointer transition-colors"
            onClick={() => navigate(`/profile/${post.createdBy.username}`)}
          >
            @{post.createdBy.username}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {post.tags.map((tag, ind) => (
            <span 
              key={ind} 
              className="
                bg-yellowgreen/20 
                text-yellowgreen 
                rounded-md 
                px-2 
                py-1 
                text-xs 
                border 
                border-yellowgreen/50
                hover:bg-yellowgreen/30 
                transition-colors
              "
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Post Title */}
      <div className="text-xl font-bold mb-3 text-yellowgreen">
        &gt; {post.title}
      </div>

      {/* Post Body */}
      <div className="text-gray-300 mb-4 leading-relaxed">
        {post.body}
      </div>

      {/* Image Gallery */}
      {post.imageLinks.length > 0 && (
        <div className="
          border-2 
          border-yellowgreen/50 
          rounded-lg 
          min-h-48 
          mb-4 
          overflow-hidden 
          relative 
          bg-gray-900
        ">
          {post.imageLinks.length === 1 ? (
            <img 
              src={post.imageLinks[0]} 
              alt="post" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div 
              className="flex transition-transform duration-300 ease-out items-center h-full"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {post.imageLinks.map((img, ind) => (
                <img 
                  key={ind} 
                  src={img} 
                  alt="post" 
                  className="w-full h-full object-cover flex-shrink-0"
                />
              ))}
            </div>
          )}
          
          {post.imageLinks.length > 1 && (
            <>
              {/* Navigation Buttons */}
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button
                  onClick={previousImage}
                  className="
                    w-10 h-10 
                    bg-black/80 
                    border-2 
                    border-yellowgreen 
                    rounded-full 
                    text-yellowgreen 
                    hover:bg-yellowgreen 
                    hover:text-black 
                    transition-all 
                    duration-200 
                    flex 
                    items-center 
                    justify-center
                  "
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="
                    w-10 h-10 
                    bg-black/80 
                    border-2 
                    border-yellowgreen 
                    rounded-full 
                    text-yellowgreen 
                    hover:bg-yellowgreen 
                    hover:text-black 
                    transition-all 
                    duration-200 
                    flex 
                    items-center 
                    justify-center
                  "
                >
                  ›
                </button>
              </div>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {post.imageLinks.map((_, ind) => (
                  <div
                    key={ind}
                    className={`
                      w-2 h-2 
                      rounded-full 
                      transition-colors 
                      ${current === ind ? 'bg-yellowgreen' : 'bg-gray-600'}
                    `}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center gap-6 pt-4 border-t border-yellowgreen/30">
        {/* Like Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLike}
            disabled={isLiking}
            className={`
              flex items-center gap-2 px-3 py-1 rounded-md transition-all duration-200
              ${liked 
                ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                : 'bg-gray-800 text-gray-400 border border-gray-600 hover:border-yellowgreen hover:text-yellowgreen'
              }
              ${isLiking ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
            `}
          >
            <span className="text-lg">{liked ? '♥' : '♡'}</span>
            <span className="font-bold">{post.likes.length}</span>
          </button>
        </div>

        {/* Comment Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (location.pathname === '/home') {
                navigate(`/post/${post._id}`);
              }
            }}
            className="
              flex items-center gap-2 px-3 py-1 rounded-md transition-all duration-200
              bg-gray-800 text-gray-400 border border-gray-600 
              hover:border-yellowgreen hover:text-yellowgreen hover:scale-105
            "
          >
            <span className="text-lg">💬</span>
            <span className="font-bold">{post.comments.length}</span>
          </button>
        </div>

        {/* View Post Button */}
        {location.pathname === '/home' && (
          <button
            onClick={() => navigate(`/post/${post._id}`)}
            className="
              ml-auto 
              flex items-center gap-2 
              px-3 py-1 
              rounded-md 
              bg-yellowgreen/20 
              text-yellowgreen 
              border border-yellowgreen/50 
              hover:bg-yellowgreen 
              hover:text-black 
              transition-all 
              duration-200 
              hover:scale-105
            "
          >
            <span>View Post</span>
            <span>→</span>
          </button>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="mt-4 pt-2 border-t border-yellowgreen/30 text-xs text-gray-500">
        <span>$ post --id={post._id.slice(-8)} --status=loaded</span>
      </div>
    </div>
  );
};

export default Post;