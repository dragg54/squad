/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
import { useDispatch, useSelector } from "react-redux"
import AddButton from "../../components/buttons/AddButton"
import Input from "../../components/inputs"
import { useCallback, useEffect, useRef, useState } from "react"
import { useForm } from '@mantine/form';
import { openPopup } from "../../redux/reducers/PopUpReducer"
import { useMutation, useQuery } from "react-query";
import { createUserGoal } from "../../services/goal";
import AssignPartners from "./AssignPartners";
import useHandleErrorResponse from "../../hooks/useHandleErrorResponse";
import { closeModal, openModal } from "../../redux/reducers/GlobalModalReducer";
import { getAllGoalCategories } from "../../services/goalCategory";
import DateInput from "../../components/inputs/DateInput";
import { validateForm } from "../../utils/ValidateInput";
import { formatDate2 } from "../../utils/DateFormatter";
import Button from "../../components/buttons";

const AddGoal = ({ setIsUpdated }) => {
    const dispatch = useDispatch()
    const handleErrorResponse = useHandleErrorResponse()
    const [error, setError] =useState({})
    

    //For date modal
    const globalModal = useSelector(state => state.globalModal)
    const [date, setDate] = useState({
        startDate: (globalModal.content?.props?.newDate?.startDate) || new Date(),
        endDate: (globalModal.content?.props?.newDate?.endDate) || new Date()
    })

    const [input, setInput] = useState({
        title: globalModal.content?.props?.input?.title || "",
        description: globalModal.content?.props?.input?.description || ""
    })
    const inputRef = useRef(null)

    useEffect(()=>{
        inputRef?.current?.focus()
    },[])
      //button variables
      const [buttonDisabled, setButtonDisabled] = useState(true)
      const [response, setResponse] = useState(true)

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
  

    const handleChangeDate = (e) => {
        // setDate({ ...date, [Object.keys(e)[0]]: [Object.values(e)[0]] })
    }

    const {
        data: userGoalCategories,
        isLoading: userGoalCategoryLoading,
        isError: userGoalCategoryError,
        refetch
    } = useQuery(['categories', { showGroupGoal: false }],
        getAllGoalCategories
    )

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSaveGoal = (e) => {
        e.preventDefault()
        if(!buttonDisabled){
            const updatedInput = { ...input, ...date, userGoalCategoryId: globalModal.content?.props?.selectedId}
            dispatch(openModal({component: <AssignPartners {...{ setIsUpdated }} goalInputs={updatedInput} />}))
        }
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className='w-[90%] md:w-[30%]  md:mt-0 relative mx-auto bg-white min-h-auto rounded-md shadow-md  p-5'>
            <form onSubmit={handleSaveGoal} action="" className="mt-8 flex-col">
                <div>
                    <Input
                        hasError={error['title']?.length}
                        onChange={handleChange}
                        ref={inputRef}
                        type = 'text'
                        placeholder='Add Goal'
                        name='title'
                        value={input.title}
                        style={'!border-b-1 border-none !text-xl !bg-purple-100'}
                    />
                <span className='error'>{error["title"]}</span>
                </div>
                <div className="mt-3">
                    <Input
                        hasError={error['description']?.length}
                        onChange={handleChange}
                        type='text-area'
                        placeholder='Description'
                        name='description'
                        style='!border-none text-xl !bg-purple-100'
                        value={input.description}
                    />
                <span className='error'>{error["description"]}</span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                    <div className="w-[48%]" id="startDate">
                        <label htmlFor="start_date" className=""><p className="">From</p></label>
                        <Input
                            onClick={()=>handleChangeDate()}
                            style={`!text-sm !text-gray-500 ${error['startDate']?.length && '!border !border-red-500'}`}
                            data={date}
                            value={date?.startDate}
                            type='date'
                            placeholder='Start date'
                            id="startDate"
                            done={(prop) => {
                                dispatch(openModal({
                                    component: <AddGoal />,
                                    props: { input, handleChangeDate, date, newDate: { ...date, startDate: prop }, selected: globalModal.content?.props?.selected, selectedId: globalModal.content?.props?.selectedId }
                                }))
                            }}
                            name='startDate' />
                        <span className='error'>{error["startDate"]}</span>
                    </div>
                    <div className="w-[48%]">
                        <label htmlFor="end_date"><p className="">To</p></label>
                        <Input
                            onClick={()=>handleChangeDate()}
                            data={date}
                            type={'date'}
                            style={`!text-sm !text-gray-500 ${error['endDate']?.length && '!border !border-red-500'}`}
                            id="endDate"
                            value={date?.endDate}
                            done={(prop) => {
                                dispatch(openModal({
                                    component: <AddGoal />,
                                    props: { input, handleChangeDate, date, newDate: { ...date, endDate: prop } }
                                }))
                            }}
                            placeholder='End date'
                            name='endDate'
                        />
                 <span className='error'>{error["endDate"]}</span>
                    </div>
                </div>
                <div className="mt-4 w-full ">
                    <Input
                        onChange={handleChange}
                        style='!text-sm' type='select'
                        name='userGoalCategoryId'
                        value={userGoalCategories?.data}
                        isSelected = {globalModal.content?.props?.selected != null}
                        placeholder={globalModal.content?.props?.selected ? globalModal.content?.props?.selected : "Select goal category"}
                        done={(prop, propId) => {
                            dispatch(openModal({
                                component: <AddGoal />,
                                props: { input, handleChangeDate, newDate: globalModal.content?.props?.newDate, selected: globalModal.content?.props?.selected || prop, selectedId: globalModal.content?.props?.selectedId || propId }
                            }))
                        }}
                    />
                </div>
                <Button
                        disabled={buttonDisabled}
                        type='submit'
                        style='mt-6 !py-3 !rounded-full ml-auto'
                        name="Create Goal"
                        validationRules={validationRules}
                        buttonDisabled={buttonDisabled}
                        inputValues={{...input, ...date}}
                        setButtonDisabled={setButtonDisabled}
                        isApiRequestButton={true}
                        response={response}
                    />
                </form>
        </div>
    )
}

export default AddGoal