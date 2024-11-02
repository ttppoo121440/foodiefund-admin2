import { createFile, deleteFile, getFileList } from '@/api/services/FileService';
import { DeleteFileFormType, FileListQueryResponse, PostFileFormType } from '@/api/services/FileService/types';
import { fileQueryResponseSchema } from '@/schemas/fileSchema';
import { safeParseResponse } from '@/utils/zodUtils';
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useToast } from '../use-toast';

export const useGetFileList = () => {
  return useQuery<FileListQueryResponse, AxiosError>({
    queryKey: ['file'],
    queryFn: async () => {
      const response = await getFileList();
      const result = safeParseResponse(fileQueryResponseSchema, response.data);
      console.log(' response:', result);
      return result;
    },
  });
};

export const useCreateFileMutation = (): UseMutationResult<
  AxiosResponse<PostFileFormType>,
  AxiosError<AxiosError>,
  PostFileFormType
> => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<AxiosResponse<PostFileFormType>, AxiosError<AxiosError>, PostFileFormType>({
    mutationFn: async (newsData: PostFileFormType) => await createFile(newsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['file'] });
      toast({
        description: '新增成功!',
      });
    },
    onError: (error: AxiosError<AxiosError>) => {
      toast({
        variant: 'destructive',
        description: '新增失敗!',
      });
      console.error('Error creating :', error.response?.data.message);
    },
  });
};

export const useDeleteFileMutation = (): UseMutationResult<
  AxiosResponse<DeleteFileFormType>,
  AxiosError<AxiosError>,
  string
> => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<AxiosResponse<DeleteFileFormType>, AxiosError<AxiosError>, string>({
    mutationFn: async (name: string) => await deleteFile(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['file'] });
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
