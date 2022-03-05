
import {
    ChartBarIcon,
    ChatIcon,
    DotsHorizontalIcon,
    HeartIcon,
    ShareIcon,
    SwitchHorizontalIcon,
    TrashIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from 'react'
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState, caseState } from "../atoms/modalAtom";
import { useRouter } from "next/router";
function Comment({ comment }) {
    const { data: session } = useSession();
    const [postId, setPostId] = useRecoilState(postIdState);
    const [liked, setLiked] = useState(false);
    const tag = comment.username
        .split(" ")
        .join("")
        .toLocaleLowerCase();
    const router = useRouter();


    const solve=async()=>{
        try
        {
            const response= await fetch(`/api/stores/${comment._id}`,{
                method:"DELETE",
                headers: { "Content-Type": "application/json" },
            });
            router.push(`/`)
        }
        catch(err){
            console.error(err)
        }
    
    }


    return (

        <div
            className="p-3 flex cursor-pointer border-b border-gray-700"
          
           
        >
            {!comment && (
                <img
                    src={comment?.userImg}
                    alt=""
                    className="h-11 w-11 rounded-full mr-4"
                />
            )}
            <div className="flex flex-col space-y-2 w-full">
                <div className={`flex ${!comment && "justify-between"}`}>
                    {comment && (
                        <img
                            src={comment?.userImg}
                            alt="Profile Pic"
                            className="h-11 w-11 rounded-full mr-4"
                        />
                    )}
                    <div className="text-[#6e767d]">
                        <div className="inline-block group">
                            <h4
                                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${comment && "inline-block"
                                    }`}
                            >
                                {comment?.username}
                            </h4>
                            <span
                                className={`text-sm sm:text-[15px] ${comment && "ml-1.5"}`}
                            >
                                @{tag}
                            </span>
                        </div>·{" "}
                        <span className="hover:underline text-sm sm:text-[15px]">
                            <Moment fromNow>{comment?.timestamp}</Moment>
                        </span>
                        {comment && (
                            <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                                {comment?.input}
                            </p>
                        )}
                    </div>
                    <div className="icon group flex-shrink-0 ml-auto">
                        <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
                    </div>
                </div>
                {comment && (
                    <p className="text-[#d9d9d9] mt-0.5 text-xl">{comment?.text}</p>
                )}
                <img
                    src={comment?.img}
                    alt=""
                    className="rounded-2xl max-h-[700px] object-cover mr-2"
                />
                <div
                    className={`text-[#6e767d] flex justify-between w-10/12 ${comment && "mx-auto"
                        }`}
                >
                    <div
                        className="flex items-center space-x-1 group"
                        onClick={(e) => {
                            e.stopPropagation();
                          
                        }}
                    >
                        <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
                            <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
                        </div>
                      
                    </div>

                    {session.user.email === comment?.email ? (
                        <div
                            className="flex items-center space-x-1 group"
                           onClick={solve}
                        >
                            <div className="icon group-hover:bg-red-600/10">
                                <TrashIcon className="h-5 group-hover:text-red-600" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-1 group">
                            <div className="icon group-hover:bg-green-500/10">
                                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
                            </div>
                        </div>
                    )}

                

                    <div className="icon group">
                        <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                    <div className="icon group">
                        <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Comment;