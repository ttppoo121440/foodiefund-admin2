import { useEffect } from 'react';

interface QueryData<T> {
  data?: {
    data: T;
  };
}

export const useFetchUsers = <T>(getUsersQuery: QueryData<T>, setLocalData: (data: T) => void) => {
  useEffect(() => {
    if (getUsersQuery.data?.data) {
      setLocalData(getUsersQuery.data.data);
    }
  }, [getUsersQuery.data?.data, setLocalData]);
};
