import { useSetLoading } from '@/hooks/useLoading';
import { useGetUsers } from '@/hooks/useUsers';
import { useCallback, useMemo, useState } from 'react';

export const PaginationConfig = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [blackListedFilter, setBlackListedFilter] = useState<number | undefined>(undefined);
  const [isAdminFilter, setIsAdminFilter] = useState<string>('');

  const { data: newsData, isFetching } = useGetUsers({
    keyWord: search,
    page: currentPage + 1,
    limit: pageSize,
    isBlackListed: blackListedFilter,
    role: isAdminFilter,
  });

  const totalItems = newsData?.pagination.total || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = useCallback(
    (newPage: number, newPageSize?: number) => {
      if (newPageSize && newPageSize !== pageSize) {
        setPageSize(newPageSize);
        setCurrentPage(0);
      } else {
        setCurrentPage(newPage);
      }
    },
    [pageSize],
  );

  const handleSearch = useCallback((newSearch: string) => {
    setSearch(newSearch);
    setCurrentPage(0);
  }, []);

  const tableData = useMemo(() => newsData?.data || [], [newsData?.data]);

  useSetLoading(isFetching);

  return {
    isAdminFilter,
    search,
    currentPage,
    pageSize,
    totalPages,
    handlePageChange,
    handleSearch,
    tableData,
    setIsAdminFilter,
    setBlackListedFilter,
    blackListedFilter,
  };
};
