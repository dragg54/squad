import GoalCard from "./components/GoalCard"

const Goals = () => {
  return (
    <section className="p-6 h-screen overflow-y-scroll pb-40 ">
        <div className="mb-5">
        <h1 className="font-semibold">Explore goals</h1>
        <p className="text-sm text-gray-500 ">See others achievements and help them track their goals</p>
        </div>
        <GoalCard />
        <GoalCard />
        <GoalCard />
        <GoalCard />
        <GoalCard />
        <GoalCard />
    </section>
  )
}

export default Goals