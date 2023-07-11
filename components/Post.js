import { db, storage } from '@/firebase';
import { signIn, useSession } from 'next-auth/react';
import {
    ChartBarIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    HeartIcon,
    ShareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid';
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    setDoc,
} from 'firebase/firestore';

import Image from 'next/image';
import Moment from 'react-moment';
import { useEffect, useState } from 'react';
import { deleteObject, ref } from 'firebase/storage';

export default function Post({ post }) {
    const { data: session } = useSession();
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'posts', post.id, 'likes'),
            (snapshot) => setLikes(snapshot.docs),
        );
    }, [db]);

    useEffect(() => {
        setHasLiked(
            likes.findIndex((like) => like.id === session?.user.uid) !== -1,
        );
    }, [likes]);

    async function likePost() {
        if (session) {
            if (hasLiked) {
                await deleteDoc(
                    doc(db, 'posts', post.id, 'likes', session?.user.uid),
                );
            } else {
                await setDoc(
                    doc(db, 'posts', post.id, 'likes', session?.user.uid),
                    {
                        username: session.user.username,
                    },
                );
            }
        } else {
            signIn();
        }
    }

    async function deletePost() {
        if (window.confirm('Are you sure you want to delete this post?')) {
            deleteDoc(doc(db, 'posts', post.id));
            if (post.data().image) {
                deleteObject(ref(storage, `posts/${post.id}/image`));
            }
        }
    }

    return (
        <div className="flex p-3 cursor-pointer">
            {/* user Image */}
            <Image
                src={post.data().userImg}
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
                            {post.data().name}
                        </h4>
                        <span className="text-sm sm:text-[15px]">
                            @{post.data().username} -
                        </span>

                        <span className="text-sm sm:text-[15px] hover:underline">
                            <Moment fromNow>
                                {post?.data().timestamp?.toDate()}
                            </Moment>
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
                    {post.data().text}
                </p>

                {/* post image */}
                <img
                    // onClick={() => router.push(`/posts/${id}`)}
                    className="rounded-2xl mr-2"
                    src={post?.data()?.image}
                    alt=""
                />

                {/* icons */}
                <div className="flex mt-2 justify-between text-gray-500 p-2">
                    <ChatBubbleOvalLeftEllipsisIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                    {session?.user.uid === post?.data().id && (
                        <TrashIcon
                            onClick={deletePost}
                            className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                        />
                    )}

                    <div className="flex items-center">
                        {hasLiked ? (
                            <HeartIconFilled
                                onClick={likePost}
                                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                            />
                        ) : (
                            <HeartIcon
                                onClick={likePost}
                                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
                            />
                        )}
                        {likes.length > 0 && (
                            <span
                                className={`${
                                    hasLiked && 'text-red-600'
                                } text-sm select-none`}
                            >
                                {' '}
                                {likes.length}
                            </span>
                        )}
                    </div>

                    <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                    <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
                </div>
            </div>
        </div>
    );
}
