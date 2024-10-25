import { z } from 'zod';

export const accountRegistrationFormSchema = z.object({
  _id: z.string(),
  name: z.string().nonempty('姓名不能為空'),
  email: z.string().nonempty('電子郵箱不能為空').email('電子郵箱格式錯誤'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{10}$/.test(val), {
      message: '電話號碼必須是10位數字或為空',
    }),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  role: z.string().optional(),
  remarks: z.string().optional(),
  isBlackListed: z.boolean().optional(),
});

export const accountResponseTypeSchema = z.object({
  _id: z.string(),
  name: z.string().nonempty('姓名不能為空'),
  email: z.union([z.string().email('電子郵箱格式錯誤'), z.literal(''), z.undefined()]),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{10}$/.test(val), {
      message: '電話號碼必須是10位數字或為空',
    }),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  role: z.string().optional(),
  remarks: z.string().optional(),
  isBlackListed: z.boolean().optional(),
});

export const accountRegistrationSchema = accountRegistrationFormSchema
  .omit({ role: true, isBlackListed: true })
  .extend({
    password: z.string().nonempty('密碼不能為空').min(8, '密碼不能少於8個字'),
  });

export const accountResponseArraySchema = z.array(accountResponseTypeSchema);

export const accountIdResponseTypeSchema = accountResponseTypeSchema.pick({
  _id: true,
});

export const accountBlackListResponseTypeSchema = accountResponseTypeSchema.pick({
  _id: true,
  isBlackListed: true,
});

export const accountQueryParamsSchema = z.object({
  keyWord: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
  isBlackListed: z.union([z.number(), z.undefined()]).optional(),
  role: z.string().optional(),
});

export const accountQueryResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(accountResponseTypeSchema),
  message: z.string(),
  pagination: z.object({
    current_page: z.number(),
    has_next: z.boolean(),
    has_pre: z.boolean(),
    total: z.number(),
    total_pages: z.number(),
  }),
});
