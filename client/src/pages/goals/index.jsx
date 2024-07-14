import { useState } from "react"
import AddGoalsButton from "../../components/buttons/AddGoalsButton"
import { useDispatch } from "react-redux"
import { openModal } from "../../redux/reducers/GlobalModalReducer"
import AddGoal from "./AddGoal"

const Goals = () => {
    const [presentTab, setPresentTab] = useState("allGoals")
    const dispatch = useDispatch()
    return (
        <section>
            <div className="w-full h-screen p-4">
                <div className="w-full flex justify-between items-center">
                    <div className="">
                        <h1 className="text-xl font-semibold">Goals</h1>
                        <p className="text-gray-500 text-sm">Create and track your goals</p>
                    </div>
                    <div>
                        <AddGoalsButton onClick={()=> dispatch(openModal( <AddGoal/ >))}/>
                    </div>
                </div>
                <div className="w-full mt-16">
                    <div className="mb-3 flex gap-5">
                        <p onClick={()=>setPresentTab("allGoals")} className={`mb-3 font-semibold ${presentTab == "allGoals" && 'border-b-4 border-[#FF2511]'}`}>All goals</p>
                        <p onClick={()=>setPresentTab("monthlyGoals")} className={`mb-3  font-semibold ${presentTab == "monthlyGoals" && 'border-b-4 border-[#FF2511]'}`}>Monthly Goals</p>
                        <p onClick={()=>setPresentTab("yearlyGoals")} className={`mb-3 font-semibold ${presentTab == "yearlyGoals" && 'border-b-4 border-[#FF2511]'}`}>Yearly Goals</p>
                    </div>
                    <div className="w-full">
                <ul className="w-full mt-2">
                    <p className="!text-gray-600">20 June, 2023</p>
                <li className='goal-box !border-l-8 !border-red-500'><span className="ml-4">Finish reading an engineering book</span></li>
                    <li className='goal-box !border-l-8 !border-red-500'><span className="ml-4">Get some good sleep</span></li>
                    <li className='goal-box !border-l-8 !border-green-500'><span className="ml-4">Make some good savings</span></li>
                    <li className='goal-box !border-l-8 !border-green-500'><span className="ml-4">Go to church at least twice a week</span></li>
                </ul>
            </div>
                </div>
            </div>
        </section>
    )
}

export default Goals