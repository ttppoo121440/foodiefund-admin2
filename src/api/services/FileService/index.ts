import axiosClient from '@/api/axiosClient';
import { DeleteFileFormType, FileListResponseType, PostFileFormType } from './types';
import { AxiosResponse } from 'axios';

export const getFileList = () => {
  return axiosClient.get<FileListResponseType>('/admin/upload/list-files');
};

export const createFile = (fileData: PostFileFormType): Promise<AxiosResponse<PostFileFormType>> => {
  const formData = new FormData();
  if (fileData.file) {
    formData.append('file', fileData.file);
  }
  console.log(fileData);
  return axiosClient.post('/admin/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteFile = (name: string): Promise<AxiosResponse<DeleteFileFormType>> => {
  return axiosClient.delete(`/admin/upload/${name}`);
};
