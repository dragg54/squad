import React from 'react'
import Button from './'
import { FaPlus } from "react-icons/fa6";


const AddButton = ({name, style, type, onClick, disabled}) => {
  return (
    <Button disabled={disabled} type={type} onClick={onClick || function(){return null}} 
    name={name || "Add"} icon={<FaPlus />} 
    style={`!bg-[#9619b2] ${style}`}/>
  )
}

export default AddButton