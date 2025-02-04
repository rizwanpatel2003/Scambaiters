import React from 'react'



function Description({description,name}:{
     description:string,
     name:string
}) {


    return (
        <div className="w-11/12 h-[300px] bg-neutral-950 rounded-[38px] my-5 text-white px-[3vh] py-2 text-balance overflow-auto shadow-sm shadow-white  transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-white">
       <h1 className='text-2xl  font-Roboto Flex font-bold '>{name}</h1>
         {
            description
         }
       </div>
      )
}

export default Description
