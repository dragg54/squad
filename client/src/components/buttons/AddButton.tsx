import React from 'react'
import Button from './'
import { FaPlus } from "react-icons/fa6";


const AddButton = ({name, style, type, onClick}) => {
  return (
    <Button type={type} onClick={onClick || function(){return null}} name={name || "Add"} icon={<FaPlus />} style={`!bg-[#B175FF] ${style}`}/>
  )
}

export default AddButton