'use server'

import { revalidatePath } from "next/cache"
import { addComment } from "../dummyjson/comments"
import { ICommentPayload, commentPayload } from "@/schemas/comment.d"

export async function addCommentAction(comment: ICommentPayload) {
  const validate = commentPayload.safeParse(comment)

  if (!validate.success) {
    return {
      error: validate.error.format(),
      data: undefined
    }
  }

  const newComment = await addComment(comment)
  
  return {
    error: undefined,
    data: newComment
  }
}
