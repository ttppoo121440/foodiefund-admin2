import {
  accountBlackListResponseTypeSchema,
  accountIdResponseTypeSchema,
  accountQueryParamsSchema,
  accountQueryResponseSchema,
  accountRegistrationSchema,
  accountResponseTypeSchema,
} from '@/schemas/accountSchema';
import { z } from 'zod';

export type AccountResponseType = z.infer<typeof accountResponseTypeSchema>;
export type AccountIdResponseType = z.infer<typeof accountIdResponseTypeSchema>;
export type accountRegistrationSchemaType = z.infer<typeof accountRegistrationSchema>;
export type AccountBlackListResponseType = z.infer<typeof accountBlackListResponseTypeSchema>;
export type AccountQueryParams = z.infer<typeof accountQueryParamsSchema>;
export type AccountQueryResponse = z.infer<typeof accountQueryResponseSchema>;
