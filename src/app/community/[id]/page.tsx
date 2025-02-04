/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Banner from 'app/components/ui/Banner';
import JoinCard from 'app/components/ui/JoinCard';
import Pinned from 'app/components/ui/Pinned';
import PostCard from 'app/components/ui/PostCard';
import Sidebar from 'app/components/ui/Sidebar';

import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Description from 'app/components/ui/description';

// interface Item {
//   map(arg0: (post: Item) => React.JSX.Element): React.ReactNode;

//   description: string; 
//   title: string;       
//   _id: string;
//   lik
 
           
// }

function Page() {
     const Id= useParams().id;

     const [posts, setPosts] = useState([]);
      const [name, setName] = useState("");

      const [des,setdes]=useState("")
  
  const Posts=async function() {

      try {
        const response= await axios.post("http://localhost:3000/api/communities/posts",{
            communityId:Id
        })
      setPosts(response.data.data.posts)
     setName(response.data.data.
name)
setdes(response.data.data.
  descripton
  )
      console.log(posts)
      console.log(response)
        
      } catch (error) {
        console.log("the post request is failed",error)
      }
        
    }  
  useEffect(()=>{
     Posts()
  },[])


    return (
      <div className="flex  w-full">
        <Sidebar></Sidebar>
        <div className=" flex flex-col flex-1 text-white">
          <Banner name={name}></Banner>
          <div className="w-full flex">
  <div className="w-2/3 h-screen ">
    <h1 className='text-2xl opacity-50 '>Pinned</h1>
     <Pinned></Pinned>
     <h1 className='text-2xl opacity-50 '>Posts</h1>
    {
      posts.map((post:any)=>{
      return  ( 
        <>
          
      <PostCard key={post._id} postId={post._id} name={name} title={post.title} content={post.description} Tlike={post.likes} ></PostCard>
      </>
      )
      })
    }
  </div>

  <div className="w-1/3 h-screen ">
  <h1 className='text-3xl  font-Roboto Flex font-bold '>Descrption</h1>
       {/* <div className="w-11/12 h-[300px] bg-neutral-950 rounded-[38px] my-5 text-white px-[3vh] py-2 text-balance overflow-auto shadow-sm shadow-white  transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white">
       <h1 className='text-2xl  font-Roboto Flex font-bold '>{name}</h1>
         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita adipisci fuga asperiores odio ipsum amet architecto! Fugit, ipsam? Illum delectus iste recusandae reprehenderit quasi veniam at ad, quaerat itaque assumenda?reprehenderit quasi veniam at ad, quaerat itaque assumenda?
       </div> */}
       <Description name={name} description={des}></Description>
       <h1 className="my-5 text-xl opacity-50">Hall of fame</h1>
       <div className='w-11/12 h-[300px] bg-neutral-950 rounded-[38px] shadow-sm shadow-white mr-8  transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white '>
            <JoinCard head='sbsjbkisbs' main='sgidhda' ></JoinCard>
       </div>
       <div>
       </div>  
        </div>
        </div>
        </div>
      </div>
    )
}

export default Page
