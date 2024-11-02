import {
  deleteFileResponseSchema,
  fileFormSchema,
  fileQueryResponseSchema,
  postFileFormType,
} from '@/schemas/fileSchema';
import { z } from 'zod';

export type FileListResponseType = z.infer<typeof fileFormSchema>;
export type FileListQueryResponse = z.infer<typeof fileQueryResponseSchema>;
export type PostFileFormType = z.infer<typeof postFileFormType>;
export type DeleteFileFormType = z.infer<typeof deleteFileResponseSchema>;
