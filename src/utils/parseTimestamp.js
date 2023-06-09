const parseTimestamp = (timestapm) => {
    const monthInArr =  ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    const date = new Date(timestapm)
    const hours = date?.getHours() < 10 ? `0${date?.getHours()}` : date?.getHours()
    const minutes = date?.getMinutes() < 10 ? `0${date?.getMinutes()}` : date?.getMinutes()
    const year = date?.getFullYear()
    const data = date?.getDate()
    const month = monthInArr[date?.getMonth()]
    const monthInNumber = date?.getMonth() + 1 < 10 ? '0' + (date?.getMonth() + 1) : date?.getMonth() + 1

    return {
        hours,
        minutes,
        year,
        data,
        month,
        monthInNumber
    }
}

export default parseTimestamp