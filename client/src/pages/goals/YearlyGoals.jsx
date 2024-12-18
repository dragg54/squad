/* eslint-disable react/prop-types */

import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"
import MonthlyGoalCard from "./MonthlyGoalCard"

const YearlyGoals = ({ data }) => {
    console.log(Object.keys(data))
    const [openYearGoalsContainer, setOpenYearGolsContainer] = useState(Object.keys(data).map(yearGoal => ({
        [yearGoal]: false
    }
    )))

    const toggleCardContainerModal = (year) => {
        const currentContainer = openYearGoalsContainer.find(st => Object.keys(st)[0] == year)
        const filteredGoals = openYearGoalsContainer.filter(st => Object.keys(st)[0] != year)
        setOpenYearGolsContainer([...filteredGoals, { [year]: !currentContainer[year] }])
    }
    return (
        <div className='w-full'>
            {
                data && Object.keys(data).map((year, index) =>
                (
                    <div className="w-full" key={index} >
                        <div className='w-full mb-2 cursor-pointer hover:shadow-sm justify-between  items-center font-bold text-xl border-2 h-28 p-6 flex  rounded-md shadow-md shadow-gray-500'>
                            {year}
                            {openYearGoalsContainer.find(st => st[year]) ? <FaChevronUp
                                onClick={() => toggleCardContainerModal(year)}
                                style={{ cursor: "pointer" }} /> : <FaChevronDown
                                onClick={() => toggleCardContainerModal(year)}
                                style={{ cursor: "pointer" }} />}
                        </div>
                        {Object.values(openYearGoalsContainer.find(yr => Object.keys(yr)[0] == year))[0]
                            && < MonthlyGoalCard key={index} {...{ goals: data && data[year] }} />}
                    </div>
                )
                )
            }
        </div>
    )
}

export default YearlyGoals