"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { toNamespacedPath } from 'path';
import React, { useEffect, useState } from 'react'



function JoinCard({head,main,bol}:{
    head?:string,
    main?:string,
    bol?:boolean
}) {
    const [name,setname]= useState("")
 const username= async function () {
     try {
        const respone= await axios.post("http://localhost:3000/api/user/userdetail",{
            userId:head
        });
     
        setname(respone.data.data.
            username)
         
     } catch (error) {
        console.log(error)
     }
 }

 useEffect(()=>{
    if(!bol){
    username()
    }
 },[])

    return (
        <div className=" w-4/5 mx-auto rounded-lg shadow-md overflow-hidden my-5 text-white hover:bg-[#00BA7C] hover:text-black ">
        <div className="flex items-center p-4">
        <img src="https://via.placeholder.com/50" alt="Community Image" className="rounded-full h-12 w-12 mr-4"/>
        <div>
            <h2 className="text-lg font-semibold">{bol?head:name}</h2>
            <p className="">{main}</p>
        </div>
        </div>
        </div>
    )
}

export default JoinCard
