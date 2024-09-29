/* eslint-disable react/prop-types */
import Image from '../containers/Image'
import { IoIosHeartEmpty } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utils/DateFormatter';
import { capitalizeHeader } from '../../utils/CapitalizeHeader';
import { FaRegComment } from "react-icons/fa";
import { useQuery } from 'react-query';
import { getPostLikes } from '../../services/post';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PostCard = ({ post }) => {
    const user = useSelector(state => (state.user))
    const [like, setLike] = useState(post?.likes?.noOfLikes)
    const [isLiked, setIsliked] = useState(post?.likes?.likesUsers?.some(users => users.userId == user.id))
    return (
        <div className='w-full cursor-pointer md:w-full bg-white overflow-x-visible rounded-md border  border-gray-200 shadow-lg shadow-gray-200 md:min-h-[200px] min-h-[200px] mb-3 p-4'>
            <Link className="w-full" to={"/post/" + post.id}>
                <div className="flex justify-start items-center gap-4">
                    <Image source='' style='h-16 w-16' />
                    <div>
                        <p className='font-semibold text-black'>{capitalizeHeader(post.title)}</p>
                        <p className=''>By {post.user.userName}</p>
                        <p className='text-sm text-gray-500'>{formatDate(post.createdAt)}</p>
                    </div>
                </div>
                <div className='w-full mt-3'>
                    <p>{post.description}</p>
                </div>
            </Link>
            <div className='my-4  border w-full'></div>
            <div className='flex gap-5 w-full items-center'>
                <div className=' flex gap-2 items-center' onClick={() => {
                    setLike(like < 1 ? like + 1: like-1)
                    setIsliked(!isLiked)
                }}>
                    <div className=''>
                        <FontAwesomeIcon stroke={!isLiked && "gray"} strokeWidth={55} icon={faHeart} fill='white' style={{ color: isLiked ? "red": "white", fontSize: "20px" }} />
                    </div>
                    <p className='!text-gray-400'>{like || 0} Likes</p>
                </div>
                <div className='text-xl  text-gray-400 flex gap-2 items-center'>
                    <FaRegComment fill='gray' /> <span className='text-base'>10 Comments</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard