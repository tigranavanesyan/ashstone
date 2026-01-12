"use client";

import { Post } from "../types";

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  return (
    <article
      onClick={onClick}
      className="cursor-pointer bg-white overflow-hidden hover:opacity-90 transition-opacity duration-200"
    >
      <div className="relative w-full overflow-hidden">
        <img
          src={post.img}
          srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
          alt={post.title}
          className="w-full"
        />
      </div>
      <div className="py-2">
        <span className="inline-block font-bold text-[13px] leading-[13px] text-red-600">
          {post.tags}
        </span>
        <h2 className="font-bold text-gray-900  py-4  text-[24px] leading-[30px]">
          {post.title}
        </h2>
        <div className="flex items-center text-xs gap-2 pb-4">
          <span>{post.autor}</span>
          <span 
            className="w-[3px] h-[3px] rounded-full"
            style={{ backgroundColor: 'rgba(215, 215, 215, 1)' }}
          />
          <span className="text-gray-500">{post.date}</span>
          <span 
            className="w-[3px] h-[3px] rounded-full"
            style={{ backgroundColor: 'rgba(215, 215, 215, 1)' }}
          />
          <span className="text-gray-500">{post.views} Views</span>
        </div>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {post.text}
        </p>
      </div>
    </article>
  );
}
