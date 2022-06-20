function parseCandle (l) {
    const d = l

    const open = parseFloat(d[1])
    const high = parseFloat(d[2])
    const low = parseFloat(d[3])
    const close = parseFloat(d[4])

    if (isNaN(open)) {
        return null
    }

    const date = parseInt(d[0])
    return [date, open, high, low, close]
}

export default parseCandle
