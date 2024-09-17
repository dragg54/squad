import Image from "../../components/containers/Image"
import PostCard from "../../components/containers/PostCard"

const Member = () => {
  return (
    <section className="w-full overflow-x-visible h-screen overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[28rem]">  
      <div className="w-full">
        <div className="w-full md:w-[60%] h-[200px]  bg-gradient-to-r from-[#8155BA] to-[#FE5BD6] ">
        </div>
        <div className="-mt-14 p-4">
          <Image source={''} style={'h-24 w-24 z-10 bg-white'} />
          <p className="mt-3 font-semibold">Mike Oliver</p>
          <p className="mt-1 text-sm">@Oliver_120</p>
          <p className="text-gray-500 mt-1">A fun guy who loves to make people around me happy</p>
        </div>
        <div className=" my-3 mx-3"></div>
        <div className=" w-full p-3">
          <div className="w-1/2 mb-3 flex gap-3">
            <p className="mb-3 font-semibold border-b-4 border-[#FF2511]">Posts</p>
            <p className="mb-3 font-semibold">Goals</p>
          </div>
          <div className="w-full md:w-[60%]">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Member