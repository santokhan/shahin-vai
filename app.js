const fs = require('fs')

// const numberString = fs.readFileSync('./src/SSBGT-24.txt', 'utf8')
const numberString = fs.readFileSync('./src/numbers', 'utf8')

const numberList = numberString.split('\n').map(x => x.trim())

function filterDuplicate(list = []) {
    return list.reduce((acc = [], x = '') => {
        if (!acc.includes(x)) {
            acc.push(x)
        }
        return acc
    }, [])
}

function customFilter(list = []) {
    const bdList = []
    const otherList = []

    list.forEach(x => {
        if (x) {
            if (x.startsWith('880')) {
                if (bdList.includes(x) === false) {
                    bdList.push('+'+x)
                }
            } else {
                if (otherList.includes(x) === false) {
                    otherList.push('+'+x)
                }
            }
        }
    })

    fs.mkdirSync('./output', { recursive: true })

    fs.writeFileSync('./output/bd.txt', bdList.join('\n'))
    fs.writeFileSync('./output/others.txt', otherList.join('\n'))

    return { bdList, otherList }
}

const filtered = customFilter(numberList)

console.log(filtered)