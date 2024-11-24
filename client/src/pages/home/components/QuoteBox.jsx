import { useState } from 'react'
import Slider from '../../../components/slider'
import { Quote } from '../constants/quotes'

const QuoteBox = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  console.log(Quote())
  return (
    <div className=" mt-3  justify-center items-center bg-gradient-to-b from-[#8155BA] to-[#FE5BD6] h-[170px] shadow-md shadow-gray-200 rounded-md">
        <Slider height="100%" imgs={Quote()} autoplay={true} setActiveIndex={setActiveIndex} activeIndex={activeIndex} width="100%"/>
    </div>
  )
}

export default QuoteBox