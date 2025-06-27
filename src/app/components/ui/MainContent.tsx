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
         console.log(response.data.postdata)
         setposts(response.data.postdata);

    } catch (error) {
        console.log(error)
    }
}



useEffect(()=>{
Posts()
},[])

    return (
        
     
         <div className=" h-screen flex  flex-1 items-center flex-col ">
            <div className="flex w-2/3 justify-center items-center ">
         <input type="text" className=" w-full p-2 h-16 bg-neutral-950 shadow-sm shadow-white  border-none  transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white mt-10 rounded-full mb-10 border-green-300" placeholder="Type something..."/>
         
           </div>  
           <h1 className="text-3xl font-Rampart  font-extrabold text-white self-start ml-2">Feed</h1>   
          { 
          posts.map((post:any)=>{
         
         return  ( 
            
           <PostCard postId={post._id} name={post.name} title={post.title} content={post.content} communityId={post.communitid} Tlike={post.likes || 0} comments={post.comments?.length || 0} media={post.media} key={post._id}></PostCard>
         )
          {/* <div className="w-3/4 h-[200px] shadow-sm hover:shadow-md hover:shadow-gray-100 shadow-red-50 rounded-[38px] mt-5 ml-5 flex flex-col justify-evenly items-center bg-neutral-900 " key={post._id} onClick={
            ()=>{
                router.push(`/comments/${post._id}`)
            }
         }>
                <h1>{post.name}</h1>
                <h1>{post.title}</h1>
                <h1>{post.content}</h1>
                <svg
          fill="currentColor"
          viewBox="0 0 16 16"
           height="1em"
          width="1em"
          className="bg-green-400"
          onClick={()=>{
              updateLike(post._id)
          }}
    
    >
      <path d="M5.338 1.59a61.44 61.44 0 00-2.837.856.481.481 0 00-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 002.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 00.101.025.615.615 0 00.1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 002.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 00-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 011.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 01-2.517 2.453 7.159 7.159 0 01-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 01-1.048-.625 11.777 11.777 0 01-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 012.185 1.43 62.456 62.456 0 015.072.56z" />
    </svg>
              <button  className="bg-orange-600 rounded-md text-lg " onClick={()=>updater(post.communitid)} > follow </button>
                </div> */}
           
          
       })


          }
          <div className="w-full h-screen bg-black rounded-lg ">

                </div>

        </div> 
      

    )
}

export default MainContent
