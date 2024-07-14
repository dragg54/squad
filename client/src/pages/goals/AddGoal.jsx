import { useDispatch } from "react-redux"
import AddButton from "../../components/buttons/AddButton"
import Input from "../../components/inputs"
import {  openModal } from "../../redux/reducers/GlobalModalReducer"
import AssignPartners from "./AssignPartners"

const AddGoal = () => {
    const dispatch = useDispatch()
    return (
        <div onClick={(e) => e.stopPropagation()} className='w-2/3 relative mx-auto bg-white h-[460px] rounded-md shadow-md  p-5'>
            <h1 className="text-xl font-semibold">Add Goals</h1>
            <form action="" className="mt-8 flex-col">
                <div>
                    <label htmlFor="title" className="">Title</label>
                    <Input placeholder='Add Title' name='title' />
                </div>
                <div className="mt-3">
                    <label htmlFor="goal" className="mt-3">Goal</label>
                    <Input placeholder='Add Goal' name='goal' />
                </div>
                <AddButton type="button" onClick={()=>{
                    dispatch(openModal(<AssignPartners />))
                }} style="w-full mt-28 !py-4  bottom-10 z-20 " name="Create Goal"/>
            </form>
        </div>
    )
}

export default AddGoal