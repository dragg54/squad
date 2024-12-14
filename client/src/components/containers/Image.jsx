/* eslint-disable react/prop-types */
import { FaUser } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Image = ({
  source,
  style,
  isUser,
  hasNavigated,
  userId
}) => {
  const navigate = useNavigate()
  return (
    <div onClick={(e) => {
      if (isUser && !hasNavigated) {
        e.stopPropagation()
        navigate(`/member/${userId}`)
      }
    }} className={`${isUser && 'cursor-pointer rounded-full'} flex justify-center ${!source && isUser && 'bg-gray-200'} items-center text-gray-300 text-sm overflow-hidden border border-gray-300 object-contain ${style}`}>
      {(isUser && (!source?.split('/avatars/')[1] || !source?.split('/avatars/')[1] == undefined)) ? <FaUser className="w-full h-full mt-3" /> :
        (isUser && !source?.split('/avatars/')[1]) ? <FaRegImage className="w-full h-full mt-3" /> : <img className='full' src={source} alt='Img' />}
    </div>
  )
}

export default Image