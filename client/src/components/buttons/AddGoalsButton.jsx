/* eslint-disable react/prop-types */
import Button from './'
import { FaPlus } from "react-icons/fa6";


const AddGoalsButton = ({onClick}) => {
  return (
    <Button onClick={onClick} style={'!bg-white !text-purple-700 border border-purple-500'} name="Add Goals" icon={<FaPlus />}/>
  )
}

export default AddGoalsButton