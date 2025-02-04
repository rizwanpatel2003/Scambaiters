import React from 'react'
import User from './user'
import SidebarNav from './sidebarNav'
import Volunteer from './Volunteer'



function Sidebar() {
  
    return (
        <div className=" sticky top-0 w-1/4 h-screen flex flex-col  ">
           <User></User>
           <SidebarNav></SidebarNav>
           <Volunteer></Volunteer>
        </div>
       )
}

export default Sidebar

