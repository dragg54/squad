/* eslint-disable react/prop-types */
import { FaUser } from "react-icons/fa";

const Image = ({source, style, isUser}) => {
  return (
    <div className={`rounded-full flex justify-center ${!source && isUser && 'bg-gray-200'} items-center text-gray-500 text-sm overflow-hidden border border-gray-300 object-contain ${style}`}>
        {(isUser && !source) ? <FaUser className="w-full h-full mt-3"/>: <img className='full' src={source} alt='Img'/>}
    </div>
  )
}

export default Image