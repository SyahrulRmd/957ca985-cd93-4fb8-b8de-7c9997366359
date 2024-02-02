import { Searchbar } from '@/components/searchbar';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

import { PostList } from '@/components/posts';
import Await from '@/components/await';
import { getPosts } from '@/lib/dummyjson/posts';

export default async function Search({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const promise = getPosts(searchParams.q)

  return (
    <main className="container mt-28">
      <div className='mb-10'>
        <Searchbar />
      </div>
      <Suspense
        key={searchParams.q}
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
