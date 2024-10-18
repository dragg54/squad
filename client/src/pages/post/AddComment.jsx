/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import Input from '../../components/inputs'
import Button from '../../components/buttons'
import { openPopup } from '../../redux/reducers/PopUpReducer'
import { createComment, getComments } from '../../services/comment'
import useHandleErrorResponse from '../../hooks/useHandleErrorResponse'
import { useDispatch } from 'react-redux'
import { useMutation, useQuery } from 'react-query'
import { closeModal } from '../../redux/reducers/GlobalModalReducer'

const AddComment = ({ page, size, postId }) => {
    const [inputValues, setInputValues] = useState({
        content: "",
    })
    const dispatch = useDispatch()
    const handleErrorResponse = useHandleErrorResponse()
    const { data: newComments, isLoading, isError, refetch } = useQuery(
        ['Comments', { page, size, groupBy: "" }],
        getComments,
        // {
        //   keepPreviousData: true, 
        // }
    );
    const createCommentMutation = useMutation(createComment, {
        onSuccess: () => {
            dispatch(closeModal())
            dispatch(openPopup({ message: "Comment submitted" }))
            refetch()
        },
        onError: (err) => {
            console.log(err.response.status)
            handleErrorResponse(err.response.status)
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        inputValues.postId = postId
        createCommentMutation.mutate(inputValues)
    }

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value })
    }
    return (
        <div onClick={(e) => e.stopPropagation()} className='w-5/6 md:w-2/6 rounded-md shadow-md shadow-gray-300 pt-6 p-5 md:h-[350px] h-[350px] bg-white mx-auto'>
            <h1 className='w-full text-2xl font-semibold'>
                Post Comment
            </h1>
            <form onSubmit={handleSubmit} action="" className='mt-6'>
                <Input
                    style='!mt-5 h-36 outline-none p-2 !border'
                    name='content'
                    onChange={handleChange}
                    type='text-area'
                    placeholder='Add comment' />
                <div className='w-full flex justify-end'>
                    <Button type='submit' style='mt-6 !py-3 !bg-[#9619b2]' name="Submit Comment" />
                </div>
            </form>
        </div>
    )
}

export default AddComment