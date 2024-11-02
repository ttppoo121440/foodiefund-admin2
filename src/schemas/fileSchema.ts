import { z } from 'zod';

export const fileFormSchema = z.object({
  URL: z.string().url().optional(),
  name: z.string().optional(),
  folder: z.string().optional(),
  id: z.string().optional(),
  file: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'), {
      message: '必须是有效的图片文件',
    })
    .optional(),
});

export const fileQueryResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(fileFormSchema),
  message: z.string(),
});

export const postFileFormType = fileFormSchema.pick({
  file: true,
});

export const deleteFileResponseSchema = fileFormSchema.pick({
  name: true,
});

export const fileResponseArraySchema = z.array(fileFormSchema);
