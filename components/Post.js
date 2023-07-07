//20:28
import {
    ChartBarIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    HeartIcon,
    ShareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

import Image from 'next/image';

export default function Post({ post }) {
    return (
        <div className="flex p-3 cursor-pointer">
            {/* user Image */}
            <Image
                src="/assets/images/avatar.jpg"
                alt="user-img"
                width={40}
                height={40}
                className="rounded-full w-11 h-11 cursor-pointer hover:brightness-95"
            />

            {/* right side */}
            <div className="ml-2">
                {/* Header */}

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 whitespace-nowrap">
                        {/* post user info */}
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                            {post.name}
                        </h4>
                        <span className="text-sm sm:text-[15px]">
                            @{post.username} -
                        </span>

                        <span className="text-sm sm:text-[15px] hover:underline">
                            {post.timestamp}
                        </span>
                    </div>
                    {/* dot icon  */}
                    <div className="text-[5px] flex h-10 hoverEffect w-10 hover:bg-sky-100 items-center justify-center">
                        <i className="fa-solid fa-circle"></i>
                        <i className="fa-solid fa-circle ml-1"></i>
                        <i className="fa-solid fa-circle ml-1"></i>
                    </div>
                </div>

                {/* Post tets */}
                <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
                    {post.text}
                </p>

                {/* post image */}
                <Image
                    className="rounded-2xl mr-2"
                    src={post.img}
                    width={800}
                    height={100}
                    alt=""
                />

                {/* icons */}
                <div className="flex mt-2 justify-between text-gray-500 p-2">
                    <ChatBubbleOvalLeftEllipsisIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                    <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
                    <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
                    <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                    <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                </div>
            </div>
        </div>
    );
}
