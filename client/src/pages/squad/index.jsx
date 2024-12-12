import { Link } from "react-router-dom"
import InviteButton from "../../components/buttons/InviteButton"
import ProfileCard from "./components/ProfileCard"
import { useQuery } from "react-query"
import { getAllUsers } from "../../services/user"
import LoadingSpinner from "../../components/LoadingSpinner"
import ResponseError from "../../components/ResponseError"
import { useDispatch } from "react-redux"
import { openModal } from "../../redux/reducers/GlobalModalReducer"

const Squad = () => {
    const { data: users, isError, refetch, isLoading } = useQuery(['squadMembers', {limit: null, order: 'ASC'}], 
        getAllUsers,
    {
        keepPreviousData: true
    })
    const dispatch = useDispatch()
   if(isLoading){
    return <LoadingSpinner isLoading={isLoading}/>
   }
    if(isError){
        dispatch(openModal({component: <ResponseError refetch={refetch}/>}))
    }
    return (
        <section className="w-full overflow-x-visible h-screen overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[20rem]">  
            <div className="md:w-[50%] pb-28">
                <div className="flex justify-between">
                    <div>
                        <p className="font-semibold md:text-2xl">Squad Members</p>
                        <p className="!text-gray-500 text-sm">Know your squad members</p>
                    </div>
                    <div>
                        <InviteButton />
                    </div>
                </div>
                <div className="mt-10">
                    {
                        users && users.map(user => (<Link to={"/member/"+user.id} key={user.id}><ProfileCard user={user}/></Link>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Squad