import Input from '../../components/inputs/index'
import Button from '../../components/buttons'
import {  useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'


const Register = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        squadId: "",
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        sex: "",
        password: ""
    })


    const handleChange = (e) =>{
        setInput({...input, [e.target.name]: e.target.value})
    }

    const [searchParams] = useSearchParams();
    const squadId = searchParams.get("squad")
    const token = searchParams.get("inviteToken")
    const invitedBy = searchParams.get("invitedBy")
    const handleSubmit = (e) =>{
        e.preventDefault()
        input.squadId = squadId
        input.token = token
        input.invitedBy = invitedBy
        navigate("userAvatar", {state:{input}})
    }

    return (
        <section className='flex items-center flex-col md:mt-10 mt-10'>
            <div className="w-full p-6 md:w-1/3 flex items-center flex-col">
            <p className='text-5xl mb-2 font-bold text-purple-800 font-sourGummy'>MomenTom</p>
                <h1 className="font-semibold text-2xl mt-5 md:text-4xl">Register</h1>
                <p className="text-gray-500 text-sm md:text-xl">Create an account</p>
                <form onSubmit={handleSubmit} action="" className="mt-5">
                    <Input onChange={handleChange} name='firstName' placeholder='First Name' style=''/>
                    <Input onChange={handleChange} name='lastName' placeholder='Last Name' style=''/>
                    <Input onChange={handleChange} name='userName' placeholder='UserName' style=''/>
                    <Input onChange={handleChange} name='email' placeholder='Email' style=''/>
                    <Input onChange={handleChange} name='sex' placeholder='Sex' style=''/>
                    <Input onChange={handleChange} type="password" name='password' placeholder='Password' style=''/>
                    <Button type='submit' name='Sign up' style={'border !bg-[#B175FF] !py-4 mt-4 !rounded-full !w-full !flex !justify-center w-36 !text-white'}/>
                    </form>
            </div>
        </section>
    )
}

export default Register