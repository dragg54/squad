/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import Button from "../../components/buttons"
import SliderPositionIndicator from "./components/SliderPositionIndicator"

const ScreenThree = ({screenToDisplay, sliderIndicatorActive}) => {
  const navigate = useNavigate()
  return (
    <div className={`w-full h-screen absolute right-[-100%] ${screenToDisplay == "screenThree" && 'animate-slide-left right-[0%]'}`}>
        <div className="mt-10 w-full flex flex-col items-center">
        <img src="../../images/register.png" alt="" />
        <div className="w-full flex flex-col items-center px-8">
            <h1 className="mt-10 font-semibold text-xl">Get started</h1>
            <p className="mt-5 text-gray-500 text-center">Start making your goals achievable </p>
        </div>
        <div className="flex gap-3 mt-4 ">
            <SliderPositionIndicator {...{isActive: sliderIndicatorActive["1"]}}/>
            <SliderPositionIndicator {...{isActive: sliderIndicatorActive["2"]}}/>
            <SliderPositionIndicator {...{isActive: sliderIndicatorActive["3"]}}/>
        </div>
        <div className="flex gap-3 mt-8">
            {/* <Button onClick={()=> navigate("/register")} name='Register' style={'border bg-white border-[#B175FF] !flex !justify-center w-36 !text-[#B175FF]'}/> */}
            <Button onClick={()=> navigate("/login")} name='Next' style={' !flex !bg-[#B175FF] !justify-center w-36 '}/>
        </div>
        </div>
    </div>
  )
}

export default ScreenThree