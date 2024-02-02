import { postListSchema, postSchema } from "@/schemas/post.d";

export async function getPosts(searchQuery: string | undefined) {
  const search = searchQuery ? `/search?q=${searchQuery}` : '?limit=10';

  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL! + '/posts' + search, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const json = await res.json()
  return postListSchema.parse(json)
}

export async function getPost(id: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL! + '/posts/' + id, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: ['post' + id]
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const json = await res.json()
  return postSchema.parse(json)
}


export async function updatePostReactions(id: string, reactions: number) {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL! + '/posts/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reactions })
  })

  if (!res.ok) {
    throw new Error('Failed to update data')
  }

  const json = await res.json()
  return postSchema.parse(json)
}
