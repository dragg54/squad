/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import AddGoalsButton from "../../components/buttons/AddGoalsButton"
import { useDispatch } from "react-redux"
import { openModal } from "../../redux/reducers/GlobalModalReducer"
import AddGoal from "./AddGoal"
import { useQuery } from "react-query"
import { getUserGoals } from "../../services/goal"
import Pagination from "../../components/Pagination"
import MonthlyGoals from "./MonthlyGoals"
import Goal from "./components/Goal"
import { getMonthNames } from "../../utils/DateFormatter"

const Goals = () => {
    const [presentTab, setPresentTab] = useState("allGoals")
    const [groupBy, setGroupBy] = useState("")
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const allMonths = getMonthNames()
    const [openMonthGoalsContainer, setOpenMonthGoalsContainer] = useState([{hello: "yessss"}])
    const dispatch = useDispatch()
    const { data, isLoading, isError, refetch } = useQuery(
        ['goals', { page, size, groupBy }],
        getUserGoals,
        // {
        //   keepPreviousData: true, 
        // }
    );
    const [isUpdated, setIsUpdated] = useState(false)
    useEffect(()=>{
        refetch()
        setIsUpdated(false)
    }, [isUpdated])
    
    if(isLoading){console.log("loading")}
    if(isError)console.log("error")
    useEffect(() => {
        setPresentTab("allGoals")
        const goalMonthContainerState = allMonths.map((month) => ({
            [month]: false
        }))
        setOpenMonthGoalsContainer(goalMonthContainerState)
    }, [])

    return (
        <section className="w-full overflow-x-visible h-screen overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[20rem]">  
            <div className="md:w-[60%] w-full overflow-scroll p-4">
                <div className="w-full flex justify-between items-center">
                    <div className="">
                        <h1 className="text-xl font-semibold">Goals</h1>
                        <p className="text-gray-500 text-sm">Create and track your goals</p>
                    </div>
                    <div>
                        <AddGoalsButton onClick={() => dispatch(openModal(<AddGoal {...{setIsUpdated}}/>))} />
                    </div>
                </div>
                <div className="w-full mt-16 mb-5 overflow-scroll">
                    <div className="mb-3 flex gap-5">
                        <p onClick={() => {
                            setGroupBy("")
                            setPresentTab("allGoals")}} className={`mb-3 font-semibold ${presentTab == "allGoals" && 'border-b-4 border-[#FF2511]'}`}>All goals</p>
                        <p onClick={() => {
                            setPresentTab("monthlyGoals")
                            setGroupBy("month")
                        }
                        }
                            className={`mb-3  font-semibold ${presentTab == "monthlyGoals" && 'border-b-4 border-[#FF2511]'}`}>Monthly Goals</p>
                        <p onClick={() => {
                            setPresentTab("yearlyGoals")
                            setGroupBy("month")
                        }
                        }
                            className={`mb-3 font-semibold ${presentTab == "yearlyGoals" && 'border-b-4 border-[#FF2511]'}`}>Yearly Goals</p>
                    </div>
                    {presentTab == "monthlyGoals" ? <MonthlyGoals {...{ allMonths, openMonthGoalsContainer, setOpenMonthGoalsContainer, data, presentTab }} />:
                    <div>
                        <div className="w-full overflow-scroll">
                        <ul className="w-full mt-2">
                            {data && data.data?.length > 0 && data.data.map(goal => (
                               <Goal key={goal.id} {...{goal, setIsUpdated}}/>
                            ))}
                        </ul>
                    </div>
                    <Pagination
                       currentPage={page}
                       totalPages={data?.totalPages}
                       onPageChange={setPage}
                    />
                    </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default Goals