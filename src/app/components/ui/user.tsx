"use client"
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import axios from 'axios';
function User() {
  const [name,setname]= useState("Signup");
  const [email,setemail]= useState("Login");
  const curentuser= async function () {
      try {
        const respone= await axios.get("http://localhost:3000/api/user/currentuser");
         setemail(respone.data.data.
          email)
          setname(respone.data.data.username)
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(()=>{
    curentuser()
  },[])

  const router =useRouter()
    return (
        <div className="w-full  mt-2">
             <div className="relative w-52 h-28 ml-10 mt-5 ">
            <div className="absolute w-24 h-24  rounded-full transform   ">
              <img src="/lastlogo.png" className='w-full h-full border-2 border-white rounded-full' />
            </div>
            <div className="absolute w-24 h-24 rounded-full  transform translate-x-14 border-2 border-white ">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVF9XCN-3m0QhFLhp6NOK63wB2hRJXfmBcpg&s" alt="" className='w-full  rounded-full'   />
            </div>
            </div>
            <div>
            <button className='text-white font-Roboto Flex font-bold text-sm ml-14 mt-2 hover:text-green-300 block'onClick={()=>{
              router.push("/Account/signup")
            }}> {email} </button>
            <button className='text-white font-Roboto Flex font-bold text-xl  mt-2 hover:text-green-300 ml-14' onClick={()=>{
              router.push("/Account/login")
            }}>{name}</button> 
          </div>
        </div>
    )
}

export default User

