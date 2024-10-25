import { NewsResponseType } from '@/api/services/newsService/types';
import { newsResponseTypeSchema } from '@/schemas/newsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export const FormConfig = () => {
  const initialValues = useMemo(
    () => ({
      _id: '',
      title: '',
      content: '',
      isTop: false,
      isEnabled: true,
    }),
    [],
  );

  const methods = useForm<NewsResponseType>({
    resolver: zodResolver(newsResponseTypeSchema),
    defaultValues: initialValues,
  });

  return { initialValues, methods };
};
