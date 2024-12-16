import { useNavigate } from "react-router-dom"
import Logo from "../../components/logo"

const Momentom = () => {
    const navigate = useNavigate()
    setTimeout(()=>{
        navigate("/home")
    },[3000])
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className="w-16 h-16 mr-1">
                <Logo />
            </div>
            <div>
            {/* <p className="font-sourGummy !text-purple-900 font-semibold text-6xl">MomenTom</p> */}
            </div>
        </div>
    )
}

export default Momentom