import { z } from 'zod';

export const newsResponseTypeSchema = z.object({
  _id: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  isEnabled: z.boolean().optional(),
  isTop: z.boolean().optional(),
  publicAt: z.string().optional(),
  updateAt: z.string().optional(),
  id: z.string().optional(),
});

export const newsIdResponseTypeSchema = newsResponseTypeSchema.pick({
  _id: true,
});

export const newsResponseArraySchema = z.array(newsResponseTypeSchema);

export const newsQueryParamsSchema = z.object({
  keyWord: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export const newsQueryResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(newsResponseTypeSchema),
  message: z.string(),
  pagination: z.object({
    current_page: z.number(),
    has_next: z.boolean(),
    has_pre: z.boolean(),
    total: z.number(),
    total_pages: z.number(),
  }),
});
