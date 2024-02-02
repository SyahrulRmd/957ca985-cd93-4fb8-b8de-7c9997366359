import { ICommentPayload, commentListSchema, commentSchema } from '@/schemas/comment.d';

export async function getCommentsByPost(postId: number) {  
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL! + '/comments/post/' + postId, {
    headers: {
      "Content-Type": "application/json",
    },
  }) 

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const json = await res.json()
  return commentListSchema.parse(json)
}

export async function addComment(comment: ICommentPayload) {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL! + '/comments/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment)
  })

  if (!res.ok) {
    throw new Error('Failed to add data')
  }

  const json = await res.json()
  return commentSchema.parse(json)
}
