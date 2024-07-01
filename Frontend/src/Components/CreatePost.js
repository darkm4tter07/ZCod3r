import React, { useRef, useState, useEffect } from "react";
import {BASE_URL} from "../Constants.js";
import axios from "axios";

const CreatePost = ({ onCancel }) => {
    const [postData, setPostData] = useState({
        title: "",
        body: "",
        imageFiles: [],
        tags: [],
        createdBy: "",
    });
    let menuRef = useRef();
    let tagsRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onCancel();
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [onCancel]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPostData({ ...postData, imageFiles: [...postData.imageFiles, file] });
        }
    };

    const removeImage = (index) => {
        setPostData({
            ...postData,
            imageFiles: postData.imageFiles.filter((_, i) => i !== index),
        });
    };

    const handleTags = () => {
        const tag = tagsRef.current.value;
        if(tag){
            setPostData({...postData, tags: [...postData.tags, tag]});
            tagsRef.current.value = "";
        }
    };

    const submitForm = async () => {
        if (!postData.title || !postData.body) {
            alert("Please fill all the fields");
            return;
        }
    
        const user = JSON.parse(window.localStorage.getItem("user"));
        if (!user || !user._id) {
            alert("User not authenticated");
            return;
        }
    
        postData.createdBy = user._id;
    
        const formData = new FormData();
        formData.append("title", postData.title);
        formData.append("body", postData.body);
        formData.append("createdBy", postData.createdBy);
        postData.tags.forEach((tag, index) => formData.append(`tags[${index}]`, tag));
        postData.imageFiles.forEach((file, index) => formData.append(`imageFiles`, file));
        try {
            const response = await axios.post(`${BASE_URL}/api/posts/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 201) {
                window.localStorage.setItem("user", JSON.stringify(response.data.data.postOwner));
                window.location.reload();
                onCancel();
            } else {
                alert("Post creation failed");
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    
    return (
        <div className="justify-center items-center flex overflow-x-hidden inset-0 z-50 outline-none focus:outline-none fixed backdrop-blur-sm">
            <div
                className="relative w-[65%] mx-auto text-black bg-[#ffffff] rounded-lg border-[#565656] border-2 my-10 h-[90vh] overflow-auto"
                ref={menuRef}
            >
                <div className="font-bold text-2xl p-6 uppercase">
                    Create Post
                </div>
                <div className="bg-[#efffb4] mx-6 p-4 rounded-md border-2 border-black">
                    <input
                        type="text"
                        className="w-full bg-transparent outline-none text-xl font-bold"
                        placeholder="Title"
                        onChange={(e) => {
                            setPostData({ ...postData, title: e.target.value });
                        }}
                    />
                </div>
                <div className="bg-[#efffb4] mx-6 my-4 p-4 rounded-md h-44 border-2 border-black">
                    <textarea
                        className="w-full h-full bg-transparent outline-none text-lg resize-none"
                        placeholder="Description"
                        onChange={(e) => {
                            setPostData({ ...postData, body: e.target.value });
                        }}
                    />
                </div>
                
                <div className="mx-4">
                    {postData.imageFiles.length<4 &&(
                        <label htmlFor="imageFileInput" className="relative w-[200px] h-36 m-2 border-black border-2 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-[#efffb4]">
                            <span className="block text-[120px] font-thin leading-none">
                                +
                            </span>
                            <span className="block pb-8">Add Images</span>
                            <input
                                type="file"
                                id="imageFileInput"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
                <div className="flex flex-wrap flex-1 mx-4">
                {postData.imageFiles.map((image, ind) => (
                            <div className="relative w-70 h-40 m-2 overflow-hidden shadow-lg border-[#565656] border-2 rounded-lg" key={ind}>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded Banner`}
                                    className="w-full h-full object-cover"
                                />
                                <img
                                    src="Close.png"
                                    alt="x"
                                    onClick={() => removeImage(ind)}
                                    className="absolute top-0 right-0 text-white border-none cursor-pointer mt-1 mr-1 z-60"
                                />
                            </div>
                        ))}
                </div>
                <div className="flex flex-col mx-4 p-2 gap-4">
                    <div className="font-bold rounded-md p-[1px]"><p className="bg-[#d9d9d9] inline p-1 rounded-md uppercase">Add tags</p></div>
                    {postData.tags.length>0 && (
                        <div className="flex flex-wrap  px-2 rounded-md border-2 border-black bg-[#efffb4] py-2 gap-2">
                            {postData.tags.map((tag, ind) => (
                                <div className="bg-white px-2 rounded-md border-2 border-black flex items-center justify-between gap-2" key={ind}>
                                    <p>{tag.slice(0,6)+"..."}</p>
                                    <img src="Close.png" alt="x" className="cursor-pointer w-4 h-4" onClick={() => setPostData({...postData, tags: postData.tags.filter((_, i) => i !== ind)})}/>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex px-4 py-2 rounded-md border-2 border-black bg-[#efffb4] justify-between">
                        <input
                            type="text"
                            placeholder="Tags"
                            ref={tagsRef}
                            className="outline-none text-lg bg-transparent border-b-2 border-black w-3/4"
                        />
                        <div className="border-2 border-black px-2 cursor-pointer rounded-lg text-lg  bg-white hover:invert hover:scale-95" onClick={handleTags}>Add</div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between px-4 py-2 mx-2">
                        <div
                            className="p-1 px-2 bg-[#efffb4] rounded-md border-2 border-black cursor-pointer hover:bg-[#d9d9d9]"
                            onClick={() => {
                                onCancel();
                            }}
                        >
                            Cancel
                        </div>
                        <div
                            className="p-1 px-2 bg-[#efffb4] rounded-md border-2 border-black cursor-pointer hover:bg-[#d9d9d9]"
                            onClick={submitForm}
                        >
                            Post
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
