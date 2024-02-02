'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTag, CardTagList, CardTitle } from '@/components/ui/card';
import { updatePostReactionsAction } from '@/lib/actions/posts';
import { IPost } from '@/schemas/post';
import { Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { MouseEvent, ReactNode, useState } from 'react';

import { ReplyPost } from './reply-post';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog';

const LinkWrapper = ({ href, children }: { href: string | undefined, children: ReactNode }) => {
  if (!href) {
    return <>{children}</>
  }

  return (
    <Link href={href}>{children}</Link>
  )
}

const Post = ({ post, isLink }: { post: IPost, isLink: boolean }) => {
  const [reactions, setReactions] = useState<number>(post.reactions)
  const [showReplyDialog, setShowReplyDialog] = useState<boolean>(false)

  const isLiked = reactions === post.reactions + 1

  const likePost = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const newReactions = isLiked ? reactions - 1 : reactions + 1
    setReactions(newReactions)
    await updatePostReactionsAction(post.id.toString(), newReactions)
  }

  const replyPost = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowReplyDialog(!showReplyDialog)
  }

  return (
    <div data-test-id='post-card'>
      <Card className={isLink ? '' : 'hover:bg-card'}>
        <LinkWrapper href={isLink ? post.id.toString() : undefined}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.body}</p>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <div className='flex gap-6'>
              <div onClick={e => e.stopPropagation()}>
                <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
                  <DialogTrigger asChild>
                    <button
                      className={`inline-flex items-center z-10 relative gap-1 p-2 cursor-pointer transition-all hover:opacity-80`}
                      onClick={(e) => replyPost(e)}
                      data-test-id='open-reply-button'
                    >
                      <MessageCircle size={16} className='transition-all' />
                      Reply
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Reply Post</DialogHeader>
                    <ReplyPost postId={post.id} setShowForm={setShowReplyDialog} />
                  </DialogContent>
                </Dialog>
              </div>
              <button
                className={`inline-flex items-center p-2 gap-1 cursor-pointer transition-all hover:opacity-80 ${isLiked ? 'text-[#f91880]' : ''}`}
                onClick={(e) => likePost(e)}
                data-test-id='reaction-button'
              >
                <Heart size={16} className='transition-all' fill={isLiked ? '#f91880' : 'none'} />
                <span data-test-id='reaction-value'>{reactions}</span>
              </button>
            </div>
            <CardTagList>
              {post.tags.map((tag, key) => (
                <CardTag key={key}>
                  {tag}
                </CardTag>
              ))}
            </CardTagList>
          </CardFooter>
        </LinkWrapper>
      </Card>
    </div>
  )
}

const PostList = ({ posts }: { posts: IPost[] }) => {
  if (!posts.length) {
    return (
      <div>Post not found</div>
    )
  }

  return (
    <div className='flex flex-col gap-6'>
      {posts.map((post, key) => (
        <Post key={key} post={post} isLink />
      ))}
    </div>
  )
}

export { Post, PostList }
