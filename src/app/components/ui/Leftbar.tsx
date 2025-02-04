"use client"

import { IconCampfireFilled, IconPlus, IconShieldFilled, IconUser } from "@tabler/icons-react"
import JoinCard from "./JoinCard"
import Pinned from "./Pinned"

import {  useRouter } from "next/navigation"




function Leftbar() {
    const router= useRouter()
    const handleCampfireClick = () => {
        router.push("https://cybercrime.gov.in/Webform/Index.aspx")
    }
    const handleShieldfireClick = () => {
        router.push("https://cybercrime.gov.in/Webform/Crime_OnlineSafetyTips.aspx")
    }
    const user=()=>{
        router.push("/user")
    }
    return (
        <div className="sticky top-0 w-1/4 h-screen ">

            <div className="mt-10 flex items-center justify-center">
            <IconPlus className="text-white w-[40px] h-[40px] mx-5"></IconPlus>
                <button onClick={handleCampfireClick}>
                <IconCampfireFilled className="text-white w-[40px] h-[40px] mx-5 fire-icon">
               </IconCampfireFilled>
               </button>
               <button onClick={handleShieldfireClick}>
            <IconShieldFilled className="text-white w-[40px] h-[40px] mx-5"></IconShieldFilled>
            </button>
            <button onClick={user}>
            <IconUser className="text-white w-[40px] h-[40px] mx-5" ></IconUser>
            </button>
            </div>
            <h1 className="text-2xl text-white opacity-50 ml-12 mt-12">Pinned </h1>
           <Pinned></Pinned>
           <h1 className="text-2xl text-white opacity-50 ml-12 mt-10">Suggesstion</h1>
           <JoinCard head="banglore" main="protecting from scammers" bol={true} ></JoinCard>
           <JoinCard head="delhi" main="Towards the betterment of future" bol={true}></JoinCard>
           <JoinCard head="mumbai" main="the safe town" bol={true}></JoinCard>
          </div>
    )
}

export default Leftbar
