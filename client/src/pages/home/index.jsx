import ProgressChart from "./components/ProgressChart"
import QuoteBox from "./components/QuoteBox"
import Goal from "./Goal"
import News from "./News"
import Quotes from "./Quotes"

const Home = () => {
  return (
    <section className="w-screen h-screen overflow-x-visible md:-ml-20 overflow-y-scroll pb-40">  
      <div className="w-full md:w-1/2 mx-auto p-4">
        <QuoteBox />
        <ProgressChart />
        <Goal />
        <div className="mt-4">
          <img src="../../images/planning.png" alt="" />
        </div>
        <News />
        <Quotes />
      </div>
    </section>
  )
}

export default Home