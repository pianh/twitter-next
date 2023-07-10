//3633
import {
    FaceSmileIcon,
    PhotoIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef } from 'react';
import { db, storage } from '@/firebase';
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

export default function Input() {
    const { data: session } = useSession();
    const [input, setInput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const filePickerRef = useRef(null);

    const SendPost = async () => {
        if (loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, 'posts'), {
            id: session?.user?.uid,
            text: input,
            userImg: session?.user?.image,
            timestamp: serverTimestamp(),
            name: session?.user?.name,
            username: session?.user?.username,
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        if (selectedFile) {
            await uploadString(imageRef, selectedFile, 'data_url').then(
                async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    await updateDoc(doc(db, 'posts', docRef.id), {
                        image: downloadURL,
                    });
                },
            );
        }

        setInput('');
        setSelectedFile(null);
        setLoading(false);
    };

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };
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
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        {selectedFile && (
                            <div className="relative">
                                <XMarkIcon
                                    onClick={() => setSelectedFile(null)}
                                    className="h-7 text-black absolute cursor-pointer shadow-md shadow-white rounded-full right-0"
                                />
                                <img
                                    src={selectedFile}
                                    className={`${loading && 'animate-pulse'}`}
                                />
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-2.5">
                            {!loading && (
                                <>
                                    <div className="flex">
                                        <div
                                            className=""
                                            onClick={() =>
                                                filePickerRef.current.click()
                                            }
                                        >
                                            <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                            <input
                                                type="file"
                                                hidden
                                                ref={filePickerRef}
                                                onChange={addImageToPost}
                                            />
                                        </div>

                                        <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                    </div>
                                    <button
                                        onClick={SendPost}
                                        disabled={!input.trim()}
                                        className="border-none bg-blue-400 text-white rounded-full py-1.5 px-4 font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                                    >
                                        Tweet
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
