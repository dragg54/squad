import { useNavigate } from "react-router-dom"
import AddButton from "../../components/buttons/AddButton"

const Goal = () => {
  const navigate = useNavigate()
  return (
    <section>
        <div className='mt-4 w-full rounded-md p-4'>
        <div className="w-full mb-3">
          <div className="flex justify-between items-center">
          <h2 className='text-[1.1rem] md:text-xl font-semibold'>Goals for this month</h2>
          <AddButton onClick={()=>navigate("/goals")} name='Add Goal' style='!bg-white !text-gray-800 !rounded-full !border border-gray-700 items-center'/>
          </div>
            </div>
             <div className="w-full">
                <ul className="w-full">
                    <li className='goal-box !border-l-8 !border-red-700 shadow-md !border-b-4 border-b-gray-500 !rounded-2xl'><span className="ml-4">Get some good sleep</span></li>
                    <li className='goal-box !border-l-8 !border-green-700 !border-b-4 shadow-md !rounded-2xl'><span className="ml-4">Make some good savings</span></li>
                    <li className='goal-box !border-l-8 !border-green-700 !border-b-4 shadow-md !rounded-2xl'><span className="ml-4">Go to church at least twice a week</span></li>
                </ul>
            </div>
            <div className="w-full flex justify-between items-center">
             <p className="text-gray-600 underline">See all</p>
            </div>
        </div>
    </section>
  )
}

export default Goal