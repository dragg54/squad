import { useState } from "react"
import ScreenOne from "./ScreenOne"
import ScreenTwo from "./ScreenTwo"
import ScreenThree from "./ScreenThree"

const Intro = () => {
    const [slidePosition, setSlidePosition] = useState("")
    const [screenToDisplay, setScreenToDisplay ] = useState("screenOne")
    const [sliderIndicatorActive, setSliderIndicatorActive ] = useState({
        1 : true,
        2: false,
        3: false
    })
  return (
    <section className="relative flex">
        <ScreenOne {...{screenToDisplay, setScreenToDisplay, slidePosition, setSlidePosition, sliderIndicatorActive, setSliderIndicatorActive}}/>
        <ScreenTwo {...{screenToDisplay, setScreenToDisplay, slidePosition, setSlidePosition, sliderIndicatorActive, setSliderIndicatorActive}}/>
        <ScreenThree {...{screenToDisplay, setScreenToDisplay, slidePosition, setSlidePosition, sliderIndicatorActive, setSliderIndicatorActive}}/>
    </section>
  )
}

export default Intro