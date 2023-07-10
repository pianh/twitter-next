import { FaceSmileIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

export default function Input() {
    const { data: session } = useSession();
    return (
        <>
            {session && (
                <div className="flex border-b border-gray-200 p-3 space-x-3">
                    <Image
                        onClick={signOut}
                        src={session?.user?.image}
                        alt="user-img"
                        width={40}
                        height={40}
                        className="rounded-full w-11 h-11 cursor-pointer hover:brightness-95"
                    />

                    <div className="w-full  divide-y divide-gray-200">
                        <div className="w-full">
                            <textarea
                                rows="2"
                                placeholder="What's happening?"
                                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                            />
                        </div>
                        <div className="flex items-center justify-between pt-2.5">
                            <div className="flex">
                                <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                            </div>
                            <button className="border-none bg-blue-400 text-white rounded-full py-1.5 px-4 font-bold shadow-md hover:brightness-95 disabled:opacity-50">
                                Tweet
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
