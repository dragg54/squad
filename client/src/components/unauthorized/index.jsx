import { BiErrorCircle } from "react-icons/bi"

const Unauthorized = () => {
  return (
    <div className="w-[250px] h-[250px] bg-white shadow-sm rounded-md flex justify-center gap-2 items-center flex-col shadow-gray-200 p-3 border border-gray-200">
                    <BiErrorCircle className="text-3xl text-red-500" />
                    <p className="text-xl font-semibold">Unauthorized</p>
        <p className="text-sm text-gray-500">You are not authorized to perform this request. Please inform your admin</p>
    </div>
  )
}

export default Unauthorized