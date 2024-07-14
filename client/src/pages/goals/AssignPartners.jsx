import { useDispatch } from "react-redux"
import Button from "../../components/buttons"
import Input from "../../components/inputs"
import { closeModal } from "../../redux/reducers/GlobalModalReducer"

const AssignPartners = () => {
    const dispatch = useDispatch()
    return (
        <div onClick={(e) => e.stopPropagation()} className='w-4/5 p-5 mx-auto bg-white h-[450px] rounded-md shadow-md shadow-gray-400'>
            <h1 className='text font-bold '>Assign partners to your new goal</h1>
            <p className='mt-2 text-gray-500 text-sm'><span className='text-orange-700'>*</span>Only assigned accountabilty partners will be able to view this goal</p>
            <p className='mt-8 font-semibold'>Members</p>
            <form action="" className="h-40 overflow-y-scroll mt-4 flex-col items-start">
                <div className="flex justify-start mb-4 items-center">            
                    <Input type="checkbox" style={"!w-12 mb-4 !m-0 text-2xl !h-6 !w-6 !mr-3"}/>
                    <label htmlFor="">Jibex</label>
                </div>
                <div className="flex justify-start mb-4 items-center">            
                    <Input type="checkbox" style={"!w-12 mb-4 !m-0 text-2xl !h-6 !w-6 !mr-3"}/>
                    <label htmlFor="">Tricia</label>
                </div>
                <div className="flex justify-start mb-4 items-center">            
                    <Input type="checkbox" style={"!w-12 mb-4 !m-0 text-2xl !h-6 !w-6 !mr-3"}/>
                    <label htmlFor="">Malacia</label>
                </div>
                <div className="flex justify-start mb-4 items-center">            
                    <Input type="checkbox" style={"!w-12 mb-4 !m-0 text-2xl !h-6 !w-6 !mr-3"}/>
                    <label htmlFor="">Cabex</label>
                </div>
                <div className="flex justify-start mb-4 items-center">            
                    <Input type="checkbox" style={"!w-12 mb-4 !m-0 text-2xl !h-6 !w-6 !mr-3"}/>
                    <label htmlFor="">JJ Minta</label>
                </div>
            </form>
                <Button onClick={()=>dispatch(closeModal())} name="Save Changes" style="mt-10 w-full py-3 !bg-[#B175FF]"/>
        </div>
    )
}

export default AssignPartners