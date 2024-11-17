export const reduceStringLength = (string, maximumMobileLength, maximumDesktopLength) =>{
    if(maximumMobileLength && maximumDesktopLength){
        return {
            mobile: string.length > maximumMobileLength ? string.subString(0, maximumMobileLength)+ "...": string,
            desktop:string.length > maximumDesktopLength ? string.subString(0, maximumDesktopLength) +"...": string
        }
    }
}