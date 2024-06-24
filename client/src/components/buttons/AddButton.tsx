import React from 'react'
import Button from './'
import { FaPlus } from "react-icons/fa6";


const AddButton = () => {
  return (
    <Button onClick={()=>null} name="Add" icon={<FaPlus />} style="!bg-[#B175FF]"/>
  )
}

export default AddButton