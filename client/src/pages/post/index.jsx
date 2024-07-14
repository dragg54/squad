import CreatePost from "../../components/buttons/CreatePostButton"
import PostCard from "../../components/containers/PostCard"

const Goals = () => {
  return (
    <section className="p-6 px-3 h-screen overflow-y-scroll pb-40 ">
      <div className="flex justify-between items-center mb-8">
        <div className="">
          <h1 className="font-semibold">Explore Posts</h1>
          <p className="text-sm text-gray-500 ">See what others are saying</p>
        </div>
        <div>
          <CreatePost />
        </div>
      </div>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </section>
  )
}

export default Goals