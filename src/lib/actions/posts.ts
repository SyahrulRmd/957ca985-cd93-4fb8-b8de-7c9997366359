'use server'

import { revalidateTag } from "next/cache"
import { updatePostReactions } from "../dummyjson/posts"

export async function updatePostReactionsAction(id: string, reactions: number) {
  await updatePostReactions(id, reactions)

  revalidateTag('post'+ id)
}
