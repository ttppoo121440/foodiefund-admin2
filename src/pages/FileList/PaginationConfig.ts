import { useGetFileList } from '@/hooks/useFile';
import { useSetLoading } from '@/hooks/useLoading';
import { useCallback, useMemo, useState } from 'react';

export const PaginationConfig = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data: newsData, isFetching } = useGetFileList();

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

  return { search, currentPage, pageSize, handlePageChange, handleSearch, tableData };
};
