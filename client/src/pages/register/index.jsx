import Input from '../../components/inputs/index'
import Button from '../../components/buttons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import Logo from '../../components/logo'
import { validateForm } from '../../utils/ValidateInput'
import NotFound from '../notFound'


const Register = () => {
    const navigate = useNavigate()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [input, setInput] = useState({
        squadId: "",
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        birthday: "",
        password: ""
    })

    const [error, setError] = useState({
    })

    const validationRules = {
        textValidation: {
            firstName: value => value?.length,
            lastName: value => value?.length,
            userName: value => value?.length,
            email: value => value?.length,
            birthday: value => Number(value.substring(1, 2)) <= 31 && Number(value.substring(4, 5)) <= 12,
            password: value => value?.length >= 8
        },
    };

    const inputValueValidationRules = {
        firstName: { minLength: 2, noWhiteSpace: true, maxLength: 20 },
        lastName: { minLength: 2, noWhiteSpace: true, maxLength: 20 },
        password: { isPassword: true },
        email: { isEmail: true },
        birthday: { isDDMMDate: true }
    }

    const isNumberString = (value) => {
        return (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].some(x => x.toString() == value))
    }

    const handleChange = (e) => {
        if (e.target.name == "birthday") {

            if ((e.target.value.length > (input['birthday']).length)
                && ((isNumberString(e.target.value[e.target.value.length - 1])) || !e.target.value.length)
            ) {
                setInput({ ...input, [e.target.name]: e.target.value })
            }
            if (((e.target.value.length < input[e.target.name].length) &&
                (input[e.target.name].length == 1 || isNumberString(e.target.value[0])))) {
                setInput({ ...input, [e.target.name]: e.target.value })
            }
            if (e.target.value.length == 2 && input.birthday.length == 1
            ) {
                e.target.value = e.target.value + "/"
                setInput({ ...input, [e.target.name]: e.target.value })
            }
        }
        else if (e.target.name != "birthday") {
            setInput({ ...input, [e.target.name]: e.target.value })
        }
    }

    const [searchParams] = useSearchParams();
    const squadId = searchParams.get("squad")
    const token = searchParams.get("inviteToken")
    const invitedBy = searchParams.get("invitedBy")

    if(!token){
        return <NotFound />
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationResult = validateForm(input, inputValueValidationRules)
        if (validationResult.hasErrors) {
            setError(validationResult.errors);
        }
        else {
            if (!buttonDisabled) {
                input.squadId = squadId
                input.token = token
                input.invitedBy = invitedBy
                navigate("bio", { state: { input } })
            }
        }

    }
    return (
        <section className='flex items-center flex-col md:mt-10 mt-2'>
            <div className="w-full p-6 md:w-1/3 flex items-center flex-col">
                <div className='flex flex-col gap-1 items-center'>
                    <div className='w-20 h-20'><Logo /></div>
                    <p className='text-5xl mb-2 font-bold text-purple-800 font-sourGummy'>MomenTom</p>
                </div>
                <h1 className="font-semibold text-2xl mt-2 md:mt-5 md:text-4xl">Register</h1>
                <p className="text-gray-500 text-sm md:text-xl">Create an account</p>
                <form onSubmit={handleSubmit} action="" className="mt-5 w-full">
                    <div className='w-full'>
                        <Input value={input.firstName} onChange={handleChange} name='firstName' placeholder='First Name' style='' />
                        <small className='mb-1 text-red-400'>{error['firstName']}</small>
                    </div>
                    <div className='w-full'>
                        <Input value={input.lastName} onChange={handleChange} name='lastName' placeholder='Last Name' style='' />
                        <small className='mb-1 text-red-400'>{error['lastName']}</small>
                    </div>
                    <div className='w-full'>
                        <Input value={input.userName} onChange={handleChange} name='userName' placeholder='UserName' style='' />
                        <small className='mb-1 text-red-400'>{error['userName']}</small>
                    </div>
                    <div className='w-full'>
                        <Input value={input.email} onChange={handleChange} name='email' placeholder='Email' style='' />
                        <small className='mb-1 text-red-400'>{error['email']}</small>
                    </div>
                    <div className='w-full'>
                        <Input maxLength={5} value={input.birthday} onChange={handleChange} name='birthday' placeholder='Birthday DD/MM' style='' />
                        <small className='mb-1 text-red-400'>{error['birthday']}</small>
                    </div>
                    <div className='w-full'>
                        <Input onChange={handleChange} type="password" name='password' placeholder='Password' style='' />
                        <small className='mb-1 text-red-400'>{error['password']}</small>
                    </div>
                    <Button validationRules={validationRules}
                        buttonDisabled={buttonDisabled}
                        inputValues={input}
                        setButtonDisabled={setButtonDisabled} type='submit' name='Sign up' style={'border !bg-[#B175FF] !py-4 mt-4 !rounded-full !w-full !flex !justify-center w-36 !text-white'} />
                </form>
            </div>
        </section>
    )
}

export default Register