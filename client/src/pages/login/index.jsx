import Input from '../../components/inputs/index'
import Button from '../../components/buttons'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useState } from 'react'
import { loginUser } from '../../services/user'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../redux/reducers/PopUpReducer'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const createLoginMutation = useMutation(loginUser, {
        onSuccess: (data) => {
            if(data){
                navigate("/")
                dispatch(openPopup({message: "Login successful", status: status.success}))
            }
        },
        onError: (err) =>{
            dispatch(openPopup({status: 'error', message: err.response.data.message}))
        }
      });

    const handleChange = (e) =>{
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        createLoginMutation.mutate(input)
    }

    return (
        <section>
            <div className="w-full p-6 relative h-screen">
                <h1 className="font-semibold text-xl mt-5">Login</h1>
                <p className="text-gray-500 text-sm">Sign in to your account</p>
                <form onSubmit={handleSubmit} action="" className="mt-5 w-full  h-3/5 relative flex-col items-center">
                    <Input onChange={handleChange} name='email' placeholder='Email' style='' />
                    <Input onChange={handleChange} type="password" name='password' placeholder='Password' style='!mt-6' />
                    <Button type="submit" name='Sign in' style={'border left-0 !bg-[#B175FF] mx-auto absolute bottom-20 !py-4 mt-20 !w-full !flex !justify-center w-36 !text-white'} />
                </form>
                <p className='-mt-16'>{"Don't"} have an account? <span className='text-[#B175FF] cursor-pointer' onClick={()=> navigate("/register")}> Sign up here</span></p>
            </div>
        </section>
    )
}

export default Login