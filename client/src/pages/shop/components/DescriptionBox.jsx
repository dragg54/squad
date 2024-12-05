/* eslint-disable react/prop-types */
import Image from "../../../components/containers/Image"

const DescriptionBox = ({image, text}) => {
  return (
    <div className='w-1/2 md:h-36 h-20 mt-4 rounded-md items-center gap-2 flex md:justify-start justify-between shadow-md py-4 px-3 shadow-gray-200 border border-gray-200'>
        <Image source={image} style={'w-2/5 h-full !border-none'}/>
        <div className="">
          <h1 className="md:text-[0.9rem] text-[0.55rem] font-semibold">{text.primaryText}</h1>  
          <p className="text-[0.45rem] md:text-[0.7rem]">{text.secondaryText}</p> 
        </div>
    </div>
  )
}

export default DescriptionBox 