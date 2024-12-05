import { BiErrorCircle } from "react-icons/bi";
import Button from "../../components/buttons";

const InsufficientPoint = () => {
    return (
        <div className='w-[300px] h-[350px] bg-white p-4 gap-2 flex justify-center flex-col items-center'>
            <BiErrorCircle className="text-3xl text-red-500" />
            <p className="font-semibold text-xl">Insufficient Point</p>
            <p className="text-sm">
                Sorry! You do not have sufficient points to complete this transaction. Keep on completing your goals and interacting to earn points.
            </p>
            <Button name='Back to shop' style={'!bg-gray-800 mt-4 !text-white !rounded-full'}/>
        </div>
    )
}

export default InsufficientPoint