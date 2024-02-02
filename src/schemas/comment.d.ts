import { z } from 'zod'
import { paginationSchema } from './pagination.d'

export const commentSchema = z.object({
  id: z.number(),
  postId: z.number(),
  body: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
  })
})

export const commentListSchema = paginationSchema.extend({
  comments: z.array(commentSchema)
})

export type IComment = z.infer<typeof commentSchema>

export const commentPayload = z.object({
  body: z.string().min(1, {message: 'Reply is required'}),
  postId: z.number(),
  userId: z.number()
})

export type ICommentPayload = z.infer<typeof commentPayload>
