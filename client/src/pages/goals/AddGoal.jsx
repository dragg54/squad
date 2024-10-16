/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
import { useDispatch, useSelector } from "react-redux"
import AddButton from "../../components/buttons/AddButton"
import Input from "../../components/inputs"
import { useCallback, useEffect, useState } from "react"
import { useForm } from '@mantine/form';
import validateInput from "../../utils/ValidateInput"
import { openPopup } from "../../redux/reducers/PopUpReducer"
import { useMutation, useQuery } from "react-query";
import { createUserGoal } from "../../services/goal";
import AssignPartners from "./AssignPartners";
import useHandleErrorResponse from "../../hooks/useHandleErrorResponse";
import { closeModal, openModal } from "../../redux/reducers/GlobalModalReducer";
import { getAllGoalCategories } from "../../services/goalCategory";
import DateInput from "../../components/inputs/DateInput";

const AddGoal = ({ setIsUpdated }) => {
    const dispatch = useDispatch()
    const handleErrorResponse = useHandleErrorResponse()
    const globalModal = useSelector(state => state.globalModal)
    const [input, setInput] = useState({
        title: globalModal.content?.props?.input?.title || "",
        description: globalModal.content?.props?.input?.description || ""
    })
    const [date, setDate] = useState({
        startDate: (globalModal.content?.props?.newDate?.startDate) || new Date(),
        endDate: (globalModal.content?.props?.newDate?.endDate) || new Date()
    })

    const handleChangeDate = (e) => {
        // setDate({ ...date, [Object.keys(e)[0]]: [Object.values(e)[0]] })
    }

    const createGoalMutation = useMutation(createUserGoal, {
        onSuccess: () => {
            dispatch(closeModal())
            dispatch(openModal(<AssignPartners {...{ setIsUpdated }} goalInputs={input} />))
        },
        onError: (err) => {
            console.log(err.response.status)
            // dispatch(openPopup({ status: 'error', message: err.response.data.message || err.response.data.error || "Request Failed" }))
            handleErrorResponse(err.response.status)
        }
    });

    const { data: userGoalCategories, isLoading: userGoalCategoryLoading, isError: userGoalCategoryError, refetch } = useQuery("categories", {
        queryFn: getAllGoalCategories
    })

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const form = useForm({
        initialValues: {
            title: '',
            description: ''
        },
        validate: {
            title: (value) => validateInput(value, { required: true, minLength: 6 }).length === 0,
            description: (value) => validateInput(value, { required: true, minLength: 6 }).length === 0,
        },
        errorMessages: {
            title: 'Title must be at least 6 characters long',
            description: 'Description must be at least 6 characters long',
        }
    });

    const handleSaveGoal = (e) => {
        e.preventDefault()
        const updatedInput = { ...input, ...date, userGoalCategoryId: globalModal.content?.props?.selectedId}
        dispatch(openModal({component: <AssignPartners {...{ setIsUpdated }} goalInputs={updatedInput} />}))
    }

    const handleSetNewDate = (prop) => {
        setDate(() =>
            console.log(date)
        )
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className='w-[90%] md:w-[30%] relative mx-auto bg-white h-[550px] rounded-md shadow-md  p-5'>
            <h1 className="text-xl font-semibold">Add Goals</h1>
            <form onSubmit={handleSaveGoal} action="" className="mt-8 flex-col">
                <div>
                    <label htmlFor="title" className="">Goal</label>
                    <Input
                        onChange={handleChange}
                        placeholder='Add Goal'
                        name='title'
                        value={input.title}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="description" className="mt-3">Description</label>
                    <Input
                        onChange={handleChange}
                        placeholder='Description'
                        name='description'
                        value={input.description}
                    />
                </div>
                <div className="mt-3 flex justify-between items-center">
                    <div className="w-[48%]" id="startDate">
                        <label htmlFor="start_date" className=""><p className="">From</p></label>
                        <Input
                            onClick={handleChangeDate}
                            style='!text-sm !text-gray-500'
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
                                handleSetNewDate(prop)
                            }}
                            name='startDate' />
                    </div>
                    <div className="w-[48%]">
                        <label htmlFor="end_date"><p className="">To</p></label>
                        <Input
                            onClick={handleChangeDate}
                            data={date}
                            style='!text-sm !text-gray-500' type='date'
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
                    </div>
                </div>
                <div className="mt-4 w-full ">
                    <label htmlFor=""><p className="">Goal Category</p></label>
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
                <AddButton type="submit" style="w-full mt-5 !py-4  bottom-10 z-20 " name="Create Goal" />
            </form>
        </div>
    )
}

export default AddGoal