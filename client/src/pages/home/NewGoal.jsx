import { useNavigate } from "react-router-dom"
import AddButton from "../../components/buttons/AddButton"
import { useSelector } from "react-redux"
import { getUserGoals } from "../../services/goal"
import { useQuery } from "react-query"
import LoadingSpinner from "../../components/LoadingSpinner"
import Goal from "../goals/components/Goal"

const NewGoal = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const { data: goalData, isLoading: dataIsLoading } = useQuery(
    ['latestGoals', {
         size: 3, userId: user.id,
    }],
    getUserGoals,
    // {
    //   keepPreviousData: true, 
    // }
);
  return (
    <section>
        <div className='mt-4 w-full rounded-md p-4'>
        <div className="w-full mb-3">
          <div className="flex justify-between items-center">
          <h2 className='text-[1.1rem] md:text-xl font-semibold'>New goals</h2>
          <AddButton onClick={()=>navigate("/goals")} name='Add Goal' style='!bg-white !text-gray-800 !rounded-full !border border-gray-700 items-center'/>
          </div>
            </div>
             <div className="w-full">
                {
                  dataIsLoading ? <LoadingSpinner isLoading={dataIsLoading} style={'!h-20 !mb-4'}/>:
                  <ul className="w-full">
                  {
                    goalData && goalData.data && goalData.data.map((goal)=>(
                      <Goal key={goal.id} {...{ goal }} />
                    ))
                  }
                </ul>
                }
            </div>
            <div className="w-full flex justify-between items-center">
             <p className="text-gray-600 underline">See all</p>
            </div>
        </div>
    </section>
  )
}

export default NewGoal