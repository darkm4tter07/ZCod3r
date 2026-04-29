import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Constants";

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const menuRef = useRef();
  const searchRef = useRef();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const profileImg = user?.profileUrl || "/profile.png";
  const username = user?.username;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!query.trim()) {
        setUsers([]);
        return;
      }
      try {
        const res = await axios.get(`${BASE_URL}/api/users/search?query=${query}`);
        setUsers(res.data.data);
      } catch (err) {
        setUsers([]);
      }
    };
    fetchUsers();
  }, [query]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black text-yellowgreen shadow-md font-['JetBrains_Mono']">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Terminal Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight select-none outline-none focus:outline-none">
          <span className="text-yellowgreen">ZCod3r</span><span className="text-white">:~$</span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex relative w-1/3">
          <input
            type="text"
            className="bg-[#1a1a1a] text-white w-full py-2 px-4 rounded-lg border border-yellowgreen focus:outline-none focus:ring-2 focus:ring-yellowgreen"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <div ref={searchRef} className="absolute top-12 left-0 w-full max-h-60 overflow-y-auto bg-black border border-yellowgreen rounded-lg shadow-lg z-10">
              {users.length === 0 ? (
                <div className="p-3 text-white">No users found</div>
              ) : (
                users.map((user, i) => (
                  <div
                    key={i}
                    className="p-3 text-white hover:bg-yellowgreen hover:text-black cursor-pointer"
                    onClick={() => {
                      navigate(`/profile/${user.username}`);
                      setQuery("");
                      setShowSearch(false);
                    }}
                  >
                    {user.fullName}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Search icon for mobile */}
          <div className="md:hidden cursor-pointer" onClick={() => setShowSearch(!showSearch)}>
            <img src="/userSearch.svg" className="w-6 h-6" />
          </div>

          {/* Profile */}
          <div className="relative">
            <img
              src={profileImg}
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-yellowgreen cursor-pointer"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              referrerPolicy="no-referrer"
            />
            {showProfileMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-40 bg-black border border-yellowgreen rounded-lg shadow-lg text-white overflow-hidden z-50"
              >
                <Link
                  to={`/profile/${username}`}
                  className="block px-4 py-2 hover:bg-yellowgreen hover:text-black"
                >
                  Profile
                </Link>
                <div
                  onClick={handleLogout}
                  className="block px-4 py-2 hover:bg-yellowgreen hover:text-black cursor-pointer"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search dropdown for mobile */}
      {showSearch && (
        <div className="px-6 pb-4 md:hidden">
          <input
            type="text"
            className="bg-[#1a1a1a] text-white w-full py-2 px-4 rounded-lg border border-yellowgreen focus:outline-none focus:ring-2 focus:ring-yellowgreen"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
