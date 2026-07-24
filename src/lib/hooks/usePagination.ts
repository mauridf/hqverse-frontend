import { useState, useCallback, useMemo } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  initialPageSize?: number;
  totalItems?: number;
}

export function usePagination({
  initialPage = 1,
  initialPageSize = 20,
  totalItems = 0,
}: UsePaginationProps = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize]
  );

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const goToPage = useCallback(
    (page: number) => {
      const targetPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(targetPage);
    },
    [totalPages]
  );

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [canGoNext]);

  const goToPrevious = useCallback(() => {
    if (canGoPrevious) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [canGoPrevious]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
    setPageSize(initialPageSize);
  }, [initialPageSize]);

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    canGoPrevious,
    canGoNext,
    goToPage,
    goToNext,
    goToPrevious,
    setPageSize,
    resetPagination,
  };
}
