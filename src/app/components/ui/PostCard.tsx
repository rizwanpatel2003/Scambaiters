/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {IconMessageCircle, IconShare, IconShield } from "@tabler/icons-react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface data{
    postId:string,    
name:string,
title:string,
content:string,
communityId?:string|undefined,
Tlike:number,
comments?:number
}

function PostCard(
{postId ,   
name,
title,
content,
communityId,Tlike,comments}:data) {

    const router =useRouter()
    const [likes,setlikes]= useState(Tlike)
    const[likesbol,setlikesbol]=useState<boolean>(true)
// const updateLike=(postId:string)=>{
//         like(postId)
//  }
 
 const like=async ()=>{
   try {
     const currentUser= await axios.get("http://localhost:3000/api/user/currentuser");
 
       const response= await axios.post("http://localhost:3000/api/post/likes",{
           userId:currentUser.data.data._id,
          postId:postId
       }
   )
         console.log(currentUser.data.data._id);
         console.log(response)
     
     } catch (error) {
         console.log("unable to update",error);
          router.push("/Account/login")
     }
   
 
 }

//  const updater= (objectId:any)=>{
//     followUpdate(objectId);
// }

const followUpdate= async function () {
 try {
    const currentUser= await axios.get("http://localhost:3000/api/user/currentuser")
    const response= await axios.post("http://localhost:3000/api/user/join",{
      
            id:currentUser.data.data._id,
            userid:communityId
        }
      )
       
       console.log(currentUser.data.data._id);
       console.log(response)
    } catch (error) {
        console.log("unable to update",error);
        router.push("/Account/login")
    }
    
}

 const likeupdater=()=>{
   likesbol? setlikes(likes+1):setlikes(likes-1);
    setlikesbol(!likesbol);

 }
 
   
    return (
        <div className="bg-neutral-950 my-10 rounded-[38px] w-11/12 shadow-sm p-4 shadow-white
        transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white ">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/50" alt="Profile Picture" className="rounded-full w-10 h-10" />
          <div className="ml-3">
            <h3 className="text-xl text-white font-semibold font-Roboto Flex"
             onClick={()=>{
              router.push(`/community/${communityId}`)
         }}>{name}</h3>
            <span className="text-gray-500">{}</span>
          </div>
        </div>
        <div className="flex items-center ">
          <button className="text-white bg-[#00BA7C] hover:underline mr-2 w-20  h-[40px] rounded-[38px] text-lg font-Roboto Flex font-bold " onClick={()=>{
             followUpdate()
          }}>Join</button> {/* Changed: Added Join button */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </div>
      </div>
      <p className="text-white text-2xl font-Roboto Flex font-bold mb-4">
          {title}
      </p>
      <p className="text-white text-lg font-semibold font-Roboto Flex Flex mb-2 post-content  "  onClick={()=>{
             router.push(`/comments/${postId}`)
        }}>
          {content}
      </p>
       
      {/* <div className="flex items-center justify-between mb-4">
        <img src="https://via.placeholder.com/300x200" alt="Mountain Image" className="rounded-lg w-1/3 mr-4" />
        <img src="https://via.placeholder.com/300x200" alt="Mountain Image" className="rounded-lg w-1/3 mr-4" />
        <img src="https://via.placeholder.com/300x200" alt="Mountain Image" className="rounded-lg w-1/3" />
      </div> */}
      <div className="flex items-center justify-between px-[5vh] mt-1">
      <button className="flex items-center text-[#00BA7C] hover:underline" onClick={()=>{
         like()
         likeupdater()
      }}>
         <IconShield></IconShield>Like 
        </button>
        <button className="flex items-center text-[#00BA7C] hover:underline" onClick={()=>{
             router.push(`/comments/${postId}`)
        }}>
          <IconMessageCircle className="mr-1" /> Comment
        </button>
        <button className="flex items-center text-[#00BA7C] hover:underline">
          <IconShare className="mr-1" /> Share
        </button>
      </div>

      <div className="flex items-center justify-between px-[6vh]">
      <button className="flex items-center text-[#00BA7C] hover:underline" onClick={()=>{
         like()
         likeupdater()
      }}>
         {likes}
        </button>
        <button className="flex items-center text-[#00BA7C] hover:underline" onClick={()=>{
             router.push(`/comments/${postId}`)
        }}>
         {comments}
        </button>
        <button className="flex items-center text-[#00BA7C] hover:underline">
          
        </button>
      </div>
    </div>
    )
}

export default PostCard
