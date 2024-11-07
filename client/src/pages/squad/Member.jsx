/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom"
import Image from "../../components/containers/Image"
import PostCard from "../../components/post/PostCard"
import { useQuery } from "react-query"
import { getUserById } from "../../services/user"
import { useState } from "react"
import { getPosts } from "../../services/post"

const Member = () => {
  const {id} = useParams()
  const [groupBy, setGroupBy] = useState("")
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const {data: member, isLoading: memberIsLoading} = useQuery(['member', id], () => getUserById(id))
  const { data: postData, isLoading: postIsLoading } = useQuery(
    ['memberPosts', { page, size, groupBy, userId: id }],
    getPosts,
    {
      keepPreviousData: false, 
    }
  );
  if(memberIsLoading) return <>Loading...</> 
  if(postIsLoading) return <>Post Loading ...</>
  return (
    <section className="w-full overflow-x-visible h-screen overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[20rem]">  
      <div className="w-full">
        <div className="w-full md:w-[60%] h-[200px]  bg-gradient-to-r from-[#8155BA] to-[#FE5BD6] ">
        </div>
        <div className="-mt-14 p-4">
          <Image source={''} style={'h-24 w-24 z-10 bg-white'} />
          <p className="mt-3 font-semibold">{member.firstName} {member.LastName}</p>
          <p className="mt-1 text-sm">@{member.userName}</p>
          <p className="text-gray-500 mt-1">A fun guy who loves to make people around me happy</p>
        </div>
        <div className=" my-3 mx-3"></div>
        <div className=" w-full p-3">
          <div className="w-1/2 mb-3 flex gap-3">
            <p className="mb-3 font-semibold border-b-4 border-[#FF2511]">Posts</p>
            <p className="mb-3 font-semibold">Goals</p>
          </div>
          <div className="w-full md:w-[60%]">
          {
            postData.data  && postData.data.length > 0?
            postData.data.map((post)=>(<PostCard post={post} key={post.id}/>))
            : <div>
              <p className="text-4xl text-gray-400 font-semibold mt-4">No Post Yet</p>
            </div>
          }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Member