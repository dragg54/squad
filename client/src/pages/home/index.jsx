import { getFromLocalStorage } from "../../utils/LocalStorage"
import ProgressChart from "./components/ProgressChart"
import QuoteBox from "./components/QuoteBox"
import NewGoal from "./NewGoal"
import News from "./News"
import Quotes from "./Quotes"

const Home = () => {
  const monthlyProgressPathName = getFromLocalStorage('monthlyProgress')
  if (monthlyProgressPathName) {
    window.location.href = monthlyProgressPathName +'&seen=true'
  }
  else {
    return (
      <section className="w-screen h-screen overflow-x-visible md:-ml-20 overflow-y-scroll pb-40">
        <div className="w-full md:w-2/5 mx-auto p-4">
          <QuoteBox />
          <ProgressChart />
          <NewGoal />
          {/* <div className="mt-4">
            <img src="../../images/planning.png" alt="" />
          </div>
          <News />
          <Quotes /> */}
        </div>
      </section>
    )
  }
}

export default Home