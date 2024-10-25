import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, updateUser, deleteUser, getUsers, blackList } from '@/api/services/userService';
import { AxiosError, AxiosResponse } from 'axios';
import { safeParseResponse } from '@/utils/zodUtils';
import {
  AccountBlackListResponseType,
  AccountIdResponseType,
  AccountQueryParams,
  AccountQueryResponse,
  AccountResponseType,
} from '@/api/services/userService/types';
import { accountQueryResponseSchema } from '@/schemas/accountSchema';
import { useToast } from '../use-toast';

export const useGetUsers = (queryParams: AccountQueryParams) => {
  return useQuery<AccountQueryResponse, Error>({
    queryKey: ['Account', queryParams],
    queryFn: async () => {
      const response = await getUsers(queryParams);
      const result = safeParseResponse(accountQueryResponseSchema, response.data);
      console.log('get users success', result);
      return result;
    },
  });
};

export const useCreateUserMutation = (): UseMutationResult<
  AxiosResponse<AccountResponseType>,
  AxiosError<AxiosError>,
  AccountResponseType
> => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<AxiosResponse<AccountResponseType>, AxiosError<AxiosError>, AccountResponseType>({
    mutationFn: async (newUser: AccountResponseType) => await createUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Account'] });
      toast({
        description: '新增成功!',
      });
    },
    onError: (error: AxiosError<AxiosError>) => {
      console.error('Error creating user:', error);
      toast({
        variant: 'destructive',
        description: '新增失敗!',
      });
    },
  });
};

export const useUpdateUserMutation = (): UseMutationResult<
  AxiosResponse<AccountResponseType>,
  AxiosError<AxiosError>,
  AccountResponseType
> => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<AxiosResponse<AccountResponseType>, AxiosError<AxiosError>, AccountResponseType>({
    mutationFn: async (data: AccountResponseType) => await updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Account'] });
      toast({
        description: '修改成功!',
      });
    },
    onError: (error: AxiosError<AxiosError>) => {
      console.error('Error creating user:', error.response?.data.message);
      toast({
        variant: 'destructive',
        description: '修改失敗!',
      });
    },
  });
};

export const useUpdateUserTableMutation = (
  queryParams: AccountQueryParams,
): UseMutationResult<AxiosResponse<AccountBlackListResponseType>, AxiosError, AccountBlackListResponseType> => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: AccountBlackListResponseType) => {
      return await blackList(data);
    },
    onMutate: async (updatedData: AccountBlackListResponseType) => {
      await queryClient.cancelQueries({ queryKey: ['Account', queryParams] });
      const previousData = queryClient.getQueryData<AccountResponseType[]>(['Account', queryParams]);
      queryClient.setQueryData<AccountQueryResponse>(['Account', queryParams], (old) => {
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
        queryClient.setQueryData(['Account', queryParams], context.previousData);
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
  });
};

export const useDeleteUserMutation = (): UseMutationResult<
  AxiosResponse<AccountIdResponseType>,
  AxiosError<AxiosError>,
  string
> => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<AxiosResponse<AccountIdResponseType>, AxiosError<AxiosError>, string>({
    mutationFn: async (id: string) => await deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Account'] });
      toast({
        description: '刪除成功!',
      });
    },
    onError: (error: AxiosError<AxiosError>) => {
      console.error('Error creating user:', error.response?.data.message);
      toast({
        variant: 'destructive',
        description: '刪除失敗!',
      });
    },
  });
};
