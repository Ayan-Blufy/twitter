import React, { useState, useEffect } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { db } from "../firebase";
import { handlePostState, useSSRPostsState, likeState } from "../atoms/postAtom";

const Post = ({ key, id, post }) => {


  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post?.likes);

  const [handlePost, setHandlePost] = useRecoilState(handlePostState);


  const router = useRouter();
  const tag = session.user.name
    .split(" ")
    .join("")
    .toLocaleLowerCase();

  // useEffect(




  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/stores`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();

      const arr = responseData.filter((ele) => {
        return ele.roll === id;
      })

      setComments(arr);

    };
    fetchPosts();

  }, [])



  const solve = async (e) => {
    // e.stopPropagation();
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setHandlePost(true);
      router.push('/');

    } catch (err) {
      console.log(err);
    }



  }




  return (
    <>

      <div
        className="p-3 flex cursor-pointer border-b border-gray-700"
        onClick={() => router.push(`/${id}`)}
      >
        {!post && (
          <img
            src={post?.userImg}
            alt=""
            className="h-11 w-11 rounded-full mr-4"
          />
        )}
        <div className="flex flex-col space-y-2 w-full">
          <div className={`flex ${!post && "justify-between"}`}>
            {post && (
              <img
                src={post?.userImg}
                alt="Profile Pic"
                className="h-11 w-11 rounded-full mr-4"
              />
            )}
            <div className="text-[#6e767d]">
              <div className="inline-block group">
                <h4
                  className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${post && "inline-block"
                    }`}
                >
                  {post?.username}
                </h4>
                <span
                  className={`text-sm sm:text-[15px] ${post && "ml-1.5"}`}
                >
                  @{tag}
                </span>
              </div>·{" "}
              <span className="hover:underline text-sm sm:text-[15px]">
                <Moment fromNow>{post?.timestamp}</Moment>
              </span>
              {post && (
                <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                  {post?.input}
                </p>
              )}
            </div>
            <div className="icon group flex-shrink-0 ml-auto">
              <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
            </div>
          </div>
          {post && (
            <p className="text-[#d9d9d9] mt-0.5 text-xl">{post?.text}</p>
          )}
          <img
            src={post?.img}
            alt=""
            className="rounded-2xl max-h-[700px] object-cover mr-2"
          />
          <div
            className={`text-[#6e767d] flex justify-between w-10/12 ${post && "mx-auto"
              }`}
          >
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                setPostId(id);
                setIsOpen(true);
              }}
            >
              <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
                <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
              </div>
              {comments.length > 0 && (
                <span className="group-hover:text-[#1d9bf0] text-sm">
                  {comments.length}
                </span>
              )}
            </div>

            {session.user.email === post?.email ? (
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

            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);

              }}
            >
              <div className="icon group-hover:bg-pink-600/10"  >
                {liked ? (
                  <HeartIconFilled className="h-5 text-pink-600" />
                ) : (
                  <HeartIcon className="h-5 group-hover:text-pink-600" />
                )}
              </div>
              {likes > 0 && (
                <span
                  className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                    }`}
                >
                  {likes}
                </span>
              )}
            </div>

            <div className="icon group">
              <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            <div className="icon group">
              <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post
