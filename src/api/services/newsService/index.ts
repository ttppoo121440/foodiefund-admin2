import axiosClient from '@/api/axiosClient';

import { AxiosResponse } from 'axios';
import { NewsIdResponseType, NewsQueryParams, NewsQueryResponse, NewsResponseType } from './types';

export const getNews = ({ keyWord = '', page, limit = 10 }: NewsQueryParams) => {
  return axiosClient.get<NewsQueryResponse>('/news', {
    params: { keyWord, page, limit },
  });
};

export const createNews = (news: NewsResponseType): Promise<AxiosResponse<NewsResponseType>> => {
  return axiosClient.post('/news/admin', news);
};

export const updateNews = (news: NewsResponseType): Promise<AxiosResponse<NewsResponseType>> => {
  console.log(news);
  return axiosClient.put(`/news/admin/${news._id}`, news);
};

export const deleteNews = (newsId: string): Promise<AxiosResponse<NewsIdResponseType>> => {
  return axiosClient.delete(`/news/admin/${newsId}`);
};
