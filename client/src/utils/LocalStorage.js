export const addToLocalStorage = (name, value) =>{
    
        console.log('saving to localstorage')
        localStorage.setItem(name, value)
}

export const getFromLocalStorage = (name) =>{
    const item = localStorage.getItem(name)
    return item
}

export const removeFromLocalStorage = (name) =>{
    localStorage.removeItem(name)
}