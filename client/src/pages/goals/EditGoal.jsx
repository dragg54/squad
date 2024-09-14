/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CiClock2 } from "react-icons/ci";
import Input from "../../components/inputs";
import { MdDeleteOutline } from "react-icons/md";
import Button from "../../components/buttons";
import { FaUsers } from "react-icons/fa6";
import UserProfilePicture from "../../components/UserProfilePicture";
import { closeModal, openModal } from "../../redux/reducers/GlobalModalReducer";
import GoalCategory from "./GoalCategory";
import { useDispatch } from "react-redux";
import Deadline from "./components/Deadline";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/DateFormatter";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { getAllUsers } from "../../services/user";
import { getUserGoals, updateUserGoal } from "../../services/goal";
import { openPopup } from "../../redux/reducers/PopUpReducer";
import Goals from ".";
import { userGoalCategoryConstant } from "../../constants/UserGoalCategory";

const EditGoal = ({ goal, setIsUpdated, localSelectedCategory, localDate }) => {
    console.log(goal)
    const dispatch = useDispatch()
    const { data: userData, error: userError, isLoading: usersIsLoading, isError: usersIsError } = useQuery(['users'], getAllUsers);
         
    const updateGoalMutation = useMutation(updateUserGoal, {
        onSuccess: () => {
            setIsUpdated(true)
            dispatch(closeModal())
        },
        onError: (err) => {
            console.log(err.response.status)
            dispatch(openPopup({ status: 'error', message: err.response.data.message || err.response.data.error || "Request Failed" }))
            // handleErrorResponse(err.response.status)
        }
    });
    const [inputValues, setInputValues] = useState({
        id: goal?.id,
        title: goal?.title,
        description: goal?.description,
        endDate: goal?.endDate,
        goalPartners: goal?.goalPartners,
        startDate: goal?.startDate,
        completed: goal?.completed
    })
    const [date, setDate] = useState(new Date())
    useEffect(() => {
        setInputValues({
            id: goal?.id,
            title: goal?.title,
            description: goal?.description,
            endDate: goal?.endDate,
            startDate: goal?.startDate,
            goalPartners: goal?.goalPartners,
            completed: goal?.completed
        })
    }, [goal])
    const [selectedCategory, setSelectedCategory] = useState(goal.userGoalCategory)
    const handleInputValueChange = (e) => {
        if (e.target.name == "completed") {
            setInputValues({ ...inputValues, "completed": e.target.checked })
        }
        else {
            setInputValues({ ...inputValues, [e.target.name]: e.target.value })
        }
    }
    const submitForm = (e) => {
        e.preventDefault()
        const updatedValues = {
            ...inputValues, endDate: localDate || inputValues.endDate,
            usergoalcategoryId: localSelectedCategory ? localSelectedCategory.id : selectedCategory.id
        }

        updateGoalMutation.mutate(updatedValues)
    }

    const handlePartnerSelectChange = (pat) => {
        let filteredPartners = []
        if (inputValues.goalPartners.some(x => x.id == pat.id)) {
            filteredPartners = inputValues?.goalPartners?.filter(partner => (partner.id != pat.id))
        }
        else {
            filteredPartners = inputValues.goalPartners
            const newPartner = {
                id: pat.id,
                user: {
                    id: pat.id,
                    userName: pat.userName,
                    email: pat.email
                }
            }
            filteredPartners.push(newPartner)
        }
        setInputValues({ ...inputValues, goalPartners: filteredPartners })
    }
    if (goal.id) {
        return (
            <form onSubmit={submitForm} onClick={(e) => e.stopPropagation()} className='w-[400px] mx-auto h-[600px] p-6 bg-white border rounded-md shadow-gray-300'>
                <div className="w-full border-b border-gray-300 pb-2">
                    <Input name='title' style='font-extrabold !-ml-3 w-full pb-2 border-none text-xl mt-6 !text-gray-700' value={inputValues.title} onChange={(e) => handleInputValueChange(e)} />
                </div>
                <Input onChange={(e) => handleInputValueChange(e)} name='description' type="text-area" style="!mt-3 !border-none text-gray-500 !outline-none" value={inputValues.description} />
                <div className="mt-5 flex justify-between">
                    <div className="cursor-pointer" onClick={() => dispatch(openModal(<GoalCategory {...{ goal, inputValues, selectedCategory, setSelectedCategory, setIsUpdated }} />))}>
                        <p className="font-semibold cursor-pointer">Category</p>
                        <p className="text-sm mt-1 text-gray-500 inline-flex gap-1 items-center">{localSelectedCategory ? localSelectedCategory.name : selectedCategory.name} {localSelectedCategory ? userGoalCategoryConstant.find(cat =>(cat.categoryName == localSelectedCategory.name)).categoryIcon: userGoalCategoryConstant.find(cat =>(cat.categoryName == selectedCategory.name)).categoryIcon}</p>
                    </div>
                    <div className='cursor-pointer' onClick={() => dispatch(openModal(<Deadline {...{ goal, setDate, date, setIsUpdated }} />))}>
                        <p className="font-semibold inline-flex items-center">Deadline <CiClock2 style={{ marginLeft: "5px", fontSize: "20px", color: "#1a5653" }} /></p>
                        <p className="text-sm mt-1 text-gray-500">{formatDate(localDate ? localDate : inputValues.endDate)}</p>
                    </div>
                </div>
                <div className="mt-5">
                    <label htmlFor="" className="inline-flex gap-1">
                        <Input value={inputValues.completed} onChange={(e) => handleInputValueChange(e)} name="completed" type="checkbox" checked={inputValues.completed} className="w-6 h-6 rounded-md bg-green-500" />
                        Completed
                    </label>
                </div>
                <div className="w-full h-36 border border-gray-700 mt-6 p-3 bg-gray-50">
                    <h4 className="font-semibold text-gray-600 pb-2 w-full border-b border-gray-300 mb-2 inline-flex items-center gap-3">Assigned Partners <span ><FaUsers className="h-6 w-6 text-gray-400" /></span></h4>
                    <ul className="h-20 overflow-scroll">
                        {
                            userData && userData.length > 0 && userData.map((partner) => (
                                <li className="flex justify-between" key={partner.id}>
                                    <div className="inline-flex items-center text-gray-500"><UserProfilePicture style='mr-2 h-8 w-8' />{partner.userName}</div>
                                    <div>
                                        <input onChange={() => handlePartnerSelectChange(partner)} checked={inputValues?.goalPartners?.some(pat => pat.user.id == partner.id)} name='goalPartners' type="checkbox" className="w-6 h-6" />
                                    </div>
                                </li>

                            ))
                        }
                    </ul>
                </div>
                <div className="w-full mt-8">
                    <Button type='submit' style="w-full !p-4" name='Save Changes' icon={<MdOutlineSaveAlt style={{ fontSize: "20px", font: "700px" }} />} />
                </div>
            </form>
        )
    }
    else {
        return <>loading</>
    }
}

export default EditGoal