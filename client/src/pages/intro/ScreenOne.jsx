/* eslint-disable react/prop-types */
import Button from "../../components/buttons"
import SliderPositionIndicator from "./components/SliderPositionIndicator"

const ScreenOne = ({screenToDisplay, setScreenToDisplay, slidePosition, setSlidePosition, sliderIndicatorActive, setSliderIndicatorActive}) => {

  return (
    <div className={`w-screen h-screen  ${slidePosition == "left" && screenToDisplay !="screenOne" && 'animate-slide-left opacity-0'}`}>
        <div className="mt-12 w-full flex flex-col items-center">
        <img src="../../images/organize.png" alt="" />
        <div className="w-full flex flex-col items-center px-8">
            <h1 className="mt-10 font-semibold text-xl">Organize your goals</h1>
            <p className="mt-5 text-gray-500 text-center">Create your goals and organize them to enhance progress and increase achievements </p>
        </div>
        <div className="flex gap-3 mt-4 ">
            <SliderPositionIndicator {...{isActive: sliderIndicatorActive["1"]}}/>
            <SliderPositionIndicator {...{isActive: sliderIndicatorActive["2"]}}/>
            <SliderPositionIndicator {...{isActive: sliderIndicatorActive["3"]}}/>
        </div>
        <div className="flex gap-3 mt-8">
            <Button  name='Skip' style={'border bg-white border-[#B175FF] !flex !justify-center w-36 !text-[#B175FF]'}/>
            <Button onClick={()=>{
                 setSlidePosition("left")
                 setScreenToDisplay("screenTwo")
                 setSliderIndicatorActive({...sliderIndicatorActive , 1: false, 2: true})
                 console.log(sliderIndicatorActive)
            }} name='Next' style={'!flex !bg-[#B175FF] !justify-center w-36 '}/>
        </div>
        </div>
    </div>
  )
}

export default ScreenOne