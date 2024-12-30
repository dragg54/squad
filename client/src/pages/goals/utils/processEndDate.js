import { goalFrequency } from "../../../constants/GoalFrequency"
import { getMonthIndex } from "../../../utils/DateFormatter"

 //Add goals according to frequency
    export function processEndDate(frequency, date, selection, setDate) {
        const year = new Date().getFullYear()
        let calendarValue
        switch (frequency.value) {
            case goalFrequency.daily:
                setDate({
                    startDate: new Date(new Date(date.startDate).setHours(0, 1, 0, 999)),
                    endDate: new Date(new Date(date.startDate).setHours(23, 59, 59, 999))
                })
                return
            case goalFrequency.monthly:
                calendarValue = selection.selected.find(sel => sel.name == "monthNames")?.label
                if (calendarValue) {
                    var monthIndex = getMonthIndex(calendarValue)
                    setDate({
                        startDate: new Date(year, monthIndex, 1),
                        endDate: new Date(year, monthIndex, 1)
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