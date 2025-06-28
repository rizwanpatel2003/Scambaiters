"use client"

import { IconCampfireFilled, IconPlus, IconShieldFilled, IconUser } from "@tabler/icons-react"
import JoinCard from "./JoinCard"
import Pinned from "./Pinned"
import { useRouter } from "next/navigation"

function Leftbar() {
    const router = useRouter()
    const handleCampfireClick = () => {
        router.push("https://cybercrime.gov.in/Webform/Index.aspx")
    }
    const handleShieldfireClick = () => {
        router.push("https://cybercrime.gov.in/Webform/Crime_OnlineSafetyTips.aspx")
    }
    const user = () => {
        router.push("/user")
    }
    const handleCreatePost = () => {
        router.push("/post")
    }
    return (
        <aside className="w-full h-auto lg:h-screen sticky top-0 bg-white dark:bg-black lg:bg-transparent lg:dark:bg-transparent p-2 lg:p-0 z-10">
            <div className="mt-10 flex items-center justify-center">
                <button onClick={handleCreatePost}>
                    <IconPlus className="text-black w-[40px] h-[40px] mx-5 hover:scale-110 transition-transform" />
                </button>
                <button onClick={handleCampfireClick}>
                    <IconCampfireFilled className="text-black w-[40px] h-[40px] mx-5 fire-icon" />
                </button>
                <button onClick={handleShieldfireClick}>
                    <IconShieldFilled className="text-black w-[40px] h-[40px] mx-5" />
                </button>
                <button onClick={user}>
                    <IconUser className="text-black w-[40px] h-[40px] mx-5" />
                </button>
            </div>
            <h1 className="text-2xl text-black opacity-50 ml-4 mt-8 lg:ml-12 lg:mt-12">Pinned </h1>
            <Pinned />
            <h1 className="text-2xl text-black opacity-50 ml-4 mt-8 lg:ml-12 lg:mt-10">Suggestion</h1>
            <JoinCard head="banglore" main="protecting from scammers" bol={true} src="https://i.pinimg.com/736x/66/73/81/667381b29f4265915a80dc31884b4105.jpg" />
            <JoinCard head="delhi" main="Towards the betterment of future" bol={true} src="https://i.pinimg.com/736x/91/69/9e/91699ec84f9e861897c17f11ce6d5b98.jpg" />
            <JoinCard head="mumbai" main="the safe town" bol={true} src="https://i.pinimg.com/736x/75/21/48/752148c7c34a5944ca2f64711be04bcf.jpg" />
        </aside>
    )
}

export default Leftbar
