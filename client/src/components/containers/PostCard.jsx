/* eslint-disable react/prop-types */
import Image from './Image'
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineComment } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart  } from '@fortawesome/free-solid-svg-icons';


const PostCard = ({post}) => {
    return (
        <div className='w-full md:w-full bg-white overflow-x-visible rounded-md border  border-gray-200 shadow-lg shadow-gray-500 h-[260px] mb-3 p-4'>
            <div className="flex justify-start items-center gap-4">
                <Image source='' style='h-16 w-16' />
                <div>
                    <p className='font-semibold'>Mike Oliver</p>
                    <p className='text-sm text-gray-500'>10 Mar, 2024</p>
                </div>
            </div>
            <div className='w-full mt-3'>
                <p className='!text-gray-600'>
                    I think I need to have a good sleep for the month of July
                </p>
            </div>
            <div className='flex justify-between w-full items-center'>
            <div className='mt-4 flex gap-2 items-center'>
                <FontAwesomeIcon icon={faHeart} style={{color: "red", fontSize: "20px"}}/>
                <p className='!text-gray-400'>200 Likes</p>
            </div>
                <p className='!text-gray-400  whitespace-nowrap'>10 Comments</p>
            </div>
            <div className='mt-2 mb-5 border w-full'></div>
            <div className='flex items-center gap-6'>
                <div className='text-2xl flex gap-2 items-center'>
                    <IoIosHeartEmpty fill='red' /> <span className='text-base'>Like</span>
                </div>
                <div className='text-2xl flex gap-2 items-center'>
                    <MdOutlineComment fill='gray' /> <span className='text-base'>Comment</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard