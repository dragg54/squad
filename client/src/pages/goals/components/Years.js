export const getYears = (numberOfYears) =>{
    let currentYear = new Date().getFullYear()
    const allYears = [currentYear]
    while(numberOfYears > 1){
        currentYear += 1
        numberOfYears  = numberOfYears - 1
        allYears.push(currentYear)
    }
    return allYears
}