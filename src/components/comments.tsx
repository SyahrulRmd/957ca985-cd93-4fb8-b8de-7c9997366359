'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { IComment } from '@/schemas/comment';
import { useEffect, useState } from 'react';

const Comment = ({ comment }: { comment: IComment }) => {
  return (
    <Card className="hover:bg-card">
      <CardContent className="pt-6">
        <p className="text-foreground">{comment.body}</p>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground">From @{comment.user.username}</p>
      </CardFooter>
    </Card>
  )
}

const CommentList = ({ comments }: { comments: IComment[] }) => {
  const [mergedComments, setMergedComments] = useState<IComment[]>([])

  useEffect(() => {    
    const localComments: IComment[] = JSON.parse(localStorage.getItem('comments') ?? '[]')
    
    if (localComments?.length) {
      const additionalComments = localComments.filter(comment => comment.postId === comments[0].postId)
      setMergedComments([...comments, ...additionalComments])
    } else {
      setMergedComments(comments)
    }
  }, [comments])

  return (
    <div className='flex flex-col gap-6'>
      {mergedComments.map((comment, key) => (
        <Comment key={key} comment={comment} />
      ))}
    </div>
  )
}

export { CommentList, Comment }
