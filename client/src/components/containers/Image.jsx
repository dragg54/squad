/* eslint-disable react/prop-types */
import { FaUser } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";

const Image = ({source, style, isUser}) => {
  return (
    <div className={`rounded-full flex justify-center ${!source && isUser && 'bg-gray-200'} items-center text-gray-300 text-sm overflow-hidden border border-gray-300 object-contain ${style}`}>
        {(isUser && (!source.split('/avatars/')[1] || !source.split('/avatars/')[1]==undefined)) ? <FaUser className="w-full h-full mt-3"/>:
        (isUser && !source.split('/avatars/')[1]) ? <FaRegImage  className="w-full h-full mt-3"/>: <img className='full' src={source} alt='Img'/>}
    </div>
  )
}

export default Image