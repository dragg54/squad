/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import AddButton from "../../components/buttons/AddButton"
import { useDispatch } from "react-redux"
import { openModal } from "../../redux/reducers/GlobalModalReducer"
import AddPost from "./AddPost"
import { useQuery } from "react-query"
import { useState } from "react"
import { getPosts } from "../../services/post"
import Pagination from "../../components/Pagination"
import PostCard from "../../components/post/PostCard"

// eslint-disable-next-line react/prop-types
const Forum = ({ newPosts }) => {
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
  if (isLoading) <p>Loading...</p>
  return (
    <section className="w-full overflow-x-visible h-screen overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[20rem]">
      <div className="flex w-full md:w-[60%] justify-between items-center mb-8">
        <div className="">
          <h1 className="font-semibold md:text-2xl">Explore Posts</h1>
          <p className="text-sm text-gray-500 ">See what others are saying</p>
        </div>
        <div className="">
          <AddButton
            name="Create Post"
            style='border border-purple-700 !bg-white !text-purple-700'
            onClick={() => dispatch(openModal({component: <AddPost {...{ page, size }} />}))} />
        </div>
      </div>
      <div className="w-full md:w-[60%]">
        {
          data && data.data && data.data.map(post => (
            <div key={post.id}>
              <PostCard {...{ post }} />
            </div>
          ))
      
        }
      </div>
      <Pagination
        currentPage={page}
        totalPages={data?.totalPages}
        onPageChange={setPage}
      />
    </section>
  )
}

export default Forum