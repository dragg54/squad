/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "react-query"
import Button from "./buttons"
import Input from "./inputs"
import { updateUser } from "../services/user"
import { openPopup } from "../redux/reducers/PopUpReducer"
import { responseStatus } from "../constants/ResponseStatus"
import { useState } from "react"
import { closeModal } from "../redux/reducers/GlobalModalReducer"
import { useDispatch } from "react-redux"

const EditProfile = ({username, bio, id}) => {
    const [inputValues, setInputValues] = useState({
        userName: username,
        bio
    })
    const dispatch= useDispatch()
    const queryClient = useQueryClient()
    const updateUserMutation = useMutation(updateUser,
        {
            onSuccess:() => {
                queryClient.invalidateQueries('member')
                dispatch(closeModal())
                dispatch(openPopup({message: "Profile successfully updated"}))
            },
            onError:() => {
                dispatch(closeModal())
                dispatch(openPopup({message: "Failed to complete request", status: responseStatus.error}))
            },
            onSettled:() => closeModal()
        }
    )

    const handleChange = (e) =>{
        setInputValues({...inputValues, [e.target.name]: e.target.value})
    }

    const handleUpdateUser = (e) =>{
        e.preventDefault()
        updateUserMutation.mutate({...inputValues, id})
    }
  return (
    <div  onClick={(e) => e.stopPropagation()} className="w-[75%] p-4 h-[60%] md:w-[26%] md:h-[50%] mt-10 bg-white rounded-md shadow-gray-400 shadow-sm">
        <p className="font-semibold text-xl mb-3">Edit your profile</p>
       <form onSubmit={(e)=>handleUpdateUser(e)} action="" className="flex flex-col gap-3">
        <Input onChange={handleChange}  name="userName" placeholder="Username" value={inputValues.userName}/>
        <Input onChange={handleChange} style={"border border-gray-300"} value={inputValues.bio} type="text-area" height={20} name="bio" placeholder="Bio"/>
        <div className="mt-8 ml-auto flex gap-1">
            <Button onClick={()=> dispatch(closeModal())} name="Cancel" style={'!rounded-full !py-3 !bg-gray-100 !text-gray-500! !text-gray-600 border !border-gray-300'}/>
        <Button type={'submit'} name={'Save'} style={' !rounded-full !py-3 '}/>
        </div>
       </form>
    </div>
  )
}

export default EditProfile