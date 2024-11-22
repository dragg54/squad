import { useNavigate } from "react-router-dom"
import { IoArrowBackSharp } from "react-icons/io5";

const BackButton = () => {
    const navigate = useNavigate()
  return (
    <div className="flex cursor-pointer items-center text-sm gap-2 mb-4 text-gray-600" onClick={()=>navigate(-1)}>
        <div className="rounded-full p-2 bg-gray-200">
        <IoArrowBackSharp />
        </div>
       GO BACK
    </div>
  )
}

export default BackButton