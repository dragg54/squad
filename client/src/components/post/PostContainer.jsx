/* eslint-disable react/prop-types */
import Image from '../containers/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '../../utils/DateFormatter'
import { FaRegComment } from "react-icons/fa";
import { BACKEND_SERVER_URL } from '../../Appconfig';
import CommentField from '../../pages/post/CommentField';

const PostContainer = ({ isParent, data, commentState, setCommentState, }) => {
  return (
    <div className={`${isParent ? 'w-full' : 'w-[95%] self-end'} border border-gray-300 p-4 shadow-md shadow-gray-300 rounded-md h-auto`}>
      <div className="flex justify-start items-center gap-4">
        <Image isUser={true} source={BACKEND_SERVER_URL + "/avatars/" + data?.user?.profileAvatar} style='h-16 w-16' />
        <div>
          <p className={`font-semibold text-black text-xl md:text-2xl ${isParent ? 'block' : 'hidden'}`}>{data?.title}</p>
          <p className=''>By {data?.user?.userName}</p>
          <p className='text-sm text-gray-500'>{formatDate(data?.createdAt)}</p>
        </div>
      </div>
      <div className='w-full mt-3'>
        <p>
          {data?.description || data?.content}
        </p>
      </div>
      <div className='flex mt-4 gap-3'>
        <div className=' flex gap-2 items-center'>
          <FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: "20px" }} />
          <p className='!text-gray-400'>{data?.likes?.noOfLikes || 0}</p>
        </div>
        <div className='flex gap-1 items-center cursor-pointer' onClick={() => {
          // setShowCommentField(true)
          setCommentState({ ...commentState, [data.id]: true })
        }}>
          <FaRegComment className='text-gray-400 text-[20px]' />
          <p className='!text-gray-400  whitespace-nowrap'>{data?.comments?.noOfComments || 0}</p>
        </div>
      </div>
      <CommentField isChild={!isParent} {...{ commentState, data, setCommentState }} />
    </div>
  )
}

export default PostContainer



