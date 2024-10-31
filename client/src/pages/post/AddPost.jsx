/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import Input from '../../components/inputs'
import Button from '../../components/buttons'
import { openPopup } from '../../redux/reducers/PopUpReducer'
import { createPost, getPosts } from '../../services/post'
import useHandleErrorResponse from '../../hooks/useHandleErrorResponse'
import { useDispatch } from 'react-redux'
import { useMutation, useQuery } from 'react-query'
import { closeModal } from '../../redux/reducers/GlobalModalReducer'

const AddPost = ({ page, size }) => {
    const [inputValues, setInputValues] = useState({
        title: "",
        description: ""
    })
    const dispatch = useDispatch()
    const handleErrorResponse = useHandleErrorResponse()
    const { data: newPosts, isLoading, isError, refetch } = useQuery(
        ['posts', { page, size, groupBy: "" }],
        getPosts,
        // {
        //   keepPreviousData: true, 
        // }
    );

    const [message, setMessage] = useState()
 
    console.log(message)
    const createPostMutation = useMutation(createPost, {
        onSuccess: () => {
            dispatch(closeModal())
            dispatch(openPopup({ message: "Post created" }))
            refetch()
        },
        onError: (err) => {
            console.log(err.response.status)
            handleErrorResponse(err.response.status)
        }
    });


    const handleSubmit = (e) => {
        e.preventDefault()
        createPostMutation.mutate(inputValues)
    }

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value })
    }
    return (
        <div onClick={(e) => e.stopPropagation()} className='w-5/6 -mt-10 md:w-2/6 rounded-md shadow-md shadow-gray-300 pt-6 p-5 md:h-[400px] h-[450px] bg-white mx-auto'>
            <h1 className='w-full text-2xl font-semibold'>
                Create Post
            </h1>
            <form onSubmit={handleSubmit} action="" className='mt-6'>
                <label htmlFor="">
                    <Input
                        placeholder='Title'
                        name='title'
                        onChange={handleChange} />
                </label>
                <Input
                    style='!mt-5 h-36 outline-none p-2 !border'
                    name='description'
                    onChange={handleChange}
                    type='text-area'
                    placeholder='Post' />
                <div className='w-full flex justify-end'>
                    <Button type='submit' style='mt-6 !py-3 !bg-[#9619b2]' name="Create Post" />
                </div>
            </form>
        </div>
    )
}

export default AddPost