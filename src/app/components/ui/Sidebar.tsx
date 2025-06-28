import React from 'react'
import User from './User'
import SidebarNav from './sidebarNav'
import Volunteer from './Volunteer'

function Sidebar() {
    return (
        <aside className="w-full  h-auto md:h-screen flex flex-col sticky top-0 bg-white dark:bg-black md:bg-transparent md:dark:bg-transparent p-2 md:p-0 z-10">
           <User />
           <SidebarNav />
           <Volunteer />
        </aside>
    )
}

export default Sidebar

