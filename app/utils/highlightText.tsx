import React from 'react';

/**
 * Подсвечивает текст, который совпадает с поисковым запросом
 * @param text - текст для подсветки
 * @param searchQuery - поисковый запрос
 * @returns JSX элемент с подсвеченным текстом
 */
export function highlightText(text: string, searchQuery: string): React.ReactNode {
  if (!searchQuery.trim()) {
    return text;
  }

  const query = searchQuery.trim();
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    // Проверяем совпадение без использования regex.test() чтобы избежать проблем с lastIndex
    const isMatch = part.toLowerCase() === query.toLowerCase();
    if (isMatch) {
      return (
        <mark key={index} className="bg-yellow-200 text-gray-900">
          {part}
        </mark>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}
