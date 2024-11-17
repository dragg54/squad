import { useState } from "react"
import Button from "../../components/buttons"
import Input from "../../components/inputs"
import { useLocation } from "react-router-dom"
import { useMutation } from "react-query"
import { donate } from "../../services/donation"

const Donate = () => {
    const [inputValues, setInputValues] = useState({
        email: '',
        amount: 0
    })
    const state = useLocation().state

    const handleInputChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value })
    }

    const donateMutation = useMutation(donate,{
        onSuccess: async(res)=>{
            window.location.href = res?.data?.authorization_url
        },
        onError: (err)=> {console.log(err)}
      })

    const handleSubmit = (e) =>{
        e.preventDefault()
        const updatedInputValue = {...inputValues, donationId: state.donationId}
        donateMutation.mutate(updatedInputValue)
    }
    return (
        <section className="w-full md:w-1/2 h-screen  p-4  md:p-8 pb-40 md:pb-48 md:ml-[20rem] pb-20">
            <h1 className="text-2xl font-bold mt-4">Donate</h1>
            <p className="text-sm text-gray-500">Thank you for being kind.</p>
            <form onSubmit={handleSubmit} className="mt-10 h-[400px] md:w-4/5 md:mr-auto md:mx-0 flex flex-col gap-2 rounded-md mx-auto">
                <Input name='email' placeholder='Email' onChange={(e) => handleInputChange(e)} value={inputValues.email} />
                <Input type='number' name='amount' onChange={handleInputChange} value={inputValues?.amount} placeholder='Amount' />
                <Button type='submit' style='!bg-white border border-b-4 !text-base !py-4  mt-8 !border-purple-500 !text-purple-500 font-semibold' name='Proceed' />
            </form>
        </section>
    )
}

export default Donate