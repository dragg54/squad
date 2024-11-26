import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BACKEND_SERVER_URL } from "../../Appconfig";
import { formatDate } from "../../utils/DateFormatter";
import Image from "../containers/Image";
import { FaRegComment } from "react-icons/fa";
import CommentField from "../../pages/post/CommentField";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

/* eslint-disable react/prop-types */
const Comment = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <div className="md:w-[95%] w-[95%] self-end mt-2 flex flex-col items-center border border-gray-100 border-r-gray-200 border-l-gray-300">
      {comments.data.map((comment) => (
        <div key={comment.id} className={`w-full mt-2  p-4 rounded-md h-auto`}>
          {console.log(comment,"commddkdk")}
          <div className="flex justify-start items-center gap-4">
            <Image isUser={true} source={BACKEND_SERVER_URL + "/avatars/" + comment?.user?.profileAvatar} style='h-16 w-16' />
            <div>
              <p className=''>By {comment?.user?.userName}</p>
              <p className='text-sm text-gray-500'>{formatDate(comment?.createdAt)}</p>
            </div>
          </div>
          <div className='w-full mt-3'>
            <p>
              {comment?.description || comment?.content}
            </p>
          </div>
          <div className='flex mt-4 gap-3 w-full'>
            <div className=' flex gap-2 items-center'>
              <FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: "20px" }} />
              <p className='!text-gray-400'>{comment?.likes?.noOfLikes}</p>
            </div>
            <div className='flex gap-1 items-center cursor-pointer' onClick={() => {
              // setShowCommentField(true)
              //  setCommentState({ ...commentState, [data.id]: true })
            }}>
              <FaRegComment className='text-gray-400 text-[20px]' />
              <p className='!text-gray-400  whitespace-nowrap'>{comment?.children?.total}</p>
            </div>
          </div>
          {/* {comm.comments && <CommentField isChild={!isParent} {...{ commentState, data, setCommentState }} />} */}
          {comment.children && comment.children.data.length > 0 && (
            <div className="w-full">
              <Comment comments={comment.children} />
            </div>
          )
          }
        </div>)
      )
      }
    </div>
  )
}


export default Comment;
