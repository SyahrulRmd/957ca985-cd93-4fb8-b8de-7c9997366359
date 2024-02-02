import { Searchbar } from '@/components/searchbar';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

import { PostList } from '../components/posts';
import Await from '../components/await';
import { getPosts } from '@/lib/dummyjson/posts';

export default async function Home() {
  const promise = getPosts('')

  return (
    <main className="container mt-28">
      <div className='mb-10'>
        <Suspense fallback={<Skeleton className='w-full h-11' />}>
          <Searchbar />
        </Suspense>
      </div>
      <Suspense
        fallback={
          Array(3).fill(0).map((_, key) => (
            <Skeleton key={key} className='w-full h-52 mb-6' />
          ))
        }
      >
        {/* @ts-expect-error Server Component */}
        <Await promise={promise}>
          {({ posts }) => <PostList posts={posts} />}
        </Await>
      </Suspense>
    </main>
  );
}
