import { FileListResponseType } from '@/api/services/FileService/types';
import { postFileFormType } from '@/schemas/fileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export const FormConfig = () => {
  const initialValues = useMemo(
    () => ({
      id: '',
      url: undefined,
      name: '',
      folder: '',
      file: undefined,
    }),
    [],
  );

  const methods = useForm<FileListResponseType>({
    resolver: zodResolver(postFileFormType),
    defaultValues: initialValues,
  });

  return { initialValues, methods };
};
