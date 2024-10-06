const extractPercepcion = (str: string) => {
    return str.slice(79, 93)
}

const formatNumber = (number: string) => {
    const withOutZeros = number.replace(/^0+/, '')
    return parseFloat(withOutZeros.replace(',', '.'))
}

const sicore = (sicore: string, sicoreError: string) => {
    const lines = sicore.trim().split('\n')
    const lines_error = sicoreError.trim().split('\n')

    const partStr = lines_error.map(line => {
        const firstPart = line.slice(0, 52).trim()
        const secondPart = line.slice(66).trim()
        return {
            firstPart,
            secondPart
        }
    })

    const netosGravados = lines_error.map(line => {
        const percepcion = formatNumber(extractPercepcion(line))
        return (percepcion / 0.03)
            .toFixed(2)
            .replace('.', ',')
            .padStart(14, '0')
    })

    const lines_correct = partStr.map(({ firstPart, secondPart }, i) => {
        return `${firstPart}${netosGravados[i]}${secondPart}`.trim()
    })

    const allLines = [...lines, ...lines_correct].join('\n')

    return new Blob([...allLines], { type: 'text/plain' })
}

export default sicore
