/* eslint-disable react/prop-types */
import { useQuery } from "react-query"
import { getAllGoalCategories } from "../../services/goalCategory"
import Input from "../../components/inputs"
import Button from "../../components/buttons"
import { useDispatch } from "react-redux"
import { closeModal, openModal } from "../../redux/reducers/GlobalModalReducer"
import EditGoal from "./EditGoal"
import { useEffect, useState } from "react"

const GoalCategory = ({goal, selectedCategory, setSelectedCategory, setIsUpdated}) => {
    const { data: userGoalCategories } = useQuery("categories", {
        queryFn: getAllGoalCategories
    })
    const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory);
    const dispatch = useDispatch()
    const handleSelectGoalCategory = (category) =>{
        setLocalSelectedCategory(category)
        setSelectedCategory(category)
    }
    useEffect(() => {
        setLocalSelectedCategory(selectedCategory);
      }, [selectedCategory]);
    return (
        <div onClick={(e) => e.stopPropagation()} className='w-[3500px] mx-auto h-[600px] p-6 py-3 -mt-3 bg-white border rounded-md shadow-gray-300'>
            <h1 className="mt-3 font-extrabold text-xl pb-2 w-full border-b border-gray-300 inline-flex justify-between items-center"><span>Goal Categories </span>
            <Button
                onClick={()=>{
                dispatch(closeModal())
                dispatch(openModal(<EditGoal {...{goal, localSelectedCategory, setIsUpdated}}/>))
            }}
            style="!bg-white !text-purple-500 border !border-purple-500" name="Done"/></h1>
            <div className="flex flex-col items-start mt-4">
                {
                    userGoalCategories && userGoalCategories.data && userGoalCategories.data.map(category =>(
                        <label key={category.id}>
                         <Input name="userGoalCategoryId" value={category.id} onChange={()=>handleSelectGoalCategory(category)} checked={localSelectedCategory?.name == category.name} type="checkbox" style='ml-3'/>
                         {category.name}
                        </label>
                    ))
                }
            </div>
        </div>
    )
}

export default GoalCategory