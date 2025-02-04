/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
interface posting{
  name:string,
  userid:string,
  title:string,
content:string
}

function Page() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const [names,setnames] = useState<string[]>([])
      const[inp,setinp]=useState<string>("");
      const [selected,setselected]=useState<string>();
      const [listv,setlistv]=useState<boolean>(false)
    const community=async function() {
        try {
            const response = await axios.get("http://localhost:3000/api/communities/communitynames")
            setnames(response.data.data)
         
        } catch (error) {
          console.log("the data collextion faield",error)
        }
      }

    const upload= async function(data:any) {
        try {
           const response = await axios.post("http://localhost:3000/api/post",{
              name:selected,
              userid:"67321b641d90eec3661481da",
              title:data.title,
            content:data.content
           })

           console.log(response.data)
        } catch (error) {
           console.log("unable to upload the post")
        }
    }  

    const postupload= (data:any)=>{
        upload(data)
    }

    useEffect(()=>{
    community()
    },[])  

    useEffect(()=>{
   const searched=names.filter((name:string)=>{
         
         return name.includes(inp)
       })

     setnames(searched)
    },[inp])

   
    return (
    
        <div className="w-full h-screen bg-black flex flex-col items-center text-white">
        <div className="w-1/2 h-screen  flex flex-col items-center mt-10">
          <div className="w-4/5 items-center flex flex-col gap-5 ">
            <input type="text" name="" id="inputField" className="rounded-[38px] w-full h-[50px] bg-black text-white shadow-sm shadow-white  font-Roboto Flex font-light text-lg  " placeholder="Type here..." onChange={(e)=>{
               setinp(e.target.value)
              
            }} onClick={()=>{
              setlistv(true)
            }} value={selected}/>
      
            <div className={`w-4/5 h-[150px] bg-black overflow-hidden flex flex-col items-center shadow-sm shadow-white ${listv?"visible":"invisible" }`}  >
                <ul>
                  {
                    names.map((name,index)=>{
                      return(
                        <li key={index} className='text-lg my-1 font-Roboto Flex' 
                         onClick={()=>{
                          
                            setselected(name)
                            setlistv(false)
                        }}>{name}</li>
                      )
                    })
                  }
                </ul>
                </div>
               </div>
            <form onSubmit={handleSubmit((data)=> postupload(data))} className='w-4/5'>
          
            <div className="w-full h-[150px] bg-black mt-5 ">
            <h1 className="text-2xl opacity-50 self-start ">Title </h1>
             <input type="text"  id="inputField" className="rounded- w-full h-[80px] bg-black text-white shadow-sm shadow-white  mt-2 rounded-lg overflow-auto text-lg font-Roboto Flex" placeholder="Type here..." {...register("title")}/>
            </div>
      
              <div className="w-full h-[220px] bg-black ">
            <h1 className="text-2xl opacity-50 self-start ">Title </h1>
             <input type="text"  id="inputField" className="rounded- w-full h-[160px] bg-black text-white shadow-sm shadow-white   rounded-lg mt-2 overflow-auto text-lg font-Roboto Flex " placeholder="Type here..." {...register("content")}/>
            </div>
          <button className="w-24 h-[50px] bg-green-400 rounded-xl">post</button>
             </form>    
             </div>
           
      
      </div>
    
    )
}

export default Page
