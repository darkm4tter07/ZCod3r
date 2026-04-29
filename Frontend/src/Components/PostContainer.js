import React, { useState, useEffect, useRef } from 'react';
import { BASE_URL } from '../Constants';
import axios from 'axios';
import Post from './Post';

const PostContainer = () => {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/posts?skip=${skip}`);
      if (response.status === 200) {
        const newPosts = response.data.data;
        if (newPosts.length === 0) {
          setHasMore(false);
        } else {
          setPosts(prev => [...prev, ...newPosts]);
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log('posts: ', posts);
  console.log(hasMore);
  console.log('skip: ', skip);
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    console.log('scrollTop: ', scrollTop);
    if (scrollTop + offsetHeight >= scrollHeight) {
      setSkip(posts.length);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [skip]);
  

  return (
    <div className="flex-1 relative" >
      <div
        ref={containerRef}
        className="h-[calc(100vh-4rem)] overflow-y-auto px-4 pt-8 pb-6 md:px-6 md:pt-6 scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-yellowgreen"
        onScroll={handleScroll}
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-20">
          {posts.length > 0 ? (
            posts.map((post, ind) => <Post post={post} key={ind} />)
          ) : (
            !loading && (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-black border-2 border-yellowgreen rounded-lg font-mono">
                <div className="text-yellowgreen text-6xl mb-4 font-mono">&gt;_</div>
                <h2 className="text-white text-xl font-mono mb-2">No posts found</h2>
                <p className="text-gray-400 font-mono text-sm">$ create_post --new</p>
              </div>
            )
          )}

          {loading && (
            <div className="flex items-center justify-center py-8 bg-black border-2 border-yellowgreen rounded-lg font-mono">
              <div className="flex items-center gap-3 text-yellowgreen font-mono">
                <div className="animate-spin w-5 h-5 border-2 border-yellowgreen border-t-transparent rounded-full"></div>
                <span>$ loading_posts...</span>
              </div>
            </div>
          )}

          {!hasMore && posts.length > 0 && (
            <div className="flex items-center justify-center py-6 bg-black border-2 border-yellowgreen/50 rounded-lg text-gray-400 font-mono text-sm">
              <div className="flex items-center gap-3">
                <span className="text-yellowgreen">───</span>
                <span>$ end_of_feed</span>
                <span className="text-yellowgreen">───</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        className="fixed bottom-24 right-8 md:bottom-8 md:right-8 w-12 h-12 bg-yellowgreen text-black rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-40 opacity-0 pointer-events-none group"
        onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          opacity: containerRef.current?.scrollTop > 300 ? 1 : 0,
          pointerEvents: containerRef.current?.scrollTop > 300 ? 'auto' : 'none'
        }}
      >
        <svg className="w-6 h-6 mx-auto group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default PostContainer;
