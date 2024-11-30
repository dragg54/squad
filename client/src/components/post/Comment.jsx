import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BACKEND_SERVER_URL } from "../../Appconfig";
import { formatDate } from "../../utils/DateFormatter";
import Image from "../containers/Image";
import { FaRegComment } from "react-icons/fa";
import CommentField from "../../pages/post/CommentField";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useMutation } from "react-query";
import { likeComment } from "../../services/comment";

/* eslint-disable react/prop-types */
const Comment = ({ comments }) => {
 const likeMutation = useMutation(likeComment, {
  onSuccess:(res)=> console.log(res),
  onError:(err)=> console.log(err)
 })
  const user = useSelector(state => state.user)
  const [likesState, setLikesState] = useState(
    comments?.data.reduce((acc, comment) => {
      acc[comment.id] = comment.likes?.likesUsers?.some(
        (likeUser) => likeUser.userId === user.id
      );
      return acc;
    }, {})
  );
  const [showCommentBox, setShowCommentBox] = useState(
    comments?.data.reduce((acc, comment) => {
      acc[comment.id] = false;
      return acc;
    }, {})
  );
  const [likesCount, setLikesCount] = useState(
    comments?.data.reduce((acc, comment) => {
      acc[comment.id] = comment.likes?.noOfLikes || 0;
      return acc;
    }, {})
  ); if (!comments || comments.length === 0) {
    return null;
  }
  const handleLikeToggle = (commentId) => {
    setLikesState((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
    setLikesCount((prev) => ({
      ...prev,
      [commentId]: prev[commentId] + (likesState[commentId] ? -1 : 1),
    }));

    likeMutation.mutate({commentId, userId: user.id})

  }
  const toggleCommentBox = (commentId) => {
    console.log("yesss")
    setShowCommentBox((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

    return (
      <div className="md:w-[95%] w-[95%] self-end mt-2 flex flex-col items-center border border-gray-100 border-r-gray-200 border-l-gray-300">
        {comments.data.map((comment) => {
          const isLiked = likesState[comment.id];
          const likeCount = likesCount[comment.id]; 
          const isCommentBoxVisible = showCommentBox[comment.id];
          return (
            <div key={comment.id} className={`w-full mt-2  p-4 rounded-md h-auto`}>
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
                <div className=' flex gap-2 items-center cursor-pointer'>
                  <FontAwesomeIcon onClick={() => handleLikeToggle(comment.id)} strokeWidth={55} fill='white'
                    stroke={!isLiked && 'gray'}
                    icon={faHeart} style={{ color: isLiked ? "red" : "white", fontSize: "20px" }} />
                  <p className='!text-gray-400'>{likeCount}</p>
                </div>
                <div className='flex gap-1 items-center cursor-pointer' 
                                 onClick={() => toggleCommentBox(comment.id)}

                >
                  <FaRegComment className='text-gray-400 text-[20px]' />
                  <p className='!text-gray-400  whitespace-nowrap'>{comment?.children?.total}</p>
                </div>
              </div>
              {isCommentBoxVisible && (
              <div className="mt-4 ">
                <CommentField
                  parentId={comment.id}
                  isChild={true}
                  toggleCommentBox={toggleCommentBox}
                  commentParentId={comment.id}
                  
                /> 
              </div>
            )}              {comment.children && comment.children.data.length > 0 && (
                <div className="w-full">
                  <Comment comments={comment.children} />
                </div>
              )
              }
            </div>)
        })
        }
      </div>
    )
  }
  export default Comment;


