import { useState, useMemo } from 'react';

export default function usePagination(items = [], itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPrev = () => setCurrentPage(p => Math.max(p - 1, 1));
  const goToNext = () => setCurrentPage(p => Math.min(p + 1, totalPages));
  const goToPage = page => setCurrentPage(() => Math.max(1, Math.min(page, totalPages)));

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPrev,
    goToNext,
    goToPage,
    setCurrentPage
  };
}
