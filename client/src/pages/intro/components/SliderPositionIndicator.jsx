/* eslint-disable react/prop-types */

const SliderPositionIndicator = ({isActive}) => {

  return (
    <div  className={`w-12 h-4 rounded-lg ${isActive? 'bg-[#B175FF]' : 'bg-gray-300'}`}>

    </div>
  )
}

export default SliderPositionIndicator