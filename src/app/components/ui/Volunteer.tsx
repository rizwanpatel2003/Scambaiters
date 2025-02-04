import { IconPlus, IconSpeakerphone, IconUserFilled } from '@tabler/icons-react'
import React from 'react'



function Volunteer() {


    return (
        <div className="w-full  font-mono mt-6 font-Roboto Flex font-semibold">
            <h1 className='text-xl font-thin opacity-50 text-white border-spacing-x-4 px-[5vh] mt-5'> Community</h1>
      <ul className=" text-xl text-white px-[5vh] text-wrap">
      
        <li className="flex items-center hover:bg-[#00BA7C] hover:text-black rounded-[38px] w-3/5 h-[60px]  text-xl mt-6 "  >
        
        <IconPlus></IconPlus>
               Create  
        </li>
        <li className="flex items-center hover:bg-[#00BA7C] hover:text-black rounded-[38px] w-3/5 h-[60px] mt-6 text-xl "  >
          <IconUserFilled>  </IconUserFilled>
               Member 
        </li>
        <li className="flex items-center hover:bg-[#00BA7C] hover:text-black rounded-[38px] w-3/5 h-[60px] mt-6 text-xl "  >
             <IconSpeakerphone></IconSpeakerphone>
                awareness
        </li>
      
    </ul>
  </div>
        )
}

export default Volunteer
