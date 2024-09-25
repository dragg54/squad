export const capitalizeHeader = (string) => {
    const arrStr = string.split(" ");
    
    const capitalizedArr = arrStr.map(str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    });

    return capitalizedArr.join(" ");
}