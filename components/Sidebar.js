import Image from 'next/image';
import React from 'react';
import SidebarMenuItem from './SidebarMenuItem';
import { HomeIcon } from '@heroicons/react/24/solid';
import {
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardIcon,
    EllipsisHorizontalIcon,
    EllipsisHorizontalCircleIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { useSession, signIn, signOut } from 'next-auth/react';
export default function Sidebar() {
    const { data: session } = useSession();
    console.log(session);
    return (
        <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
            {/* Twitter Logo */}
            <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1 flex items-center justify-center">
                <Image
                    width="35"
                    height="35"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/1200px-Logo_of_Twitter.svg.png"
                    alt="logo"
                ></Image>
            </div>

            {/* Menu */}
            <div className="mt-4 mb-2.5 xl:items-start">
                <SidebarMenuItem text="Home" Icon={HomeIcon} active />
                <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
                {session && (
                    <>
                        <SidebarMenuItem text="Notifications" Icon={BellIcon} />
                        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
                        <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
                        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
                        <SidebarMenuItem text="Profile" Icon={UserIcon} />
                        <SidebarMenuItem
                            text="More"
                            Icon={EllipsisHorizontalCircleIcon}
                        />
                    </>
                )}
            </div>

            {/* Button */}
            {session ? (
                <>
                    <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
                        Tweet
                    </button>

                    {/* Mini Profile */}
                    <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
                        <img
                            onClick={signOut}
                            src={session?.user.image}
                            alt="profile"
                            className="rounded-full h-10 w-10 xl:mr-2"
                        />
                        <div className=" hidden xl:inline">
                            <h4 className="font-bold">{session?.user?.name}</h4>
                            <p className="text-gray-500 ">
                                {session?.user?.username}
                            </p>
                        </div>
                        <div className="text-xs ml-8 hidden xl:inline">
                            <i className="fa-solid fa-circle"></i>
                            <i className="fa-solid fa-circle"></i>
                            <i className="fa-solid fa-circle"></i>
                        </div>
                    </div>
                </>
            ) : (
                <button
                    onClick={signIn}
                    className="bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
                >
                    Sign In
                </button>
            )}
        </div>
    );
}
