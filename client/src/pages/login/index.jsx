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
import { validateForm } from '../../utils/ValidateInput'
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "",
        password: ""
    })

    //form validation
    const validationRules = {
        email: { email: true },
        password: { minLength: 8 },
    };

    const createLoginMutation = useMutation(loginUser, {
        onSuccess: (data) => {
            if (data) {
                navigate("/")
                dispatch(clearUser())
                dispatch(fetchUser(data))
                dispatch(openPopup({ message: "Login successful", status: status.success }))
                dispatch(fetchToken({ token: data.token }))
            }
        },
        onError: (err) => {
            dispatch(openPopup({ status: 'error', message: err.response.data.message }))
        }
    });

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { errors, hasErrors } = validateForm(input, validationRules);
        if (hasErrors) {
            setError(errors);
        } else {
            createLoginMutation.mutate(input)
        }
    }


    return (
        <section className='md:flex items-center md:flex-col md:mt-32 mt-28'>
            <div className="w-full flex flex-col items-center p-6 relative md:w-1/3  h-screen ">
                <p className='text-5xl mb-2 font-bold text-purple-800 font-sourGummy'>MomenTom</p>
                <h1 className="font-semibold text-4xl mt-5 md:text-4xl">Login</h1>
                <p className="text-gray-500 text-sm md:text-xl">Sign in to your account</p>
                <form onSubmit={handleSubmit} action="" className="mt-5  mx-center w-full h-3/5 relative flex md:items-start flex-col items-center">
                    <div className='relative w-full'>
                        <CiMail className='absolute left-2  text-2xl text-gray-300 top-5' />
                        <Input hasError={error["email"]} onChange={handleChange} name='email' placeholder='' style='!w-full !pl-10' />
                    <span className='error'>{error["email"]}</span>
                    </div>
                    <div className='relative w-full'>
                        <CiLock className='absolute left-2  text-2xl text-gray-300 top-5' />
                        <Input type='password' onChange={handleChange} hasError={error["password"]} name='password' placeholder='' style='!w-full !pl-10' />
                    <span className='error'>{error["password"]}</span>
                    </div>
                    <Button type="submit" name='Sign in' style={'border !rounded-full left-0 !bg-[#B175FF] mx-auto mt-8 bottom-20 !py-4  !w-full !flex !justify-center w-36 !text-white'} />
                </form>
            </div>
        </section>
    )
}

export default Login