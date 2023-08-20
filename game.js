const $canvas = document.querySelector('#game');
const game = $canvas.getContext('2d')
let arr = maps
let level = 1

console.log(game);

// lap: create a function to return the canvas size for square form 
function canvasSizeSquare() {
    let heightScreen = window.innerHeight
    let widthScreen = window.innerWidth
    return Math.min(heightScreen, widthScreen)
}

// lap: create a function to verify the array the map es square
function validationArrayMapSquare(arr, level) {
    let arrMap = arr.find(element => element.level === level)
    let verifyRows = arrMap.map.length
    let vefResult = true
    arrMap.map.forEach((element, index) => {
        for (let vefC = 0; vefC < element.length; vefC++) {
            if (element[vefC].length != verifyRows) {
                vefResult = false
            }
        }
    });

    if (vefResult === false) {
        return false
    } else {
        return arrMap.map
    }
}

// window.addEventListener('load', startGame(arr, level)) // <-- LOAD
window.addEventListener('resize', startGame(arr, level))

// lap: create a function to start the game ------------------------->
function startGame(arr, level) {
    // lap: information about canvas size
    let canvasSize = canvasSizeSquare(arr, level)
    $canvas.setAttribute('width', canvasSize * 0.75)
    $canvas.setAttribute('height', canvasSize * 0.75)

    // lap: verify matrix square
    let map = validationArrayMapSquare(arr, level)
    if (map === false) {
        return console.warn('Error: matrix square')
    }

    // lap: create of the map game acording to the arr received
    let elementSize = (canvasSize / map.length)
    let renElementSize = elementSize - LapTools.findValPercentage(26.726, elementSize)
    let positionC = renElementSize
    let positionR = renElementSize
    game.font = renElementSize + 'px Arial'
    game.textAlign = 'right'
    for (row in map) {
        let lineMap = map[row]
        lineMap = lineMap[0].split('')
        for (let c = 0; c < lineMap.length; c++) {
            game.fillText(emojis[lineMap[c]], positionC + LapTools.findValPercentage(0.556, canvasSize), positionR)
            positionC += renElementSize
        }
        positionC = renElementSize
        positionR += renElementSize
    }
}