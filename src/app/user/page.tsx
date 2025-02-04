/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import JoinCard from 'app/components/ui/JoinCard'
import User from 'app/components/ui/user'
import axios from 'axios';
import React, { useEffect, useState } from 'react'


function Page() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [Community,setcom]=useState<any>([])
    const curentuser= async function () {
        try {
          const respone= await axios.get("http://localhost:3000/api/user/currentuser");
          console.log(respone.data.data._id)
          const id= respone.data.data._id
          const resp2= await axios.post("http://localhost:3000/api/communities/followedCommunity",{
             userId:id
          })
          console.log(resp2.data.com)
          setcom(resp2.data.com)
        
           
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(()=>{
      curentuser()
    },[])


    return (
        <div className="w-full  flex flex-col text-white mt-10 ">
        <div className="w-5/12 mx-14 h-[500px] bg-neutral-950 rounded-[38px] shadow-sm p-4 shadow-white
        transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white flex justify-center items-center p-[20vh] ">
         
          <User></User>
           

        </div>
        <div className="w-5/12 h-[500px] bg-neutral-950 self-end -mt-40 rounded-[38px] shadow-sm p-4 shadow-white
        transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white mx-14 flex flex-col items-center">
          <h1 className="text-center text-2xl">Community</h1>
         { Community.map((item:any)=>{
           
        return   (<JoinCard head={item.name} main={item.name} bol={true} key={item._id}></JoinCard>)
         })
          
         }
          </div>
        <div className="w-5/12 h-[500px] bg-neutral-950 -mt-20 rounded-[38px]
        shadow-sm p-4 shadow-white
        transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white mx-14 flex flex-col items-center ">
          <h1 className="text-center text-2xl ">Comments</h1>
          <JoinCard head='fnsdkfnfs' main='ahasikhnas' bol={true}></JoinCard>
        </div>
         <div className="w-5/12 h-[500px] bg-neutral-950 self-end -mt-40 flex flex-col items-center text-xl font-Roboto Flex font-bold rounded-[38px] shadow-sm p-4 shadow-white
        transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white mx-14 mb-5">
          <h1 className="text-center text-2xl">setting</h1>
            <div className="w-3/5  text-center mt-5"><button>Change password</button></div>
            <div className="w-3/5  text-center mt-5"><button>Change Gende</button>r</div>
            <div className="w-3/5   text-center mt-5"><button>Logout</button></div>
        </div>
    
     </div> 
    )
}

export default Page
