import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function News({ article }) {
    return (
        <Link href={article.url} target="_blank">
            <div className="flex justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
                <div className="space-y-0.5">
                    <h6 className="text-sm font-semibold">{article.title}</h6>
                    <p className="text-xs font-medium text-gray-500">
                        {article.source.name}
                    </p>
                </div>
                <img
                    src={article.urlToImage}
                    alt="news"
                    className="rounded-xl"
                    width="80"
                />
            </div>
        </Link>
    );
}
