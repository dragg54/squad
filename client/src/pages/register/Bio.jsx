import { useLocation, useNavigate } from "react-router-dom"
import Button from "../../components/buttons"
import BackButton from "../../components/buttons/BackButton"
import Input from "../../components/inputs"
import { useState } from "react"

const Bio = () => {
    const navigate = useNavigate()
    const [bio, setBio ] = useState("")
    const userProfileState = useLocation().state
    function handleChangeBio(e){
        setBio(e.target.value)
    }
    return (
        <div className='w-full flex flex-col items-center justify-center p-3 h-screen'>
            <div className="md:w-1/3 w-[90%] md:mt-0 -mt-20">
                <BackButton />
                <h1 className="text-2xl !text-purple-600 font-extrabold">{"User's"} Bio</h1>
                <small className=" text-gray-400">Describe yourself</small>
                <form action="" className='w-full mt-6 rounded-md'>
                    <Input maxLength={65} onChange={(e)=>handleChangeBio(e)} type="text-area" placeholder="Say something about yourself" style='text-2xl !w-full border border-gray-200'/>
                    <div className=" mt-4 flex items-center gap-2">
                    <Button type={'button'} onClick={() => navigate("/register/userAvatar", { state: {input:{...userProfileState.input, bio}}})} name='Skip' style={'!border w-32 !border-purple-500 !rounded-full !bg-purple-700 !text-white hover:!bg-purple-400 hover:border-2'} />
                    <Button onClick={()=>{
                        navigate("/register/userAvatar", {
                            state: {input:{...userProfileState.input, bio}}
                        })
                    }} style={'!rounded-full  !bg-white border !border-purple-700 !text-purple-700'} name="Continue"/>
                    </div>
                   </form>
            </div>
        </div>
    )
}

export default Bio