import { z } from 'zod'
import { paginationSchema } from './pagination.d'

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
  tags: z.array(z.string()),
  reactions: z.number(),
})

export const postListSchema = paginationSchema.extend({
  posts: z.array(postSchema)
})

export type IPost = z.infer<typeof postSchema>
