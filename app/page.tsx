'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import PostList from './components/PostList';
import PostModal from './components/PostModal';
import { Post } from './types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://cloud.codesupply.co/endpoint/react/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.text.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main>
        {loading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-[3rem]">
            <p className="text-center text-gray-500 text-lg">Loading posts...</p>
          </div>
        ) : (
          <PostList posts={filteredPosts} onPostClick={handlePostClick} />
        )}
      </main>
      <PostModal post={selectedPost} onClose={handleCloseModal} />
    </div>
  );
}
