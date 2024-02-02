'use client'

import { Input } from "./ui/input"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IComment, ICommentPayload, commentPayload } from "@/schemas/comment.d"
import { addCommentAction } from "@/lib/actions/comments"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { toast } from "sonner"

const ReplyPost = ({ postId, setShowForm }: { postId: number, setShowForm: Dispatch<SetStateAction<boolean>> }) => {
  const router = useRouter()

  const form = useForm<ICommentPayload>({
    resolver: zodResolver(commentPayload),
    defaultValues: {
      body: '',
      userId: 1,
      postId: postId
    }
  })

  const submitReply = async (data: ICommentPayload) => {
    const newComment = await addCommentAction(data)
    
    if (newComment.data && !newComment.error) {
      toast.success('Successfully reply post')
    } else {
      toast.error('Failed to reply post')
    }

    let localComments: IComment[] = JSON.parse(localStorage.getItem('comments') ?? '[]')
    if (newComment.data) {
      if (localComments?.length) {
        localComments.push(newComment.data)
        localStorage.setItem('comments', JSON.stringify(localComments))
      } else {
        localStorage.setItem('comments', JSON.stringify(Array(1).fill(newComment.data)))
      }
    }    

    router.refresh()
    form.reset()

    setTimeout(() => {
      setShowForm(false)
    }, 500);
  }

  return (
    <form onSubmit={form.handleSubmit(submitReply)}>
      <div className="w-full mb-4">
        <Input
          placeholder='Reply Post...'
          {...form.register('body')}
          data-test-id='reply-input'
        />
        {form.formState.errors['body'] && (
          <span className="text-sm pt-2 text-red-600 inline-block">
            {form.formState.errors['body']?.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className='bg-primary text-sm h-10 text-primary-foreground w-full sm:w-auto font-medium px-4 py-2 rounded-lg disabled:pointer-events-none disabled:brightness-90 disabled:opacity-50'
        disabled={form.formState.isSubmitting}
        data-test-id='reply-button'
      >
        Reply
      </button>
    </form>
  )
}

export { ReplyPost }
