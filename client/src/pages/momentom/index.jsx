import { useNavigate } from "react-router-dom"

const Momentom = () => {
    const navigate = useNavigate()
    setTimeout(()=>{
        navigate("/home")
    },[3000])
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <p className="font-sourGummy !text-purple-900 font-semibold text-6xl -mt-10">MomenTom</p>
        </div>
    )
}

export default Momentom