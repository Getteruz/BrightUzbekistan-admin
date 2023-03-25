export const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getFromLocalStorage = (key, defaultValue = {}) => {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue))
}