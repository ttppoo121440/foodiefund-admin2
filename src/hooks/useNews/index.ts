import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { safeParseResponse } from '@/utils/zodUtils';
import {
  NewsIdResponseType,
  NewsQueryParams,
  NewsQueryResponse,
  NewsResponseType,
} from '@/api/services/newsService/types';
import { newsQueryResponseSchema } from '@/schemas/newsSchema';
import { createNews, deleteNews, getNews, updateNews } from '@/api/services/newsService';
import { useToast } from '../use-toast';

export const useGetNews = (queryParams: NewsQueryParams) => {
  return useQuery<NewsQueryResponse, AxiosError>({
    queryKey: ['News', queryParams], // 確保這個 key 一致
    queryFn: async () => {
      const response = await getNews(queryParams);
      const result = safeParseResponse(newsQueryResponseSchema, response.data);
      console.log('useGetNews response:', result);
      return result;
    },
    staleTime: 5000,
  });
};

export const useCreateNewsMutation = (): UseMutationResult<
  AxiosResponse<NewsResponseType>,
  AxiosError<AxiosError>,
  NewsResponseType
> => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<AxiosResponse<NewsResponseType>, AxiosError<AxiosError>, NewsResponseType>({
    mutationFn: async (newsData: NewsResponseType) => await createNews(newsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['News'] });
      toast({
        description: '新增成功!',
      });
    },
    onError: (error: AxiosError<AxiosError>) => {
      toast({
        variant: 'destructive',
        description: '新增失敗!',
      });
      console.error('Error creating News:', error.response?.data.message);
    },
  });
};

export const useUpdateNewsMutation = (): UseMutationResult<
  AxiosResponse<NewsResponseType>,
  AxiosError<AxiosError>,
  NewsResponseType
> => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<AxiosResponse<NewsResponseType>, AxiosError<AxiosError>, NewsResponseType>({
    mutationFn: async (data: NewsResponseType) => await updateNews(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['News'] });
      toast({
        description: '修改成功!',
      });
    },
    onError: (error: AxiosError<AxiosError>) => {
      toast({
        variant: 'destructive',
        description: '修改失敗!',
      });
      console.error('Error creating News:', error.response?.data.message);
    },
  });
};

export const useUpdateNewsTableMutation = (
  queryParams: NewsQueryParams,
): UseMutationResult<AxiosResponse<NewsResponseType>, AxiosError, NewsResponseType> => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: NewsResponseType) => {
      return await updateNews(data);
    },
    onMutate: async (updatedData: NewsResponseType) => {
      await queryClient.cancelQueries({ queryKey: ['News', queryParams] });
      const previousData = queryClient.getQueryData<NewsResponseType[]>(['News', queryParams]);
      queryClient.setQueryData<NewsQueryResponse>(['News', queryParams], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((item) => (item._id === updatedData._id ? { ...item, ...updatedData } : item)),
        };
      });
      return { previousData };
    },
    onError: (error, updatedData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['News', queryParams], context.previousData);
      }
      toast({
        description: '修改失敗，請稍後再試！',
        variant: 'destructive',
      });
      console.log(error, updatedData);
    },
    onSuccess: () => {
      toast({
        description: '修改成功!',
      });
    },
    onSettled: () => {
      // 這裡可以選擇是否要重新驗證資料
      // queryClient.invalidateQueries({ queryKey: ['News', queryParams] });
    },
  });
};

export const useDeleteNewsMutation = (): UseMutationResult<
  AxiosResponse<NewsIdResponseType>,
  AxiosError<AxiosError>,
  string
> => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<AxiosResponse<NewsIdResponseType>, AxiosError<AxiosError>, string>({
    mutationFn: async (id: string) => await deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['News'] });
      toast({
        description: '刪除成功!',
      });
    },
    onError: (error: AxiosError<AxiosError>) => {
      toast({
        variant: 'destructive',
        description: '刪除失敗!',
      });
      console.error('Error creating News:', error.response?.data.message);
    },
  });
};
