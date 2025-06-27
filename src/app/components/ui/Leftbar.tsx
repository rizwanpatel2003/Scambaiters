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

    const handleCreatePost = () => {
        router.push("/post")
    }

    return (
        <div className="sticky top-0 w-1/4 h-screen ">

            <div className="mt-10 flex items-center justify-center">
            <button onClick={handleCreatePost}>
                <IconPlus className="text-black w-[40px] h-[40px] mx-5 hover:scale-110 transition-transform"></IconPlus>
            </button>
                <button onClick={handleCampfireClick}>
                <IconCampfireFilled className="text-black w-[40px] h-[40px] mx-5 fire-icon">
               </IconCampfireFilled>
               </button>
               <button onClick={handleShieldfireClick}>
            <IconShieldFilled className="text-black w-[40px] h-[40px] mx-5"></IconShieldFilled>
            </button>
            <button onClick={user}>
            <IconUser className="text-black w-[40px] h-[40px] mx-5" ></IconUser>
            </button>
            </div>
            <h1 className="text-2xl text-black opacity-50 ml-12 mt-12">Pinned </h1>
           <Pinned></Pinned>
           <h1 className="text-2xl text-black opacity-50 ml-12 mt-10">Suggesstion</h1>
           <div className=" border-l-2 border-gray-300">
           <JoinCard head="banglore" main="protecting from scammers" bol={true} src="https://i.pinimg.com/736x/66/73/81/667381b29f4265915a80dc31884b4105.jpg" ></JoinCard>
           <JoinCard head="delhi" main="Towards the betterment of future" bol={true} src="https://i.pinimg.com/736x/91/69/9e/91699ec84f9e861897c17f11ce6d5b98.jpg" ></JoinCard>
           <JoinCard head="mumbai" main="the safe town" bol={true} src="https://i.pinimg.com/736x/75/21/48/752148c7c34a5944ca2f64711be04bcf.jpg" ></JoinCard>
           </div>
          </div>
    )
}

export default Leftbar
