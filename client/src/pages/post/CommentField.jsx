/* eslint-disable react/prop-types */
import { useState } from "react"
import Input from "../../components/inputs"
import Button from "../../components/buttons"
import { useMutation, useQueryClient } from "react-query"
import { createComment } from "../../services/comment"

const CommentField = ({ post, data, isChild, showCommentField, setShowCommentField, commentState, setCommentState }) => {
    const [comment, setComment] = useState('')
    const [response, setResponse] = useState(true)
    const queryClient = useQueryClient()
    const createCommentMutation = useMutation(createComment, {
        onSuccess: async (res) => {
            setResponse(true)
            await queryClient.invalidateQueries(['comment']);
            setResponse(res)
        },
        onError: (err) => {
            console.log(err.response.status)
        }
    });
    const handleSubmit = () => {
        setResponse(false)
        createCommentMutation.mutate({ content: comment, parentPostId: post ? post.id: data.id })
    }

    if (commentState != null && commentState[data?.id] || post)
        return (
            <div className="w-full mt-2" onClick={() => post && setShowCommentField(true)}>
                {(commentState != null && commentState[data?.id]) || (post && showCommentField) ?
                    <div className="relative h-40">
                        <Input value={comment} onChange={(e) => setComment(e.target.value)} maxLength={220} type="text-area" style='h-full !border-gray-400 !w-full border !pb-24  !row-3 !column-3' />
                        <div className="absolute !rounded-full bottom-2 right-1 flex gap-1 items-center">
                            <Button
                                onClick={(e) => {
                                    console.log(commentState)
                                    e.stopPropagation()
                                    !isChild && setShowCommentField(false)
                                    isChild && commentState && data && setCommentState({ ...commentState, [data.id]: false })
                                }}
                                style='!rounded-full !bg-gray-400 !text-gray-800'
                                name='Cancel'
                            />
                            <Button
                                onClick={() => handleSubmit()}
                                response={response}
                                disabled={comment.length < 1 || !response}
                                style='!rounded-full'
                                name={response ? 'Comment' : "Please Wait..."}
                            />
                        </div>
                    </div>
                    :
                    <div onClick={() =>
                        setShowCommentField(true)
                    } style={{ display: isChild && 'none' }} className='p-4 border w-full border-gray-150 rounded-full text-gray-400'>
                        Add a comment
                    </div>
                }
            </div>

        )
}

export default CommentField