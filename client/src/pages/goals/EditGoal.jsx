/* eslint-disable react/prop-types */
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CiClock2 } from "react-icons/ci";
import Input from "../../components/inputs";
import { MdDeleteOutline } from "react-icons/md";
import Button from "../../components/buttons";
import { FaUsers } from "react-icons/fa6";
import UserProfilePicture from "../../components/UserProfilePicture";
import { openModal } from "../../redux/reducers/GlobalModalReducer";
import GoalCategory from "./GoalCategory";
import { useDispatch } from "react-redux";
import Deadline from "./components/Deadline";
import { useEffect, useState } from "react";

const EditGoal = ({ goal }) => {
    const dispatch = useDispatch()
    const [inputValues, setInputValues] = useState({
        title: goal?.title,
        description: goal?.description,
        userGoalCategory: goal?.userGoalCategory?.name,
        end_date: goal?.end_date,
        goalPartners: goal?.goalPartners,
        completed: goal?.completed
    })

    useEffect(()=>{
        setInputValues({
            title: goal?.title,
            description: goal?.description,
            userGoalCategory: goal?.userGoalCategory?.name,
            end_date: goal?.end_date,
            goalPartners: goal?.goalPartners,
            completed: goal?.completed
        })
    }, [goal])
    return (
        <div onClick={(e) => e.stopPropagation()} className='w-[400px] mx-auto h-[600px] p-6 bg-white border rounded-md shadow-gray-300'>
            <div className="w-full border-b border-gray-300 pb-2">
            <Input name='title' style='font-extrabold !-ml-3 w-full pb-2 border-none text-xl mt-6 !text-gray-700' value={inputValues.goalPartners}/>
            </div>
            <Input name='description' type="text-area" style="!mt-3 !border-none text-gray-500 !outline-none" value={inputValues.description}/>
            <div className="mt-5 flex justify-between">
                <div className="cursor-pointer" onClick={()=>dispatch(openModal(<GoalCategory {...{goal}}/>))}>
                    <p className="font-semibold cursor-pointer inline-flex">Category</p>
                    <p className="text-sm mt-1 text-gray-500">{inputValues.name} <FontAwesomeIcon icon={faCoins} style={{ marginLeft: "3px" }} /></p>
                </div>
                <div className='cursor-pointer' onClick={()=>dispatch(openModal(<Deadline {...{goal}}/>))}>
                    <p className="font-semibold inline-flex items-center">Deadline <CiClock2 style={{ marginLeft: "5px", fontSize: "20px", color: "#e34234" }} /></p>
                    <p className="text-sm mt-1 text-gray-500">20th August, 2024</p>
                </div>
            </div>
            <div className="mt-5">
                <label htmlFor="" className="inline-flex gap-1">
                    <input name="completed" type="checkbox" className="w-6 h-6 rounded-md bg-green-500" />
                    Completed
                </label>
            </div>
            <div className="w-full h-36 border border-gray-700 mt-6 p-3 bg-gray-50">
                <h4 className="font-semibold text-gray-600 pb-2 w-full border-b border-gray-300 mb-2 inline-flex items-center gap-3">Assigned Partners <span ><FaUsers className="h-6 w-6 text-gray-400"/></span></h4>
                <ul className="h-20 overflow-scroll">
                    {
                        goal.goalPartners && goal.goalPartners.map((partner)=>(
                            <li className="flex justify-between" key={partner.id}>
                            <div className="inline-flex items-center text-gray-500"><UserProfilePicture style='mr-2 h-8 w-8'/>{partner.user.userName}</div>
                            <div>
                                <input name='goalPartners' type="checkbox" className="w-6 h-6"/>
                            </div>
                        </li> 
                  
                        ))
                    }
                    <p className="mt-4 text-gray-700 underline decoration-gray-500">Show all partners</p>
                </ul>
            </div>
            <div className="w-full mt-8">
                <Button style="w-full !p-4" name='Delete Goal' icon={<MdDeleteOutline style={{ fontSize: "20px" }} />} />
            </div>
        </div>
    )
}

export default EditGoal