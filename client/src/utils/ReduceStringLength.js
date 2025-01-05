export const reduceStringLength = (string, maximumMobileLength, maximumDesktopLength) =>{
    if(string && maximumMobileLength && maximumDesktopLength){
        return {
            mobile: string.length > maximumMobileLength ? string.substring(0, maximumMobileLength)+ "...": string,
            desktop: string.length > maximumDesktopLength ? string.substring(0, maximumDesktopLength) +"...": string
        }
    }
}