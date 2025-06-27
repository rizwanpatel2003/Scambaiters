import React from 'react'
import User from './User'
import SidebarNav from './sidebarNav'
import Volunteer from './Volunteer'

function Sidebar() {
    return (
        <aside className="flex flex-col flex-shrink-0 min-w-[260px] max-w-[320px] w-full h-screen sticky top-0 bg-[#f6f7f8] dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 px-4 py-6 overflow-y-auto">
           <User />
           <SidebarNav />
           <Volunteer />
        </aside>
    )
}

export default Sidebar

