import { useLoading } from '@/hooks/useLoading';
import { ProviderProps } from '@/types/ProviderType';

const Loading = ({ children }: ProviderProps) => {
  const { isLoading } = useLoading();
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-primary border-t-white"></div>
        </div>
      )}
      {children}
    </>
  );
};

export default Loading;
