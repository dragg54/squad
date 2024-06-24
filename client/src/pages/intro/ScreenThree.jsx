/* eslint-disable react/prop-types */
import Button from "../../components/buttons"
import SliderPositionIndicator from "./components/SliderPositionIndicator"

const ScreenThree = ({screenToDisplay, sliderIndicatorActive}) => {
  return (
    <div className={`w-full h-screen absolute right-[-100%] ${screenToDisplay == "screenThree" && 'animate-slide-left right-[0%]'}`}>
        <div className="mt-10 w-full flex flex-col items-center">
        <img src="../../images/register.png" alt="" />
        <div className="w-full flex flex-col items-center px-8">
            <h1 className="mt-10 font-semibold text-xl">Collaborate with partners</h1>
            <p className="mt-5 text-gray-500 text-center">Increase your success rate by working with accountability partners </p>
        </div>
        <div className="flex gap-3 mt-4 ">
            <SliderPositionIndicator {...{isActive: sliderIndicatorActive["1"]}}/>
            <SliderPositionIndicator {...{isActive: sliderIndicatorActive["2"]}}/>
            <SliderPositionIndicator {...{isActive: sliderIndicatorActive["3"]}}/>
        </div>
        <div className="flex gap-3 mt-8">
            <Button name='Register' style={'border bg-white border-[#B175FF] !flex !justify-center w-36 !text-[#B175FF]'}/>
            <Button name='Login' style={' !flex !bg-[#B175FF] !justify-center w-36 '}/>
        </div>
        </div>
    </div>
  )
}

export default ScreenThree