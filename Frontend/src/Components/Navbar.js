import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Constants";


const Modal = ({ onClose, userId }) => {
    const modalRef = useRef();
    const navigate = useNavigate();
    const Logout = () => {
        window.localStorage.clear();
        onClose();
        navigate("/");
        window.location.reload();
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [modalRef]);

    return (
        <div
            className="absolute border-[3px] bg-white border-black flex flex-col gap-2 right-8 top-20 shadow-2xl rounded-lg p-4 text-black font-semibold"
            ref={modalRef}
        >
            <div className="flex p-2 gap-2 rounded-lg bg-[#EDF4D3] px-10 border-2 border-black cursor-pointer font-semibold hover:bg-[#efffb4]">
                <Link to={`/profile/${userId}`}>
                    <div>Profile</div>
                </Link>
            </div>
            <div className="flex p-2 gap-2 rounded-lg bg-[#EDF4D3] px-10 border-2 border-black cursor-pointer font-semibold hover:bg-[#efffb4]">
                <div onClick={Logout}>Logout</div>
            </div>
        </div>
    );
};

const SearchUser = ({onClose}) => {
    const [search, setSearch] = useState("");
    const searchRef = useRef();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        if (search === "") {
            setUsers([]);
            return;
        }
        console.log(search);
        try {
            const response = await axios.get(
                `${BASE_URL}/api/users/search?query=${search}`
            );
            if (response.status === 200) {
                setUsers(response.data.data);
                console.log(response);
            } else {
                setUsers([]);
            }
        } catch (error) {
            setUsers([]);
            console.error("Error searching users:", error);
        }
    };

    useEffect(() => {
      fetchUsers();
    }, [search]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [searchRef]);
    return (
        <div className="absolute w-72 max-h-80 bg-[#d9ff52] p-2 right-4 top-[90px] border-black border-2 rounded-lg flex flex-col items-center" ref={searchRef}>
            <div className="bg-white w-64 border-black border-2 rounded-lg">
                <input
                    type="text"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    className="w-full h-full outline-none text-black bg-transparent p-2"
                    placeholder="Search Users..."
                />
            </div>
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto w-full p-2">
                {users.length === 0 && <div className="text-black font-semibold">No users found</div>}
                {users.map((user, ind) => (
                    <div className="font-semibold text-black cursor-pointer hover:scale-95 hover:opacity-70" key={ind} onClick={()=>{
                      navigate(`/profile/${user.username}`);
                    }}>{user.fullName}</div>
                ))}
            </div>
        </div>
    );
};

const Navbar = ({ setOpenSidebar }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const profileImg = window.localStorage.getItem("user")
        ? JSON.parse(window.localStorage.getItem("user")).profileUrl
        : "";
    const userId = window.localStorage.getItem("user")
        ? JSON.parse(window.localStorage.getItem("user")).username
        : "";

    return (
        <div className="bg-black p-4 rounded-lg flex justify-between items-center px-6 mx-4 fixed top-4 left-0 right-0 z-50">
            <div className="text-white font-bold text-3xl md:text-4xl flex gap-4 items-center w-full">
                <div
                    className="md:hidden cursor-pointer hover:scale-90"
                    onClick={() => {
                        setOpenSidebar((prev) => !prev);
                    }}
                >
                    <img src="../burger.svg" className="w-8" />
                </div>
                <p>ZCod3r</p>
            </div>
            <div className="flex text-white gap-4 items-center">
                <div className="h-12 w-12 rounded-full cursor-pointer ml-4 overflow-hidden flex items-center justify-center border-2 border-white" onClick={()=>{
                  setIsSearchOpen(!isSearchOpen);
                }}>
                    <img src="/userSearch.svg" className="h-8" />
                </div>

                <div
                    className="h-12 w-12 rounded-full cursor-pointer ml-4 overflow-hidden"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    <img
                        src={profileImg ? profileImg : `profile.png`}
                        referrerPolicy="no-referrer"
                    />
                </div>
                {isOpen && (
                    <Modal
                        onClose={() => {
                            setIsOpen(false);
                        }}
                        userId={userId}
                    />
                )}
                {
                    isSearchOpen && (
                        <SearchUser
                            onClose={() => {
                                setIsSearchOpen(false);
                            }}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;
