/* eslint-disable react/prop-types */
import { FaChevronDown } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/reducers/GlobalModalReducer";
import Selection from "./Selection";


const SelectInput = ({ style, data, done, placeholder, value }) => {
    const dispatch = useDispatch()
    return (
        <div onClick={()=>{
            dispatch(openModal({component: <Selection />, props: {data, done, value}}))
        }} className={`w-full p-3 border rounded-md border-gray-400 text-gray-500 flex justify-between cursor-pointer ${style}`}>
           <p> {placeholder}</p>
           <p><FaChevronDown /></p>
        </div>
    )
}

export default SelectInput