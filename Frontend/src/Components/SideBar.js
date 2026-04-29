import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Constants';

const SideBar = () => {
  const [topCoders, setTopCoders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
  };

  useEffect(() => {
    fetchTopCoders();
  }, []);

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && !e.target.closest('.sidebar-container') && !e.target.closest('.sidebar-toggle')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const navItems = [
    { name: 'HOME', path: '/home', icon: '/Home.svg' },
    { name: 'DISCUSSIONS', path: '/discussions', icon: '/Problems.svg' },
    { name: 'DOUBTS', path: '/doubts', icon: '/Chat.svg' },
    { name: 'ARENA', path: '/problems', icon: '/Problems.svg' },
    { name: 'CHATS', path: '/chats', icon: '/Chat.svg' },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        className="sidebar-toggle fixed top-[4.5rem] left-4 z-50 md:hidden bg-yellowgreen text-black p-2 rounded-md shadow-lg hover:bg-yellow-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"></div>
      )}

      {/* Sidebar */}
      <div
        className={`sidebar-container fixed z-40 transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          top-16 md:top-20 left-0 md:left-4 
          h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-6rem)]
          w-64 md:w-52 
          border-2 border-yellowgreen bg-[#0e0e0e] text-white rounded-none md:rounded-xl 
          font-mono shadow-2xl md:shadow-none overflow-hidden flex flex-col`}
      >
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-yellowgreen">
          <span className="text-yellowgreen font-bold">ZCod3r Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-yellowgreen hover:text-yellow-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Section */}
        <div className="p-4 border-b border-yellowgreen flex-shrink-0">
          <p className="text-yellowgreen text-sm mb-3 font-bold">~/ZCod3r</p>
          <div className="space-y-1">
            {navItems.map((item, idx) => (
              <Link key={idx} to={item.path}>
                <div
                  className={`flex items-center gap-3 py-2.5 px-3 rounded-md cursor-pointer transition-all duration-200
                  ${location.pathname === item.path 
                    ? 'bg-yellowgreen text-black font-bold shadow-sm' 
                    : 'hover:bg-[#1a1a1a] hover:translate-x-1'}`}
                >
                  <img src={item.icon} alt={item.name} className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Coders Section */}
        <div className="p-4 text-sm flex-1 overflow-y-auto">
          <p className="text-yellowgreen mb-3 font-bold">TOP CODERS</p>
          <div className="space-y-2">
            {topCoders.length > 0 ? (
              topCoders.map((coder, ind) => (
                <div
                  key={ind}
                  onClick={() => navigate(`/profile/${coder.username}`)}
                  title={coder.fullName}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-[#1a1a1a] cursor-pointer transition-all duration-200 hover:translate-x-1"
                >
                  <img
                    src={coder.profileUrl || '/profile.png'}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-yellowgreen flex-shrink-0"
                  />
                  <span className="truncate text-sm">{coder.fullName.slice(0, 16)}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-4">
                <div className="text-gray-400 text-xs">
                  <div className="animate-pulse">Fetching coders...</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-yellowgreen text-xs text-gray-400 flex-shrink-0">
          <p className="font-mono">$ logout</p>
        </div>
      </div>
    </>
  );
};

export default SideBar;