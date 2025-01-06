import Button from "../../components/buttons"
import Image from "../../components/containers/Image"
import { useMutation } from "react-query"
import { sendVerificationMail } from "../../services/user"
import { useDispatch, useSelector } from "react-redux"
import { openPopup } from "../../redux/reducers/PopUpReducer"
import { useLocation } from "react-router-dom"

const CheckMail = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const sendMailMutation = useMutation(sendVerificationMail,
        {
            onSuccess: (res) => dispatch(openPopup({message: res.message})),
            onError: (err) => dispatch(openPopup({message: err.message}))
        }
    )
    const state = useLocation().state


    const handleSendEmail = () =>{
        sendMailMutation.mutate({email: user.email || state?.email})
    }
    return (
        <div className='w-full pt-40 flex flex-col items-center justify-start p-3 h-screen'>
            <div className="w-40 h-40 rounded-full p-4 bg-[#b175ff] border-none">
                <Image source={'images/email.png'} style={'!border-none'} />
            </div>
            <p className="mt-6 text-3xl font-semibold">Check your inbox, please!</p>
            <div className="flex text-xs md:text-base flex-col items-center w-[400px] md:w-[600px]">
                <p className="text-gray-700 mt-6 text-center  flex justify-center">Hey <span className="font-bold ml-1"> {state.username}</span>, to complete your registration, we need to verify your email.</p>
                <p className={'inline-flex justify-center w-full text-center'}> {"We've"} sent a verification link to
                    your email. Please check and confirm {"it's"} really you.</p>
            </div>
            <Button style={'mt-12 !rounded-full !bg-[#b175ff] hover:!bg-purple-700'} name={'Resend'} onClick={()=> handleSendEmail()}/>
        </div>
    )
}

export default CheckMail