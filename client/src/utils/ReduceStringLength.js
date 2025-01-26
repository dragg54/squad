export const reduceStringLength = (string, maximumMobileLength, maximumDesktopLength) => {
    const screenWidth = window.innerWidth;
    if (string && maximumMobileLength && maximumDesktopLength) {
        return (screenWidth < 600 && string.length > maximumMobileLength) ? string.substring(0, maximumMobileLength) + "..." : (screenWidth > 600 && string.length > maximumDesktopLength) ? string.substring(0, maximumDesktopLength) + "..." : string
    }
}