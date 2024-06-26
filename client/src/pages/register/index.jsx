import Input from '../../components/inputs/index'
import Button from '../../components/buttons'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    return (
        <section>
            <div className="w-full p-6">
                <h1 className="font-semibold text-xl mt-5">Register</h1>
                <p className="text-gray-500 text-sm">Create an account</p>
                <form action="" className="mt-5">
                    <Input name='firstName' placeholder='First Name' style=''/>
                    <Input name='lastName' placeholder='Last Name' style=''/>
                    <Input name='userName' placeholder='UserName' style=''/>
                    <Input name='email' placeholder='Email' style=''/>
                    <Input name='sex' placeholder='Sex' style=''/>
                    <Input name='password' placeholder='Password' style=''/>
                    <Button  name='Sign in' style={'border !bg-[#B175FF] !py-4 mt-20 !w-full !flex !justify-center w-36 !text-white'}/>
                    </form>
                    <p className='mt-3'>Already have an account? <span className='text-[#B175FF] mt-4 cursor-pointer' onClick={()=> navigate("/register")}> Sign in here</span></p>
            </div>
        </section>
    )
}

export default Register