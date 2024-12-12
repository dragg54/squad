/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import Input from '../../components/inputs'
import Button from '../../components/buttons'
import { openPopup } from '../../redux/reducers/PopUpReducer'
import { createPost, getPosts } from '../../services/post'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery } from 'react-query'
import { closeModal } from '../../redux/reducers/GlobalModalReducer'
import { socket } from '../../utils/Socket'

const AddPost = ({ page, size }) => {
    const [inputValues, setInputValues] = useState({
        title: "",
        description: ""
    })
    const user = useSelector(state => state.user)

    //button variables
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [response, setResponse] = useState(true)
    const validationRules = {
        textValidation: {
            description: value => value.length > 0,
            title: value => value.length > 0,
        }
    };

    const dispatch = useDispatch()
    const [isRequestError, setIsRequestError] = useState(false)
    const { data: newPosts, isLoading, isError, refetch } = useQuery(
        ['posts', { page, size, groupBy: "" }],
        getPosts,
        // {
        //   keepPreviousData: true, 
        // }
    );



    const createPostMutation = useMutation(createPost, {
        onSuccess: () => {
            setResponse(true)
            dispatch(closeModal())
            dispatch(openPopup({ message: "Post created" }))
            setButtonDisabled(false)
            setIsRequestError(false)
            refetch()
            socket.emit('postCreated', { authorId: user.id, squadId: user.squadId }, "Post Created");
        },
        onError: (err) => {
            console.log(err.response.status)
            setIsRequestError(true)
        }
    });


    const handleSubmit = (e) => {
        setButtonDisabled(true)
        setResponse(false)
        e.preventDefault()
        if (!buttonDisabled) {
            createPostMutation.mutate(inputValues)
        }
    }

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value })
    }
    return (
        <div onClick={(e) => e.stopPropagation()} className='w-5/6 -mt:mt-10 md:-mt-10 md:w-2/6 rounded-md shadow-md shadow-gray-300 pt-6 p-5 md:h-auto h-auto bg-white mx-auto'>
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
                <div className='mt-2'>
                </div>
                <div className='w-full flex justify-end'>
                    <Button
                        disabled={buttonDisabled}
                        type='submit'
                        style='mt-6 !py-3 !rounded-full'
                        name="Create Post"
                        validationRules={validationRules}
                        buttonDisabled={buttonDisabled}
                        inputValues={inputValues}
                        setButtonDisabled={setButtonDisabled}
                        isApiRequestButton={true}
                        response={response}
                    />
                </div>
            </form>
        </div>
    )
}

export default AddPost