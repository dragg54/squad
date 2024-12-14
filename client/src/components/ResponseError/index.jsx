/* eslint-disable react/prop-types */
import { BiSolidError } from "react-icons/bi";

import Button from "../buttons"
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/reducers/GlobalModalReducer";
import { TbReload } from "react-icons/tb";

const ResponseError = ({message, refetch}) => {
  const dispatch = useDispatch()
  const errorMessage = "Sorry, your request couldn't be complete."
  return (
    <div className={`w-[300px] md:mt-0 mt-14  shadow-sm shadow-gray-300  h-[230px] border-gray-300 flex flex-col items-center justify-center border bg-white p-3 text-sm rounded-sm `}>
      <BiSolidError className="text-red-500 text-3xl mb-3"/>
      <p className="font-sembold text-xl mb-2">Something went wrong</p>
      <p className="text-gray-400">{message || errorMessage}</p>
      <p className="text-gray-400"> Please try again</p>
      <Button icon={<TbReload className="text-xl"/>} onClick={()=>{
        refetch()
        dispatch(closeModal())
      }} style={'!bg-gray-900 !rounded-full mt-6 !text-sm'} name='Retry'/>
    </div>
  )
}

export default ResponseError