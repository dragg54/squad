import AddButton from "../../components/buttons/AddButton"

const Goal = () => {
  return (
    <section>
        <div className='mt-4 w-full rounded-md p-4'>
        <div className="w-full mb-6">
            <h2 className='text-xl font-semibold'>Goals for this month</h2>
            <div className="mt-1 w-1/5 bg-[#8155BA] h-1"></div>
            </div>
             <div className="w-full">
                <ul className="w-full">
                    <li className='goal-box !border-l-8 !border-red-500'><span className="ml-4">Get some good sleep</span></li>
                    <li className='goal-box !border-l-8 !border-green-500'><span className="ml-4">Make some good savings</span></li>
                    <li className='goal-box !border-l-8 !border-green-500'><span className="ml-4">Go to church at least twice a week</span></li>
                </ul>
            </div>
            <div className="w-full flex">
            <AddButton />
            </div>
        </div>
    </section>
  )
}

export default Goal