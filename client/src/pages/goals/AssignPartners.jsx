/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import Button from "../../components/buttons"
import Input from "../../components/inputs"
import { closeModal } from "../../redux/reducers/GlobalModalReducer"
import { createUserGoal } from "../../services/goal"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { openPopup } from "../../redux/reducers/PopUpReducer"
import { useState } from "react"
import { getAllUsers } from "../../services/user"
import { socket } from "../../utils/Socket"

const AssignPartners = ({ goalInputs }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [selectedItems, setSelectedItems] = useState([])
    const { data: userData, error, isLoading: usersIsLoading, isError: usersIsError } = useQuery(['users', {}], getAllUsers);
    const queryClient = useQueryClient()
    const createUserGoalMutation = useMutation(createUserGoal, {
        onSuccess: () => {
            queryClient.invalidateQueries('goals')
            dispatch(closeModal())
            dispatch(openPopup({ message: "Goal successfully added" }))
            socket.emit('goalCreated', { authorId: user.id, squadId: user.squadId }, "Goal Created");
        },
        onError: (err) => {
            dispatch(openPopup({ status: 'error', message: err.response.data.message }))
        }
    });

    const { data: usersData, isLoading, isError } = useQuery(['goals'], getAllUsers)

    const handleSaveUserGoal = (e) => {
        e.preventDefault()
        console.log(goalInputs)
        const updatedValue = { ...goalInputs, goalPartners: selectedItems }
        createUserGoalMutation.mutate(updatedValue)
    }

    const handleChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedItems([...selectedItems, { userId: value }]);
        } else {
            setSelectedItems(selectedItems.filter((item) => item.userId !== value));
        }
    }
    const isChecked = (id) => selectedItems.some(user => user.userId == id);
    return (
        <div onClick={(e) => e.stopPropagation()} className='w-4/5 md:w-[400px] p-5 mx-auto bg-white h-[450px] rounded-md shadow-md shadow-gray-400'>
            <h1 className='text font-bold '>Assign partners to your new goal</h1>
            <p className='mt-2 text-gray-500 text-sm'><span className='text-orange-700'>*</span>Only assigned accountabilty partners will be able to view this goal</p>
            <p className='mt-8 font-semibold'>Members</p>
            <form onSubmit={handleSaveUserGoal} action="" className="h-60 md:h-64 overflow-y-scroll mt-4 flex-col items-start">
                {userData && userData.length > 0 && userData.map(partner => (
                    user.id != partner.id && <div className="flex justify-start items-center -mb-2" key={partner.id}>
                        <Input
                            checked={isChecked(partner.id)}
                            type="checkbox"
                            value={partner.id}
                            onChange={handleChange}
                            className={"mb- 1 !m-0 text-2xl !h-6 !w-6 "} />
                        <label htmlFor="">{partner.userName}</label>
                    </div>
                ))}
                <Button
                    type={'submit'}
                    name="Save Changes"
                    style="w-full py-3 !bg-[#B175FF]"
                />
            </form>
        </div>
    )
}

export default AssignPartners