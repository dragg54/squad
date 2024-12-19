/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import Input from "../../components/inputs";
import Button from "../../components/buttons";
import { FaUsers } from "react-icons/fa6";
import { closeModal, openModal } from "../../redux/reducers/GlobalModalReducer";
import GoalCategory from "./GoalCategory";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllUsers } from "../../services/user";
import {  updateUserGoal } from "../../services/goal";
import { openPopup } from "../../redux/reducers/PopUpReducer";
import Image from '../../components/containers/Image'
import { BACKEND_SERVER_URL } from "../../Appconfig";
import { capitalizeHeader } from "../../utils/CapitalizeHeader";
import { goalFrequency } from "../../constants/GoalFrequency";
import Selection2 from "../../components/inputs/Selection2";
import { getMonthName, getMonthNames } from "../../utils/DateFormatter";
import { BiCalendar } from "react-icons/bi";
import { getYears } from "./components/Years";
import { processEndDate } from "./utils/processEndDate";
import { getMonth, getYear } from "date-fns";

const EditGoal = ({ goal, setIsUpdated, localSelectedCategory }) => {
    const dispatch = useDispatch()
    const { data: userData } = useQuery(['users'], getAllUsers);
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [error, setError] = useState({})
    const [selectionName, setSelectionName ] = useState('')
    const user = useSelector(state => state.user)
    const selection = useSelector(state => state.selection2)
    const [selectionHasChanged, setSelectionHasChanged] = useState(false)

    //for date modal
    const globalModal = useSelector(state => state.globalModal)
    const [date, setDate] = useState({
        startDate: (globalModal.content?.props?.newDate?.startDate) || goal?.startDate,
        endDate: (globalModal.content?.props?.newDate?.endDate) || goal?.endDate
    })

    const queryClient = useQueryClient()
    const updateGoalMutation = useMutation(updateUserGoal, {
        onSuccess: () => {
            dispatch(closeModal())
            dispatch(openPopup({ message: "Goal updated" }))
            queryClient.invalidateQueries('goals')
        },
        onError: (err) => {
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
        completed: goal?.completed,
        frequency: goal?.frequency
    })

    //For validation
    const validationRules = {
        textValidation: {
            description: value => value.length > 0,
            title: value => value.length > 0,
        },
        dateValidation: {
            startDate: { isValid: (new Date().getDay() <= new Date(date.startDate).getDay()), message: "Invalid start date" },
            endDate: {
                isValid: ((new Date().getDay() <= new Date(date.endDate).getDay()
                    && (new Date(date.startDate).getDay() <= new Date(date.endDate).getDay()))),
                message: "Invalid end date"
            },
        }
    };
    const [selectedCategory, setSelectedCategory] = useState(goal?.user_goal_category || globalModal.content?.props?.selectedCategory)
    useEffect(() => {
        setInputValues({
            id: goal?.id || globalModal.content?.props?.input?.id,
            title: goal?.title || globalModal.content?.props?.input?.title,
            description: goal?.description || globalModal.content?.props?.input?.description,
            endDate: goal?.endDate,
            startDate: goal?.startDate,
            frequency: goal?.frequency,
            goalPartners: goal?.goal_partners || globalModal.content?.props?.input?.goalPartners || [],
            completed: goal?.completed || globalModal.content?.props?.input?.completed
        })
    }, [goal])

    useEffect(() => {
           if(selectionHasChanged){
            processEndDate(inputValues.frequency, date, selection, setDate)
           }
           else{
            setSelectionHasChanged(true)
           }
    }, [selection])

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
       if((goal?.user_goal_category.name == "Group" && user.isAdmin) || (goal.user_goal_category.name !="Group")){
        console.log(inputValues)
        const updatedValues = {
            ...inputValues, startDate: date.startDate, endDate: date.endDate,
            userGoalCategoryId: localSelectedCategory ? localSelectedCategory.id : selectedCategory.id
        }
        updateGoalMutation.mutate(updatedValues)       }
    }
    const handlePartnerSelectChange = (pat) => {
        let filteredPartners = []
        // Object.defineProperty(filteredPartners, 'length', {
        //     writable: true
        //   });
        if (inputValues.goalPartners && inputValues.goalPartners.some(x => x.user.id == pat.id)) {
            filteredPartners = inputValues?.goalPartners?.filter(partner => (partner.user.id != pat.id))
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
        console.log(filteredPartners)
        setInputValues({ ...inputValues, goalPartners: filteredPartners })
    }
    if (goal?.id || globalModal.content?.props?.input) {
        return (
            <form onSubmit={submitForm} onClick={(e) => e.stopPropagation()} className='w-[350px] md:w-[400px] mx-auto h-auto pb-8 p-3 px-5 bg-white rounded-md -mt-12 md:mt-0 '>
                <div className="w-full pb-2">
                    <Input readonly={!user.isAdmin && goal.user_goal_category.name=="Group"}  name='title' style='font-extrabold !bg-purple-100  w-full pb-2 border-none text-xl mt-3 !text-gray-700' value={inputValues.title} onChange={(e) => handleInputValueChange(e)} />
                </div>
                <Input readonly={!user.isAdmin && goal.user_goal_category.name=="Group"} onChange={(e) => handleInputValueChange(e)} 
                name='description' type="text-area" style="!h-10 !p-2 !-mt-2 !border-none !bg-purple-100 !mt-4 text-gray-500 !outline-none" value={inputValues.description} />
                <div className="mt-3 flex justify-between w-full">
                    <div className="cursor-pointer w-1/2" onClick={() =>((user.isAdmin && goal.user_goal_category.name == "Group") || goal.user_goal_category.name != "Group")  && dispatch(openModal({ component: <GoalCategory {...{ goal, inputValues, selectedCategory, setSelectedCategory, setIsUpdated }} /> }))}>
                        <p className="font-semibold cursor-pointer">Category</p>
                        <p className="text-sm mt-1 text-gray-500 inline-flex gap-1 items-center">{localSelectedCategory?.name || selectedCategory?.name} </p>
                    </div>

                </div>
                <div className="flex mt-3 w-4/5 justify-between items-center">
                <div className="-ml-2">
                    <label htmlFor="" className="inline-flex items-center">
                        <Input readonly={!user.isAdmin && goal.user_goal_category.name=="Group"} value={inputValues.completed} onChange={(e) => {
                            {((user.isAdmin && goal.user_goal_category.name == "Group") || goal.user_goal_category.name != "Group")  && handleInputValueChange(e)
                        }}} name="completed" type="checkbox" checked={inputValues.completed} className="w-6 h-6 rounded-md bg-green-500" />
                        Completed
                    </label>
                </div>
                <div>
                   <p className="">Frequency: <span className="bg-gray-200 rounded-md p-1 text-sm font-semibold"> {capitalizeHeader(inputValues.frequency)}</span></p>
                </div>
                </div>
                <div className="w-full flex justify-between -mt-5">
                    {
                        inputValues.frequency == goalFrequency.monthly ?
                        <div className="relative w-full">
                                <Selection2
                                   height={'200px'}
                                   name={'monthNamesUpdate'}
                                   style={'!border-gray-500 !border-2 !w-full'}
                                   setSelectionName={setSelectionName}
                                   selected={getMonthName(getMonth(goal?.startDate))}
                                   content={getMonthNames().map((month, index) =>({
                                    value: index,
                                    label: month,
                                    name: 'monthNamesUpdate'
                                }))}
                                   icon={ <BiCalendar className="text-base" />}
                                   fieldName={'Select Month'}
                                  {...{ showSearch: false }} 
                                  />
                        </div>: inputValues.frequency == goalFrequency.yearly ?
                         <div className="relative w-full">
                         <Selection2
                             style={'!border-gray-500 !w-full !border-2'}
                             height={'200px'}
                             name={'years'}
                             content={getYears(5).map((month, index) => ({
                                 value: index,
                                 label: month,
                                 name: 'years'
                             }))}
                             selected = {getYear(goal?.startDate)}
                             setSelectionName={setSelectionName}
                             fieldName={'Select Year'}
                             icon={<BiCalendar className="text-base" />}
                             {...{ showSearch: false }} />
                     </div>:
                     <div className="w-full flex items-center justify-between mt-2">
                    <div className="w-[48%]">
                        <label htmlFor="start_date"><p className="">From</p></label>
                        <Input
                            data={date}
                            type={'date'}
                            style={`!text-sm !text-gray-500 ${error['startDate']?.length && '!border !border-red-500'}`}
                            id="startDate"
                            value={date?.startDate}
                            readonly={!user.isAdmin && goal.user_goal_category.name=="Group"}
                            done={(prop) => {
                                dispatch(openModal({
                                    component: <EditGoal />,
                                    props: {
                                        input: inputValues, goal, selectedCategory,
                                        date, newDate: { ...date, startDate: prop }
                                    },
                                }))
                            }}
                            placeholder='Start date'
                            name='startDate'
                        />
                    </div>
                    <div className="w-[48%]">
                        <label htmlFor="end_date"><p className="">To</p></label>
                        <Input
                            data={date}
                            type={'date'}
                            style={`!text-sm !text-gray-500 ${error['endDate']?.length && '!border !border-red-500'}`}
                            id="endDate"
                            value={date?.endDate}
                            readonly={!user.isAdmin && goal.user_goal_category.name=="Group"}
                            done={(prop) => {
                                dispatch(openModal({
                                    component: <EditGoal />,
                                    props: {
                                        input: inputValues, goal, selectedCategory,
                                        date, newDate: { ...date, endDate: prop }
                                    },
                                }))
                            }}
                            placeholder='End date'
                            name='endDate'
                        />
                    </div>
                </div>
                 }
                </div>
                <div className="w-full h-36 border border-gray-700 mt-3 p-3 bg-gray-50">
                    <h4 className="font-semibold text-gray-600 pb-2 w-full border-b border-gray-300 mb-2 inline-flex items-center gap-3">Assigned Partners <span ><FaUsers className="h-6 w-6 text-gray-400" /></span></h4>
                    <ul className="h-20 overflow-scroll">
                        {
                            userData && userData.length > 0 && userData.map((partner) => (
                                <li className="flex justify-between" key={partner.id}>
                                    <div className="inline-flex items-center text-gray-500">
                                    <Image isUser={true} source={BACKEND_SERVER_URL + "/avatars/" + partner?.profileAvatar} style='h-10 w-10 mr-2' />
                                    {partner.userName}</div>
                                    <div>
                                        {((user.isAdmin && goal.user_goal_category.name == "Group") || goal.user_goal_category.name != "Group")  && <input onChange={() => handlePartnerSelectChange(partner)} checked={inputValues?.goalPartners?.some(pat => pat.user.id == partner.id)} name='goalPartners' type="checkbox" className="w-6 h-6" />}
                                    </div>
                                </li>

                            ))
                        }
                    </ul>
                </div>
                
                <div className="w-full mt-8">
                    <Button buttonDisabled={!user.isAdmin && goal.user_goal_category.name == "Group" } 
                    type='submit' style="w-full !p-4 !bg-white border !border-purple-700 !text-purple-700"
                     name='Save Changes' icon={<MdOutlineSaveAlt style={{ fontSize: "20px", font: "700px" }} />} />
                </div>
            </form>
        )
    }
    else {
        return <>loading</>
    }
}

export default EditGoal