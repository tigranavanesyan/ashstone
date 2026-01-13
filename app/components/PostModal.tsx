"use client";

import { useEffect } from "react";
import { Post } from "../types";
import { CloseIcon } from "./Icons";
import { highlightText } from "../utils/highlightText";

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
  searchQuery?: string;
}

export default function PostModal({ post, onClose, searchQuery = "" }: PostModalProps) {
  useEffect(() => {
    if (post) {
      // Блокируем скролл страницы
      document.body.style.overflow = "hidden";
    } else {
      // Разблокируем скролл страницы
      document.body.style.overflow = "";
    }

    // Очистка при размонтировании компонента
    return () => {
      document.body.style.overflow = "";
    };
  }, [post]);

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] flex flex-col overflow-y-auto overflow-x-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
          aria-label="Close"
        >
          <CloseIcon className="w-5 h-5 text-gray-600" />
        </button>
        <div className="relative w-full ">
          <img
            src={post.img}
            srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
            alt={post.title}
            className="w-full aspect-720/460 object-cover"
          />
        </div>
        <div className="p-6 md:p-8">
          <span className="inline-block font-bold text-[13px] leading-[13px] text-red-600">
            {post.tags}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {highlightText(post.title, searchQuery)}
          </h1>
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
            <span className="font-medium">{post.autor}</span>
            <div className="flex items-center gap-4">
              <span>{post.date}</span>
              <span>{post.views} views</span>
            </div>
          </div>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
            {highlightText(post.text, searchQuery)}
          </p>

        </div>
      </div>
    </div>
  );
}
