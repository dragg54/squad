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


const PostCard = ({ post }) => {
    // const {data: likes, isLoading} = useQuery("postLikes",{
    //     queryFn: getPostLikes
    // })
    // if(!isLoading){
    //     console.log(likes)
    // }
    return (
        <div className='w-full cursor-pointer md:w-full bg-white overflow-x-visible rounded-md border  border-gray-200 shadow-lg shadow-gray-200 md:min-h-[200px] min-h-[200px] mb-3 p-4'>
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
            <div className='my-4  border w-full'></div>
            <div className='flex gap-5 w-full items-center'>
                <div className=' flex gap-2 items-center'>
                    <FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: "20px" }} />
                    <p className='!text-gray-400'>{post.noOfLikes} Likes</p>
                </div>
                <div className='text-xl  text-gray-400 flex gap-2 items-center'>
                    <FaRegComment fill='gray' /> <span className='text-base'>10 Comments</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard