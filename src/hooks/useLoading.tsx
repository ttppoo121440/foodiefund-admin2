import { useContext, useEffect } from 'react';
import { LoadingContext } from '@/utils/providers/LoadingContext';

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const useSetLoading = (isLoading: boolean) => {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);
};
