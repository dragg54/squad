import Input from '../../components/inputs/index'
import Button from '../../components/buttons'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useState } from 'react'
import { loginUser } from '../../services/user'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../redux/reducers/PopUpReducer'
import { clearUser, fetchUser } from '../../redux/reducers/UserReducer'
import { fetchToken } from '../../redux/reducers/AuthReducer'
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { capitalizeFirstChar } from '../../utils/CapitalizeFirstChar'
import PopUp from '../../components/popups'
import Logo from '../../components/logo'

const Login = () => {
    const navigate = useNavigate()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [response, setResponse ] = useState(true)
    const dispatch = useDispatch()
    const [error, setError] = useState({
        email: "",
        password: ""
    })
    const [input, setInput] = useState({
         email: "",
        password: ""
    })

    //form validation
    const validationRules = {
        email: value=> value.length > 0,
        password:value=> value.length > 8,
    };

    const createLoginMutation = useMutation(loginUser, {
        onSuccess: (data) => {
            if (data) {
                navigate("/")
                setResponse(true)
                dispatch(clearUser())
                dispatch(fetchUser(data))
                dispatch(openPopup({ message: "Login successful", status: status.success }))
                dispatch(fetchToken({ token: data.token }))
            }
        },
        onError: (err) => {
            setResponse(true)
            dispatch(openPopup({ status: 'error', message: err.response.data.message }))
        }
    });

    const handleChange = (e) => {
        if(!(validationRules[e.target.name](e.target.value))){
            setError({...error, [e.target.name]: `${capitalizeFirstChar(e.target.name)} is invalid`})
        }
        else{
            setError({...error, [e.target.name]: ``})
        }
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setResponse(false)
        if (!buttonDisabled) {
            const finalInputValues = input
            createLoginMutation.mutate(finalInputValues)
        }
    }

    return (
        <section className='md:flex items-center md:flex-col md:mt-32 mt-28 relative'>
            <PopUp style={'!top-1'}/>
            <div className="w-full flex flex-col items-center p-6 relative md:w-1/3  h-screen ">
            <div className='flex gap-1'>
            <div className='w-12 h-12'><Logo /></div>
            <p className='text-5xl mb-2 font-bold text-purple-800 font-sourGummy'>MomenTom</p>
            </div>
                <h1 className="font-semibold text-4xl mt-5 md:text-4xl">Login</h1>
                <p className="text-gray-500 text-sm md:text-xl">Sign in to your account</p>
                <form onSubmit={handleSubmit} action="" className="mt-5  mx-center w-full h-3/5 relative flex md:items-start flex-col items-center">
                    <div className='relative w-full'>
                        <CiMail className='absolute left-2  text-2xl text-gray-300 top-5' />
                        <Input value={input.email} hasError={error.email} onChange={handleChange} name='email' placeholder='' style='!w-full !pl-10' />
                    <span className='error'>{error.email}</span>
                    </div>
                    <div className='relative w-full'>
                        <CiLock className='absolute left-2  text-2xl text-gray-300 top-5' />
                        <Input value={input.password} type='password' onChange={handleChange} hasError={error.password} name='password' placeholder='' style='!w-full !pl-10' />
                    <span className='error'>{error.password}</span>
                    </div>
                    <Button
                        validationRules={{textValidation:validationRules}}
                        buttonDisabled={buttonDisabled}
                        isApiRequestButton={true}
                        response={response}
                        inputValues={input}
                        setButtonDisabled={setButtonDisabled}
                        type="submit"
                        name='Sign in'
                        style={'border !rounded-full left-0 !bg-[#B175FF] mx-auto mt-8 bottom-20 !py-4  !w-full !flex !justify-center w-36 !text-white'} />
                </form>
            </div>
        </section>
    )
}

export default Login