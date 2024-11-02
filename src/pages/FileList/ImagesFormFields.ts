import { PostFileFormType } from '@/api/services/FileService/types';
import { FormFieldConfig } from '@/components/FormComponent/types';

export const FilesFormFields: FormFieldConfig<PostFileFormType>[] = [
  { label: '上傳圖片', name: 'file', type: 'file', key: 'file' },
];
