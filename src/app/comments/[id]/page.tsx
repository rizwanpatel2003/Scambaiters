/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import JoinCard from 'app/components/ui/JoinCard';
import PostCard from 'app/components/ui/PostCard';
import Sidebar from 'app/components/ui/Sidebar';
import axios from 'axios';
// Importing compat router
import { useRouter } from 'next/compat/router';
import { useParams } from "next/navigation"
import { useEffect, useState } from 'react';


export default  function Page() {
  interface Comment {
    comment: string;
    userId: string;
    _id: string;
}

interface BiryaniPost {
    _id: string;
    name: string;
    communitid: string;
    title: string;
    content: string;
    __v: number;
    likes: number;
    updatedAt: string; // You might want to use Date type if you parse the date
    comments: Comment[];
}
  
  const projectId = useParams().id;
  const router=useRouter()
   const [input ,setinput]= useState(false);
   const [comment,setcomment]= useState<string>("");
   const[postcomments,setpostComments]=useState([])
  const[post,setpost]= useState<BiryaniPost>({_id: "6733531b6b8989cc5ea75ea7",
    name: "hyderbad",
    communitid: "6732f09fbfbd33487eb9f3ba",
    title: "hyderbad biryani",
    content: "patty",
    __v: 0,
    likes: 0,
    updatedAt: "2024-11-13T13:28:42.710Z",
    comments: [
        {
            comment: "e sala cup namde",
            userId: "67321b641d90eec3661481da",
            _id: "6734a3950d52fa34ac894e30"
        }
    ]})
  const Comment= async function() {
    try {
      const currentUser= await axios.get("http://localhost:3000/api/user/currentuser")
    const response= await axios.post("http://localhost:3000/api/post/comments",{
       userId:currentUser.data.data._id,
       postId:post._id,
       comment: comment
        }
      )
       
       console.log(currentUser.data.data._id);
       console.log(response)
      
    } catch (error) {
        router?.push("/Account/login");
    }
    
  }

  const Postcomment= ()=>{
     Comment()
  }

  const Post= async function() {
      try {

       const respone= await axios.post("http://localhost:3000/api/post/singlepost",{
          postId:projectId
       })
        setpost(respone.data.data)
        setpostComments(
          respone.data.data.comments)
      console.log(  respone.data.data.comments)
        
      } catch (error) {
        console.log("the post is not there ")
      }
  }

  
    useEffect(()=>{
        Post()
    },[])
    return (

           <div className='flex w-full'>
            <Sidebar></Sidebar>
            <div className=" flex-1 flex flex-col items-center  ">
            <div className="w-3/4  flex justify-center items-center ">
             <PostCard postId={post._id} name={post.name} title={post.title} content={post.content} communityId={post.communitid} Tlike={post. likes} comments={post.comments.length}></PostCard>            
             </div>
              <div className='w-3/4 flex items-center justify-center'>
             <input type="text" className=" w-3/4 p-2 h-16 bg-neutral-950 shadow-sm shadow-white text-white border-none  transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white mt-10 rounded-full mb-10 border-green-300 hover:h-[100px] hover:rounded-none " placeholder="Write comment..." id='comment'/>
             <button className='bg-green-300 w-24 p-[1vh] rounded-3xl h-[60px] ml-2' onClick={()=>{
               Postcomment()
             }}>Post</button>
             </div>
             <div className="w-3/4  flex flex-col justify-center items-center ">
              <h1 className=' text-2xl font-Roboto Flex opacity-50 text-white self-start ml-14'>comments</h1>
              { postcomments.map((item:any)=>{
             return ( <JoinCard key={item._id} head={item.userId} main={item.comment} ></JoinCard>

             )
              })
              }
             </div>
          
            </div>

           </div>

//       <div className="flex-1 justify-center items-center">
//      <div className="w-3/4 h-[200px] shadow-sm hover:shadow-md hover:shadow-gray-100 shadow-red-50 rounded-[38px] mt-5 ml-5 flex flex-col justify-evenly items-center " key={post._id}>
//             <h1>{post.name}</h1>
//             <h1>{post.title}</h1>
//             <h1>{post.content}</h1>
//             <svg
//       fill="currentColor"
//       viewBox="0 0 16 16"
//        height="1em"
//       width="1em"
//       className="bg-green-400"
      

// >
//   <path d="M5.338 1.59a61.44 61.44 0 00-2.837.856.481.481 0 00-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 002.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 00.101.025.615.615 0 00.1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 002.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 00-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 011.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 01-2.517 2.453 7.159 7.159 0 01-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 01-1.048-.625 11.777 11.777 0 01-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 012.185 1.43 62.456 62.456 0 015.072.56z" />
// </svg>
//           <button  className="bg-orange-600 rounded-md text-lg "  > follow </button>
//             </div>
//        <div>
//         {post.comments.map((item)=>{
//           return(
//             <div key={item._id} >
//                <h1>{item.userId}</h1>
//                <h1>{item.comment}</h1>
//             </div>
//           )
//         })}
//        </div>
//    <div> <button className='bg-red-400 p-3 ' onClick={
//     ()=>{
//       setinput(!input)
//     }
//    }>add comment</button>
//       <input type="text" className={`${input? "visible": "invisible"}`} onChange={(e)=>{
//         setcomment(e.target.value)
//       }} />
//       <button className='bg-red-400 p-3 ' 
//       onClick={ ()=>{
//         Postcomment()
//       }}
//    >post comment</button>
//    </div>     
//     </div>

    )
  }