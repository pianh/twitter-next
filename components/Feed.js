import { SparklesIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Input from './Input';
import Post from './Post';

export default function Feed() {
    const posts = [
        {
            id: '1',
            name: 'Duy Anh',
            username: 'code width duyanh',
            userImg:
                'https://kenh14cdn.com/203336854389633024/2022/11/9/photo-2-16679787018421499698290.jpg',
            img: 'https://plus.unsplash.com/premium_photo-1666792562882-8bd04befec7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80',
            text: 'nice view!',
            timestamp: '2 hours ago',
        },
        {
            id: '2',
            name: 'code width Duy Anh',
            username: 'Duy Anh',
            userImg:
                'https://kenh14cdn.com/203336854389633024/2022/11/9/photo-2-16679787018421499698290.jpg',
            img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1274&q=80',
            text: 'nice view!',
            timestamp: '2 hours ago',
        },
        {
            id: '3',
            name: 'code width Duy Anh',
            username: 'Duy Anh',
            userImg:
                'https://kenh14cdn.com/203336854389633024/2022/11/9/photo-2-16679787018421499698290.jpg',
            img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            text: 'wow!',
            timestamp: '3 days ago',
        },
    ];
    return (
        <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
            <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
                    Home
                </h2>
                <div className="hoverEffect flex items-center justify-center ml-auto w-9 h-9">
                    <SparklesIcon className="h-5" />
                </div>
            </div>
            <Input />
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
}
