import React from 'react';
import { timeAgo } from '../Constants';

const Comments = ({comments, setSkip, commentMessage}) => {
  return (
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
        <div className="m-2">
            {commentMessage?<p onClick={()=>{
            setSkip(comments.length);
        }} className="cursor-pointer text-blue-400 hover:underline">Load More Comments</p>:""}</div>
    </div>
  )
}

export default Comments;