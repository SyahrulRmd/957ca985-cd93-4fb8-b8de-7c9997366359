import { z } from 'zod'

export const paginationSchema = z.object({
  total: z.number(),
  limit: z.number(),
  skip: z.number(),
})

export type IPagination = z.infer<typeof paginationSchema>
