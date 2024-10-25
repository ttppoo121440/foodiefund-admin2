import { NewsResponseType } from '@/api/services/newsService/types';
import { FormFieldConfig } from '@/components/FormComponent/types';

export const NewsFormFields: FormFieldConfig<NewsResponseType>[] = [
  { label: '標題', name: 'title', type: 'text', key: 'title' },
  { label: '內容', name: 'content', type: 'textarea', key: 'content' },
  { label: '是否啟用', name: 'isEnabled', type: 'switch', key: 'isEnabled', id: 'isEnabled' },
  { label: '是否置頂', name: 'isTop', type: 'switch', key: 'isTop', id: 'isTop' },
];
