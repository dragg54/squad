import { useNavigate } from "react-router-dom"
import Button from "../../components/buttons"
import Image from "../../components/containers/Image"
import Navbar from "../../components/layouts/Navbar"

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <section>
            <Navbar />
            <div className="w-screen h-screen flex flex-col items-center justify-center">
                <p className="text-[10rem] font-extrabold inline-flex items-center">4<Image source='/images/notfound.png' style='h-[150px] w-[150px] !border-none'/>4</p>
                <p className="-mt-4">Nothing to see here, really!</p>
                <div className="mt-4">
                    <Button name='Back to home page' style={'!bg-re'} onClick={()=>navigate("/")}/>
                </div>
            </div>
        </section>
    )
}

export default NotFound