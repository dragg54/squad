import Input from '../../components/inputs/index'
import Button from '../../components/buttons'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    return (
        <section>
            <div className="w-full p-6 relative h-screen">
                <h1 className="font-semibold text-xl mt-5">Login</h1>
                <p className="text-gray-500 text-sm">Sign in to your account</p>
                <form action="" className="mt-5 w-full  h-3/5 relative flex-col items-center">
                    <Input name='email' placeholder='Email' style='' />
                    <Input name='password' placeholder='Password' style='!mt-6' />
                    <Button onClick={() => navigate("/")} name='Sign in' style={'border left-0 !bg-[#B175FF] mx-auto absolute bottom-20 !py-4 mt-20 !w-full !flex !justify-center w-36 !text-white'} />
                </form>
                <p className='-mt-16'>{"Don't"} have an account? <span className='text-[#B175FF] cursor-pointer' onClick={()=> navigate("/register")}> Sign up here</span></p>
            </div>
        </section>
    )
}

export default Login