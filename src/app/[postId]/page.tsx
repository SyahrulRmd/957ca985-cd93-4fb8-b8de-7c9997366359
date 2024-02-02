import Await from '@/components/await';
import { CommentList } from '@/components/comments';
import { Post } from '@/components/posts';
import { Skeleton } from '@/components/ui/skeleton';
import { getCommentsByPost } from '@/lib/dummyjson/comments';
import { getPost } from '@/lib/dummyjson/posts';
import { Suspense } from 'react';

export default async function PostDetail({ params }: { params: { postId: string } }) {
  const commentsPromise = getCommentsByPost(parseInt(params.postId))
  const postPromise = getPost(params.postId)

  return (
    <main className="container mt-28">
      <div className='mb-6'>
        <Suspense
          fallback={
            <Skeleton className='w-full h-52 mb-6' />
          }
        >
          {/* @ts-expect-error Server Component */}
          <Await promise={postPromise}>
            {(post) => <Post post={post} isLink={false} />}
          </Await>
        </Suspense>
      </div>
      <Suspense
        fallback={
          Array(3).fill(0).map((_, key) => (
            <Skeleton key={key} className='w-full h-28 mb-6' />
          ))
        }
      >
        {/* @ts-expect-error Server Component */}
        <Await promise={commentsPromise}>
          {({ comments }) => <CommentList comments={comments} />}
        </Await>
      </Suspense>
    </main>
  )
}
