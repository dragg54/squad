/* eslint-disable react/prop-types */
import { useState } from "react"
import Input from "../../components/inputs"
import Button from "../../components/buttons"
import { useMutation, useQueryClient } from "react-query"
import { createComment } from "../../services/comment"
import { useParams } from "react-router-dom"

const CommentField = ({
    post,
    data,
    isChild,
    commentParentId,
    parentId,
    showCommentField,
    setShowCommentField,
    commentState,
    toggleCommentBox
}) => {
    const [comment, setComment] = useState('')
    const [response, setResponse] = useState(true)
    const queryClient = useQueryClient()
    const id = useParams().id
    const createCommentMutation = useMutation(createComment, {
        onSuccess: async () => {
            setResponse(true)
            isChild ? toggleCommentBox(commentParentId) : setShowCommentField(false)
            await queryClient.invalidateQueries(['comment']);
        },
        onError: (err) => {
            console.log(err.response.status)
        }
    });
    const handleSubmit = () => {
        setResponse(false)
        createCommentMutation.mutate({ content: comment, parentId: commentParentId, postId: isChild ? id : parentId })
    }

    if ((commentState != null && commentState[data?.id] || post) || isChild)
        return (
            <div className="w-full mt-2" onClick={() => post && setShowCommentField(true)}>
                {(commentState != null && commentState[data?.id]) || (post && showCommentField) || isChild ?
                    <div className="relative h-40">
                        <Input value={comment} onChange={(e) => setComment(e.target.value)} maxLength={220} type="text-area" style='h-full !border-gray-400 !w-full border !pb-24  !row-3 !column-3' />
                        <div className="absolute !rounded-full bottom-2 right-1 flex gap-1 items-center">
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    isChild ? toggleCommentBox(commentParentId) : setShowCommentField(false)
                                }}
                                style='!rounded-full !bg-gray-400 !text-gray-800 !text-sm'
                                name='Cancel'
                            />
                            <Button
                                onClick={() => handleSubmit()}
                                response={response}
                                disabled={comment.length < 1 || !response}
                                style='!rounded-full !bg-purple-500 !text-sm'
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