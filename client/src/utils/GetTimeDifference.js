import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInWeeks } from "date-fns";

export function getTimeDifference(deadLine) {
    const diffInMonths = differenceInMonths(new Date(deadLine), new Date())
    const diffInWeeks = differenceInWeeks(new Date(deadLine), new Date())
    const diffInDays = differenceInDays(new Date(deadLine), new Date())
    const diffInHours = differenceInHours(new Date(deadLine), new Date())
    const diffInMinutes = differenceInMinutes(new Date(deadLine), new Date())

    if (diffInMonths > 0) return `${diffInMonths} months`
    else if (diffInWeeks > 0) return `${diffInWeeks} weeks`
    else if (diffInDays > 0) return `${diffInDays} days`
    else if (diffInHours > 0) return `${diffInHours} hours`
    else if (diffInMinutes > 0) return `${diffInMinutes} minutes`
}