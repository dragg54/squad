import Input from '../../components/inputs/index'
import Button from '../../components/buttons'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { createUser } from '../../services/user'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../redux/reducers/PopUpReducer'
import { status } from '../../constants/ResponseStatus'

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        sex: "",
        password: ""
    })
    const createUserMutation = useMutation(createUser, {
        onSuccess: () => {
           navigate("/login")
           dispatch(openPopup({message: "User successfully created", status: status.success}))
        },
      });

    const handleChange = (e) =>{
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        createUserMutation.mutate(input)
    }

    return (
        <section>
            <div className="w-full p-6">
                <h1 className="font-semibold text-xl mt-5">Register</h1>
                <p className="text-gray-500 text-sm">Create an account</p>
                <form onSubmit={handleSubmit} action="" className="mt-5">
                    <Input onChange={handleChange} name='firstName' placeholder='First Name' style=''/>
                    <Input onChange={handleChange} name='lastName' placeholder='Last Name' style=''/>
                    <Input onChange={handleChange} name='userName' placeholder='UserName' style=''/>
                    <Input onChange={handleChange} name='email' placeholder='Email' style=''/>
                    <Input onChange={handleChange} name='sex' placeholder='Sex' style=''/>
                    <Input onChange={handleChange} type="password" name='password' placeholder='Password' style=''/>
                    <Button type='submit' name='Sign in' style={'border !bg-[#B175FF] !py-4 mt-20 !w-full !flex !justify-center w-36 !text-white'}/>
                    </form>
                    <p className='mt-3'>Already have an account? <span className='text-[#B175FF] mt-4 cursor-pointer' onClick={()=> navigate("/login")}> Sign in here</span></p>
            </div>
        </section>
    )
}

export default Register