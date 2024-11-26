/* eslint-disable react/prop-types */
import Image from '../containers/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utils/DateFormatter';
import { capitalizeHeader } from '../../utils/CapitalizeHeader';
import { FaRegComment } from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { likePost } from '../../services/post';
import { socket } from '../../utils/Socket';
import { BACKEND_SERVER_URL } from '../../Appconfig';

const PostCard = ({ post }) => {
    const user = useSelector(state => (state.user))
    const [like, setLike] = useState(post?.likes?.noOfLikes)
    const [isLiked, setIsliked] = useState(post?.likes?.likesUsers?.some(users => (users.userId == user.id)))
    const likePostMutation = useMutation(likePost)
    const handleLikePost = () =>{
           likePostMutation.mutate({postId: post.id})
    }
    return (
        <div className='w-full cursor-pointer md:w-full bg-white overflow-x-visible rounded-md border  border-gray-200 shadow-lg shadow-gray-200 md:min-h-[200px] min-h-[200px] mb-3 p-4'>
            <Link className="w-full" to={"/post/" + post?.id}>
                <div className="flex justify-start items-center gap-4">
                    <Image isUser={true} source={BACKEND_SERVER_URL+"/avatars/"+ post?.user?.profileAvatar} style='h-16 w-16' />
                    <div>
                        <p className='font-semibold text-black'>{post && capitalizeHeader(post?.title)}</p>
                        <p className=''>By {post?.user.userName}</p>
                        <p className='text-sm text-gray-500'>{formatDate(post?.createdAt)}</p>
                    </div>
                </div>
                <div className='w-full mt-3'>
                    <p>{post?.description}</p>
                </div>
            </Link>
            <div className='my-4  border w-full'></div>
            <div className='flex gap-5 w-full items-center'>
                <div className=' flex gap-2 items-center' onClick={() => {
                    setLike(!isLiked ? Number(like) + 1: Number(like)-1)
                    setIsliked(!isLiked)
                    handleLikePost()
                    socket.emit('postLiked',{authorId: post.userId, senderId: user.id}, "Post Liked");
                    // dispatch(addNotification())
                    
                }}>
                        <FontAwesomeIcon stroke={!isLiked && "gray"} strokeWidth={55} icon={faHeart} fill='white' style={{ color: isLiked ? "red": "white", fontSize: "20px" }} />
                    <p className='!text-gray-400'>{like || 0}</p>
                </div>
                <div className='text-xl  text-gray-400 flex gap-2 items-center' >
                    <FaRegComment fill='gray' /> <span className='text-base'>{post?.comments.noOfComments}</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard