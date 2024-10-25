import axiosClient from '@/api/axiosClient';

import { AxiosResponse } from 'axios';
import {
  AccountBlackListResponseType,
  AccountIdResponseType,
  AccountQueryParams,
  AccountQueryResponse,
  AccountResponseType,
} from './types';

export const getUsers = ({
  keyWord = '',
  page,
  limit = 10,
  isBlackListed = undefined,
  role = '',
}: AccountQueryParams) => {
  if (typeof isBlackListed === 'string' && isBlackListed === '3') {
    isBlackListed = undefined;
  }
  return axiosClient.get<AccountQueryResponse>('/admin/account', {
    params: { keyWord, page, limit, isBlackListed, role },
  });
};

export const createUser = (user: AccountResponseType): Promise<AxiosResponse<AccountResponseType>> => {
  console.log(user);

  return axiosClient.post('/auth/sign_up', user);
};

export const updateUser = (user: AccountResponseType): Promise<AxiosResponse<AccountResponseType>> => {
  console.log(user);
  return axiosClient.put(`/admin/account/${user._id}`, user);
};

export const deleteUser = (userId: string): Promise<AxiosResponse<AccountIdResponseType>> => {
  return axiosClient.delete(`/Admin/account/${userId}`);
};

export const blackList = (user: AccountBlackListResponseType): Promise<AxiosResponse<AccountBlackListResponseType>> => {
  return axiosClient.patch(`/admin/account/blacklist/${user._id}`, {
    isBlackListed: user.isBlackListed === true ? 1 : 0,
  });
};
