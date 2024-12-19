import { goalFrequency } from "../../../constants/GoalFrequency"
import { getMonthIndex } from "../../../utils/DateFormatter"

 //Add goals according to frequency
    export function processEndDate(frequency, date, selection, setDate) {
        const year = new Date().getFullYear()
        let calendarValue
        switch (frequency) {
            case goalFrequency.daily:
                date.endDate = date.startDate
                return
            case goalFrequency.monthly:
                calendarValue = selection.selected.find(sel => sel.name == "monthNames")?.label
                if (calendarValue) {
                    var monthIndex = getMonthIndex(calendarValue)
                    setDate({
                        startDate: new Date(year, monthIndex - 1, 1),
                        endDate: new Date(year, monthIndex, 0)
                    })
                }
                return
            case goalFrequency.yearly:
                calendarValue = selection.selected.find(sel => sel.name == "years")?.label
                setDate({
                    startDate:  new Date(+calendarValue, 0, 2),
                    endDate: new Date(+calendarValue , 11, 31, 10)
                })
                return
            default:
                return
        }
    }