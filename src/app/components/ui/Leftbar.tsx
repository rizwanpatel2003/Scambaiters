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
        <aside className="flex flex-col flex-shrink-0 min-w-[260px] max-w-[320px] w-full h-screen sticky top-0 bg-[#f6f7f8] dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 px-4 py-6 overflow-y-auto">
            <div className="mt-6 flex items-center justify-center gap-4">
                <button onClick={handleCreatePost}>
                    <IconPlus className="text-black dark:text-white w-8 h-8 hover:scale-110 transition-transform" />
                </button>
                <button onClick={handleCampfireClick}>
                    <IconCampfireFilled className="text-black dark:text-white w-8 h-8 fire-icon" />
                </button>
                <button onClick={handleShieldfireClick}>
                    <IconShieldFilled className="text-black dark:text-white w-8 h-8" />
                </button>
                <button onClick={user}>
                    <IconUser className="text-black dark:text-white w-8 h-8" />
                </button>
            </div>
            <h1 className="text-xl text-black dark:text-white opacity-60 ml-2 mt-8 xl:ml-4 xl:mt-10">Pinned</h1>
            <Pinned />
            <h1 className="text-xl text-black dark:text-white opacity-60 ml-2 mt-8 xl:ml-4 xl:mt-8">Suggestion</h1>
            <JoinCard head="banglore" main="protecting from scammers" bol={true} src="https://i.pinimg.com/736x/66/73/81/667381b29f4265915a80dc31884b4105.jpg" />
            <JoinCard head="delhi" main="Towards the betterment of future" bol={true} src="https://i.pinimg.com/736x/91/69/9e/91699ec84f9e861897c17f11ce6d5b98.jpg" />
            <JoinCard head="mumbai" main="the safe town" bol={true} src="https://i.pinimg.com/736x/75/21/48/752148c7c34a5944ca2f64711be04bcf.jpg" />
        </aside>
    )
}

export default Leftbar
