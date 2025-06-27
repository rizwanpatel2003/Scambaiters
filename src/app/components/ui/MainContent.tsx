"use client"

import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { Query } from "mongoose";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import PostCard from "./PostCard";

function MainContent() {
const[posts,setposts]=useState([])
;
const router =useRouter()

const Posts= async function () {
    try {
      const response=await axios.get("http://localhost:3000/api/post/postdata");
         setposts(response.data.postdata);
    } catch (error) {
        console.log(error)
    }
}

useEffect(()=>{
Posts()
},[])

    return (
        <div className="w-full max-w-3xl flex flex-col items-center mx-auto px-2 sm:px-4 md:px-8 py-6 gap-6 min-w-0">
            <div className="flex w-full justify-center items-center mb-4">
                <input type="text" className="w-full p-2 h-12 sm:h-16 bg-neutral-950 shadow-sm shadow-white border-none transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white rounded-full border-green-300" placeholder="Type something..."/>
            </div>
            <h1 className="text-3xl font-Rampart font-extrabold text-white self-start ml-2 mb-4">Feed</h1>
            {posts.map((post:any) => (
                <PostCard postId={post._id} name={post.name} title={post.title} content={post.content} communityId={post.communitid} Tlike={post.likes || 0} comments={post.comments?.length || 0} media={post.media} key={post._id} />
            ))}
        </div>
    )
}

export default MainContent
