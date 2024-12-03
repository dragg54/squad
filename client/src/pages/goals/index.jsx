/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import AddGoalsButton from "../../components/buttons/AddGoalsButton"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../../redux/reducers/GlobalModalReducer"
import AddGoal from "./AddGoal"
import { useQuery } from "react-query"
import { getUserGoals } from "../../services/goal"
import Pagination from "../../components/Pagination"
import MonthlyGoals from "./MonthlyGoals"
import Goal from "./components/Goal"
import { getMonthNames } from "../../utils/DateFormatter"
import LoaidingSpinner from "../../components/LoadingSpinner"
import { RiArrowDropDownLine } from "react-icons/ri";
import Selection2 from "../../components/inputs/Selection2"
import { openSelectionModal } from "../../redux/reducers/Selection2Reducer"
import { getAllGoalCategories } from "../../services/goalCategory"

const Goals = () => {
    const [presentTab, setPresentTab] = useState("allGoals")
    const [groupBy, setGroupBy] = useState("")
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const allMonths = getMonthNames()
    const [openMonthGoalsContainer, setOpenMonthGoalsContainer] = useState([{}])
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const selection = useSelector(state => state.selection2)
    const [selectionName, setSelectionName] = useState('')
    const { data, isLoading, isError, refetch } = useQuery(
        ['goals', {
            page, size, groupBy, userId: user.id,
            categoryId: selection.selected.find(sel => sel.name == "category")?.value,
            month: selection.selected.find(sel => sel.name == "month")?.value
        }],
        getUserGoals,
        // {
        //   keepPreviousData: true, 
        // }
    );
    const { data: categoryData, isLoading: categoryLoading } = useQuery({
        queryFn: getAllGoalCategories
    })
    const [isUpdated, setIsUpdated] = useState(false)
    useEffect(() => {
        refetch()
        setIsUpdated(false)
    }, [isUpdated])
    useEffect(() => {
        setPresentTab("allGoals")
        const goalMonthContainerState = allMonths.map((month) => ({
            [month]: false
        }))
        setOpenMonthGoalsContainer(goalMonthContainerState)
    }, [])
    if (isLoading) {
        return <LoaidingSpinner {...{ isLoading }} />
    }
    if (isError) console.log("error")
    if (categoryLoading) {
        console.log("Loading")
    }
    return (
        <section className="w-full  h-screen overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[20rem] pb-20">
            <div className="md:w-[50%] w-full p-4">
                <div className="w-full flex justify-between items-center">
                    <div className="">
                        <h1 className="text-xl font-semibold">Goals</h1>
                        <p className="text-gray-500 text-sm">Create and track your goals</p>
                    </div>
                    <div>
                        <AddGoalsButton onClick={() => dispatch(openModal({ component: <AddGoal {...{ setIsUpdated }} /> }))} />
                    </div>
                </div>
                <div className="flex items-center gap-3 font-semibold">
                    <div onClick={(e) => {
                        e.stopPropagation()
                        setSelectionName('category')
                        dispatch(openSelectionModal({
                            content: categoryData.data.map(category => ({
                                value: category.id,
                                label: category.name,
                                name: 'category'
                            })),
                            name: 'category'
                        }))
                    }} className="mt-6 cursor-pointer flex justify-center text-sm py-1 items-center gap-1 px-2 bg-gray-100 w-[100px] relative">
                        <p>{selection.selected.find(sel => sel.name == "category")?.label || "Category"}</p>
                        <p><RiArrowDropDownLine className="text-xl" /></p>
                        <Selection2 name={selectionName} />
                    </div>
                    <div onClick={(e) => {
                        e.stopPropagation()
                        setSelectionName('month')
                        dispatch(openSelectionModal({
                            content: getMonthNames().map((month, index) => ({
                                value: index + 1,
                                label: month,
                                name: 'month'
                            })),
                            name: 'month'
                        }))
                    }}
                        className="mt-6 cursor-pointer flex justify-center text-sm py-1 items-center gap-1 px-2 bg-gray-100 w-[100px] relative">
                        <p>{selection.selected.find(sel => sel.name == "month")?.label || "Month"}</p>
                        <p><RiArrowDropDownLine className="text-xl" /></p>

                    </div>
                </div>
                <div className="w-full mt-12 mb-5 ">
                    <div className="mb-3 flex gap-5">
                        <p onClick={() => {
                            setGroupBy("")
                            setPresentTab("allGoals")
                        }} className={`mb-3  cursor-pointer font-semibold ${presentTab == "allGoals" && 'border-b-4 border-[#FF2511]'}`}>All goals</p>
                        <p onClick={() => {
                            setPresentTab("monthlyGoals")
                            setGroupBy("month")
                        }
                        }
                            className={`mb-3  cursor-pointer  font-semibold ${presentTab == "monthlyGoals" && 'border-b-4 border-[#FF2511]'}`}>Monthly Goals</p>
                        <p onClick={() => {
                            setPresentTab("yearlyGoals")
                            setGroupBy("month")
                        }
                        }
                            className={`mb-3 font-semibold  cursor-pointer ${presentTab == "yearlyGoals" && 'border-b-4 border-[#FF2511]'}`}>Yearly Goals</p>
                    </div>
                    {presentTab == "monthlyGoals" ? <MonthlyGoals {...{ allMonths, openMonthGoalsContainer, setOpenMonthGoalsContainer, data, presentTab }} /> :
                        <div>
                            <div className="w-full">
                                <ul className="w-full mt-2">
                                    {data && data.data?.length > 0 && data.data.map(goal => (
                                        <Goal key={goal.id} {...{ goal, setIsUpdated }} />
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