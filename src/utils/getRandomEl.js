const getRandomEl = (arr) => {
    const max = arr.length
    return arr?.[Math.floor(Math.random() * max)]
}

export default getRandomEl