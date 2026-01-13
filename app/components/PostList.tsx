'use client';

import { Post } from '../types';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  searchQuery?: string;
}

export default function PostList({ posts, onPostClick, searchQuery = "" }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="max-w-300 mx-auto px-5">
        <p className="text-center text-gray-500 text-lg">No posts found</p>
      </div>
    );
  }

  return (
    <div className="max-w-300 mx-auto px-5">
      <div className="flex flex-wrap justify-between">
        {posts.map((post, index) => (
          <div
            key={index}
            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] mt-[3rem]"
          >
            <PostCard post={post} onClick={() => onPostClick(post)} searchQuery={searchQuery} />
          </div>
        ))}
      </div>
    </div>
  );
}
