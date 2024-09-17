import AddButton from "../../components/buttons/AddButton"
import PostCard from "../../components/containers/PostCard"
import { useDispatch } from "react-redux"
import { openModal } from "../../redux/reducers/GlobalModalReducer"
import AddPost from "./AddPost"
import { useQuery } from "react-query"
import { useState } from "react"
import { getPosts } from "../../services/post"

const Post = () => {
  const dispatch = useDispatch()
  const [groupBy, setGroupBy] = useState("")
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const { data, isLoading, isError, refetch } = useQuery(
    ['posts', { page, size, groupBy }],
    getPosts,
    // {
    //   keepPreviousData: true, 
    // }
  );
  console.log(data)
  if(isLoading)<p>Loading...</p>
  return (
    <section className="w-full overflow-x-visible h-screen overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[28rem]">
      <div className="flex w-full md:w-[60%] justify-between items-center mb-8">
        <div className="">
          <h1 className="font-semibold md:text-2xl">Explore Posts</h1>
          <p className="text-sm text-gray-500 ">See what others are saying</p>
        </div>
        <div className="">
          <AddButton
            name="Create Post"
            style='border border-purple-700 !bg-white !text-purple-700'
            onClick={() => dispatch(openModal(<AddPost />))} />
        </div>
      </div>
      <div className="w-full md:w-[60%]">
        {
          data && data.rows && data.rows.map(post =>(
            <PostCard key={post.id} {...{post}}/>
          ))
        }
      </div>
    </section>
  )
}

export default Post