/* eslint-disable react/prop-types */
import Image from '../containers/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '../../utils/DateFormatter'
import { FaRegComment } from "react-icons/fa";

const PostContainer = ({ isParent, data }) => {
  return (
    <div className={`${isParent ? 'w-full' : 'w-[95%] self-end'} border border-gray-300 p-4 shadow-md shadow-gray-300 rounded-md h-auto`}>
      <div className="flex justify-start items-center gap-4">
        <Image source='' style='h-16 w-16' />
        <div>
          <p className={`font-semibold text-black text-xl md:text-2xl ${isParent ? 'block' : 'hidden'}`}>{data?.title}</p>
          <p className=''>By {data?.user?.userName}</p>
          <p className='text-sm text-gray-500'>{formatDate(data?.createdAt)}</p>
        </div>
      </div>
      <div className='w-full mt-3'>
        <p>
          {data?.description}
        </p>
      </div>
      <div className='flex mt-4 gap-3'>
        <div className=' flex gap-2 items-center'>
          <FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: "20px" }} />
          <p className='!text-gray-400'>200 Likes</p>
        </div>
        <div className='flex gap-1 items-center'>
        <FaRegComment className='text-gray-400 text-[20px]'/>
        <p className='!text-gray-400  whitespace-nowrap'>10 Comments</p>
        </div>
      </div>
      {/* {isParent ? <div className='w-full p-3 rounded-md bg-gray-300 mt-4 text-gray-700 font-semibold'>View all comments</div>: ''} */}
    </div>
  )
}

export default PostContainer