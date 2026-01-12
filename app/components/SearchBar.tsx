'use client';

import { SearchIcon } from './Icons';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-base"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
