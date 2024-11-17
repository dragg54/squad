import Button from "../../components/buttons"
import Input from "../../components/inputs"
import {useMutation, useQueryClient} from 'react-query'
import { createDonation } from "../../services/donation"
import { useDispatch } from "react-redux"
import { openPopup } from "../../redux/reducers/PopUpReducer"
import { useState } from "react"
import { closeModal } from "../../redux/reducers/GlobalModalReducer"
import { useNavigate } from "react-router-dom"

const CreateDonation = () => {
  const dispatch = useDispatch()
  const [inputValues, setInputValues] = useState({
    reason: '',
    targetAmount: 0
  })
 const navigate = useNavigate()
  const queryClient = useQueryClient();
  const postDonationMutation = useMutation(createDonation,{
    onSuccess: async()=>{
      await queryClient.invalidateQueries(['donations']);
      dispatch(openPopup({message: "Donation created"}))
      navigate(-1)
    },
    onError: (err)=> {console.log(err)}
  })
  const [targetDate, setTargetDate] = useState(new Date())
  
  const handleSubmitDonation = (e) =>{
    e.preventDefault()
    const updatedValue = {...inputValues, targetDate: new Date(targetDate)}
    postDonationMutation.mutate(updatedValue)
  }

  const handleInputChange = (e) =>{
    setInputValues({...inputValues, [e.target.name]: e.target.value})
  }

  return (
    <section className="w-full md:w-3/5  h-screen  p-4  md:p-8 pb-40 md:pb-48 md:ml-[20rem] pb-20">
        <h1 className="text-2xl font-bold mt-4">Create Donation</h1>
        <p className="text-sm text-gray-500">Create donations to allow people start making a raise for a specific goal.</p>
        <form onSubmit={handleSubmitDonation} className="mt-10 h-[400px] md:w-4/5 md:mr-auto md:mx-0 flex flex-col gap-2 rounded-md mx-auto">
            <Input name='reason' placeholder='Reason' onChange={(e)=>handleInputChange(e)} value={inputValues.reason}/>
            <Input type='number' name='targetAmount' onChange={handleInputChange} value={inputValues?.targetAmount} placeholder='Target Amount'/>
            <Input value={targetDate} 
                type='date' 
                style='!text-gray-600 !py-4'
                data={targetDate}
                done={(prop) => {
                    dispatch(closeModal())
                    setTargetDate(prop)
                }}
                name='targetDate' 
                placeholder='Target Date'
             />
            <Button type='submit' style='!bg-white border border-b-4 !text-base !py-4  mt-8 !border-purple-500 !text-purple-500 font-semibold' name='Create Donation'/>
        </form>
    </section>
  )
}

export default CreateDonation