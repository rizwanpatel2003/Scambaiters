/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react'



function Banner({name}) {
   

    return (
        <>
        <div className="w-full h-[150px] rounded-xl mt-5 "><img src="https://i.pinimg.com/474x/cb/be/53/cbbe53813cb8c0c85ddeda0d23de874d.jpg" className="w-full h-full rounded-[38px] px-1"/></div>
  <div className=" relative -top-14 w-full h-[100px] rounded-xl mt-5 flex items-center text-xl font-bold">
     <div className="w-[100px] h-[100px] rounded-full bg-black mx-5">
       <img src="https://i.pinimg.com/474x/11/17/0b/11170b186c0eaa633d1d4379f0063b8b.jpg" className="w-full h-full rounded-full p-1" alt=""/>
     </div>
       <h1>{name}</h1>
      
      <span className="ml-auto flex items-center">
     
        <span className="mr-2">+</span> 
        <button className="mr-4">follow</button>
      </span>
  </div>   
  </>
    )
}

export default Banner
