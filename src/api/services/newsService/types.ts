import {
  newsIdResponseTypeSchema,
  newsQueryParamsSchema,
  newsQueryResponseSchema,
  newsResponseTypeSchema,
} from '@/schemas/newsSchema';
import { z } from 'zod';

export type NewsResponseType = z.infer<typeof newsResponseTypeSchema>;
export type NewsIdResponseType = z.infer<typeof newsIdResponseTypeSchema>;
export type NewsQueryParams = z.infer<typeof newsQueryParamsSchema>;
export type NewsQueryResponse = z.infer<typeof newsQueryResponseSchema>;
