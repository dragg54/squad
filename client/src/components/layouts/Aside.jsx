import { useQuery } from "react-query"
import { useIgnoreMatchedPath } from "../../hooks/useIgnoreMatchPath"
import { getAllUsers } from "../../services/user"
import Button from "../buttons"
import Image from "../containers/Image"
import LoadingSpinner from "../LoadingSpinner"
import { BACKEND_SERVER_URL } from "../../Appconfig"
import { getPosts } from "../../services/post"

const Aside = () => {
    const { data: members, isLoading } = useQuery(['latestMembers', {limit: 3}],
        getAllUsers
    )
    const { data: latestPosts, isLoading: postIsLoading } = useQuery(
        ['lastestPosts', { size: 3 }],
        getPosts,
        // {
        //   keepPreviousData: true, 
        // }
      );
    if(!useIgnoreMatchedPath())
    if(isLoading){
        console.log('Loading...')
        // return <LoadingSpinner style={'md:w-[300px]'} isLoading={isLoading}/>
    }
    if(postIsLoading){
        console.log("post is loading")
    }
    return (
        <div className='hidden md:flex right-1 -z-50 absolute flex-col w-[300px]  h-screen shadow-l shadow-md shadow-gray-400 justify-start p-8 px-5'>
            <div>
                <h1 className="font-bold text-xl w-full p-2 shadow-sm rounded-sm !text-gray-400">Latest Members</h1>
                {isLoading ? <LoadingSpinner style={'!h-40 !mb-4'} isLoading={isLoading}/> :
                <ul className="mt-4 text-sm">
                   {
                    members && members.map((user)=>(
                        <li key={user.id} className="flex gap-2 items-center">
                        <Image isUser={true} source={BACKEND_SERVER_URL+"/avatars/"+user.profileAvatar} style="rounded-full h-14 w-14"/>
                        Kelvin Joe
                    </li>
                    ))
                   }
                </ul>}
                <Button name='Load More' style='!bg-white !border-purple'/>
            </div>
            <div className="text-sm flex-col gap-3">
                <h1 className="font-bold text-xl w-full  shadow-sm rounded-sm pb-2 text-[#189ab4]">Trending Posts</h1>
                {
                    postIsLoading ? <LoadingSpinner style={'!h-40'} isLoading={postIsLoading}/> : <ul className="mt-4 flex flex-col gap-2">
                    {
                        latestPosts && latestPosts.data && latestPosts.data.map((post)=>(
                            <li className="flex items-start justify-center flex-col" key={post.id}>
                            <p className="">{post.title}</p>
                            <p className="text-gray-500 text-xs">By {post.user?.userName} </p>
                        </li>
                        ))
                    }
                </ul>
                }
                <Button name='Load More' style='!bg-white !border-purple'/>
            </div>
        </div>
    )
}

export default Aside