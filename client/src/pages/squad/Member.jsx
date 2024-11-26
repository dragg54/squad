/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom"
import Image from "../../components/containers/Image"
import PostCard from "../../components/post/PostCard"
import { useQuery } from "react-query"
import { getUserById } from "../../services/user"
import { useState } from "react"
import { getPosts } from "../../services/post"
import { getUserGoals } from "../../services/goal"
import { useSelector } from "react-redux"
import Goal from "../goals/components/Goal"
import Pagination from "../../components/Pagination"
import { BACKEND_SERVER_URL } from "../../Appconfig"
import LoadingSpinner from "../../components/LoadingSpinner"
import { BiSolidCoinStack } from "react-icons/bi";
import Button from "../../components/buttons"
import { CgGift } from "react-icons/cg"
import BackButton from '../../components/buttons/BackButton'

const Member = () => {
  const { id } = useParams()
  const [groupBy, setGroupBy] = useState("")
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const [goalPage, setGoalPage] = useState(1);
  const [goalSize, setGoalSize] = useState(5);
  const user = useSelector(state => state.user)

  const [currentTab, setCurrentTab] = useState(1)
  const { data: member, isLoading: memberIsLoading } = useQuery(['member', id], () => getUserById(id))
  const { data: userGoals, isLoading: userGoalsIsLoading, isError: userGoalsIsError, refetch } = useQuery(
    ['memberGoals', { page: goalPage, size: goalSize, groupBy, partnerId: user.id , userId: id }],
    getUserGoals,
    // {
    //   keepPreviousData: true, 
    // }
  );

  const { data: postData, isLoading: postIsLoading } = useQuery(
    ['memberPosts', { page, size, groupBy, userId: id }],
    getPosts,
    {
      keepPreviousData: false,
    }
  );
  if(memberIsLoading){
    return <LoadingSpinner isLoading={true}/>
  }
  if (postIsLoading) return <>Post Loading ...</>
  return (
    <section className="w-full overflow-x-visible h-screen overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[20rem]">
      <div className="my-3">
      <BackButton className='mt-2'/>
      </div>
      <div className="w-full">
        <div className="w-full md:w-[60%] h-[200px]  bg-gradient-to-r from-[#8155BA] to-[#FE5BD6] ">
        </div>
       <div className="w-full flex justify-between  md:w-[60%] -mt-14">
          <div className=" p-4">
            <Image source={BACKEND_SERVER_URL + "/avatars/" + member.profileAvatar} style={'h-24 w-24 z-10 bg-white'} />
            <p className="mt-3 font-semibold">{member.firstName} {member.LastName}</p>
            <p className="mt-1 text-sm">@{member.userName}</p>
            <p className="text-gray-500 mt-1 md:text-base text-sm">A fun guy who loves to make people around me happy</p>
            <p className="mt-3 font-bold md:text-xl text-base inline-flex items-center"><BiSolidCoinStack /> 10 GP</p>
          </div>
          <div>
          {user.id == member.id ?<Button name='Edit Profile' style={'mt-28 md:mr-12 mr-2 md:!text-[0.8rem] md:!w-[120px] !text-[0.6rem] !w-[93px] !flex whitespace-none !bg-white !rounded-full border !border-gray-400 !text-gray-600'}/>
          :
          <div className="p-1 mt-28 md:mr-12 mr-2  md:p-2 bg-[#ffd898] rounded-full border border-gray-400 ml-auto mr-4 md:mr-8 text-2xl text-gray-700">
          <CgGift className=""/>
          </div>
}
        </div>
       </div>
        <div className=" my-3 mx-3"></div>
        <div className=" w-full p-3">
          <div className="w-1/2 mb-3 flex gap-3">
            <p className={`mb-3 font-semibold cursor-pointer ${currentTab == 1 && 'border-b-4 border-[#FF2511]'}`} onClick={() => setCurrentTab(1)}>Posts</p>
            <p className={`mb-3 font-semibold cursor-pointer ${currentTab == 2 && 'border-b-4 border-[#FF2511]'}`} onClick={() => setCurrentTab(2)}>Goals</p>
          </div>
          {currentTab == 1 ?
            <div className="w-full  md:w-[60%]">{
              postData && postData.data && postData.data.length > 0 ?
                postData.data.map((post) => (<PostCard post={post} key={post.id} />))
                :
                <p className="text-4xl text-gray-400 font-semibold mt-4">No Post Yet</p>
                }
                <Pagination
                       currentPage={page}
                       totalPages={postData?.totalPages}
                       onPageChange={setPage}
                    />
            </div> :
            <div className="w-full  md:w-[60%]">
              {userGoals && userGoals.data && userGoals.data.length > 0 ? 
               userGoals.data.map((goal)=>(
                <Goal goal={goal} key={goal.id} setIsUpdated={false}/>
               ))  :  <p className="text-4xl text-gray-400 font-semibold mt-4">No goal has been added yet</p>
            }
             <Pagination
                       currentPage={goalPage}
                       totalPages={userGoals?.totalPages}
                       onPageChange={setGoalPage}
                    />
            </div>
            }
        </div>
      </div>
    </section >
  )
}

export default Member