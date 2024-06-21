import ProgressChart from "./components/ProgressChart"
import QuoteBox from "./components/QuoteBox"
import Goal from "./Goal"

const Home = () => {
  return (
    <section className="w-screen h-screen overflow-y-scroll pb-40">  
      <div className="w-full p-4">
        <QuoteBox />
        <ProgressChart />
        <Goal />
      </div>
    </section>
  )
}

export default Home