const $canvas = document.querySelector('#game');
const game = $canvas.getContext('2d')

const $btnUp = document.querySelector('#up')
const $btnLeft = document.querySelector('#left')
const $btnRight = document.querySelector('#right')
const $btnDown = document.querySelector('#down')
let canvasSize
let adjElementSize
let elementSize
let renElementSize
let player = {
    pX: 0,
    pY: 0,
    aColumn: 0,
    aRow: 0
}

let arr = maps
let level = 0
// console.log(game); // lap: probe


//**************************************************************************** */
// lap: functions ------------------------->

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

// lap: create a function move Up
function moveUp() {
    if (player.aRow - 1 < 0) {
        return console.log('moveUp out of the map')
    }
    console.log('moveUp')
    move('ArrowUp')
}

// lap: create a function move Down
function moveDown() {
    let vefMap = validationArrayMapSquare(arr, level)
    if (player.aRow + 2 > vefMap.length) {
        return console.log('moveDown out of the map')
    }
    console.log('moveDown')
    move('ArrowDown')
}

// lap: create a function move Left
function moveLeft() {
    if (player.aColumn - 1 < 0) {
        return console.log('moveLeft out of the map')
    }
    console.log('moveLeft')
    move('ArrowLeft')
}

// lap: create a function move Right
function moveRight() {
    let vefMap = validationArrayMapSquare(arr, level)
    if (player.aColumn + 2 > vefMap.length) {
        return console.log('moveRight out of the map')
    }
    move('ArrowRight')
}

// lap: create a function move 
function move(srtMove) {
    showPlayerProbe() // lap: probe
    let elementOrigin = findElementOrigin()

    switch (srtMove) { // lap: assign player index position
        case 'ArrowUp':
            console.log(player.aRow + ' Antes')
            player.aRow -= 1 // lap: assign player position to the Up
            console.log(player.aRow + ' Despues')
            break;
        case 'ArrowDown':
            console.log(player.aRow + ' Antes')
            player.aRow += 1 // lap: assign player position to the Down
            console.log(player.aRow + ' Despues')
            break;
        case 'ArrowLeft':
            console.log(player.aColumn + ' Antes')
            player.aColumn -= 1 // lap: assign player position to the left
            console.log(player.aColumn + ' Despues')
            break;
        case 'ArrowRight':
            console.log(player.aColumn + ' Antes')
            player.aColumn += 1 // lap: assign player position to the right
            console.log(player.aColumn + ' Despues')
            break;
        default:
            break;
    }
    renderElementReset((player.pY - renElementSize) + LapTools.findValPercentage(7.8, elementSize), (player.pX - renElementSize))
    renderElement(elementOrigin, (player.pY) + LapTools.findValPercentage(7.8, elementSize), player.pX)

    switch (srtMove) { // lap: assign player canvas position X
        case 'ArrowUp':
            player.pY -= renElementSize
            break;
        case 'ArrowDown':
            player.pY += renElementSize
            break;
        case 'ArrowLeft':
            player.pX -= renElementSize
            break;
        case 'ArrowRight':
            player.pX += renElementSize
            break;
        default:
            break;
    }
    renderElementReset((player.pY - renElementSize) + LapTools.findValPercentage(7.5, elementSize), player.pX - renElementSize + 4.5)
    // renderElement('PLAYER', (player.pY) + LapTools.findValPercentage(7.8, elementSize), player.pX)
    renderPlayer(player.pY, player.pX)

    showPlayerProbe() // lap: probe
}

// lap: create a function to show console.log probe objPlayer
function showPlayerProbe() {
    console.group('verification: ')
    console.log('player.pX: ' + player.pX) // lap: probe
    console.log('player.pY: ' + player.pY) // lap: probe
    console.log('player.aColumn: ' + player.aColumn) // lap: probe
    console.log('player.aRow: ' + player.aRow) // lap: probe
    console.log('renElementSize: ' + renElementSize) // lap: probe
    console.log('elementSize: ' + elementSize) // lap: probe
    console.groupEnd()
}


// lap: create a function find element Origin
function findElementOrigin() {
    let objMap = arr.find(element => element.level === level)
    let arrMap = objMap.map
    let lineMap = arrMap[player.aRow]
    let arrLineMap = lineMap[0].split('')
    let element = arrLineMap[player.aColumn]
    return element
}

// lap: create a function to render the player in the map
function renderPlayer(valPYc, valPXr) {
    game.fillText(emojis['PLAYER'], valPXr, valPYc)
}

function renderElement(strElement, valPXr, valPYc) {
    game.fillText(emojis[strElement], valPYc + LapTools.findValPercentage(6, elementSize), valPXr - LapTools.findValPercentage(0.56, canvasSize))
}

function renderElementReset(valPXr, valPYc) {
    game.fillStyle = '#000'
    game.fillStyle = '#fff';
    console.log('elementSize: ' + renElementSize)
    game.clearRect(valPYc + LapTools.findValPercentage(0.5, canvasSize), valPXr, renElementSize - LapTools.findValPercentage(0.4, canvasSize), elementSize - LapTools.findValPercentage(23, elementSize))
}

//************************************************************************** */
// lap: addEventListeners ------------------------->
$btnUp.addEventListener('click', moveUp)
$btnDown.addEventListener('click', moveDown)
$btnLeft.addEventListener('click', moveLeft)
$btnRight.addEventListener('click', moveRight)

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') moveUp()
    else if (e.key === 'ArrowDown') moveDown()
    else if (e.key === 'ArrowLeft') moveLeft()
    else if (e.key === 'ArrowRight') moveRight()
})

window.addEventListener('load', startGame(arr, level)) // <-- LOAD
// window.addEventListener('resize', startGame(arr, level))


// lap: create a function to start the game ------------------------->
function startGame(arr, level) {
    // lap: information about canvas size
    canvasSize = canvasSizeSquare(arr, level)
    $canvas.setAttribute('width', canvasSize * 0.75)
    $canvas.setAttribute('height', canvasSize * 0.75)

    // lap: verify matrix square
    let map = validationArrayMapSquare(arr, level)
    if (map === false) {
        return console.warn('Error: matrix square')
    }

    // lap: create of the map game acording to the arr received
    elementSize = (canvasSize / map.length)





    // lap: addEventListeners ------------------------->
    $btnUp.addEventListener('click', () => { })
    window.addEventListener('resize', () => { startGame(arr, level) })
    window.addEventListener('load', startGame(arr, level)) // <-- LOAD




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

        console.log('map.length: ' + map.length) // lap: probe

        // lap: create of the map game acording to the arr received
        elementSize = (canvasSize / map.length)
        renElementSize = elementSize - LapTools.findValPercentage(26.726, elementSize)
        let positionC = renElementSize
        let positionR = renElementSize

        game.font = renElementSize + 'px Arial'
        game.textAlign = 'right'
        for (row in map) {
            let lineMap = map[row]
            lineMap = lineMap[0].split('')
            for (let c = 0; c < lineMap.length; c++) {
                game.fillText(emojis[lineMap[c]], positionC + LapTools.findValPercentage(0.556, canvasSize), positionR)
                if (lineMap[c] === 'O') {
                    player.pX = positionC
                    player.pY = positionR
                    player.aColumn = c
                    player.aRow = Number(row)
                    showPlayerProbe() // lap: probe
                    renderPlayer(player.pY, player.pX)
                }

                positionC += renElementSize
            }
            positionC = renElementSize
            positionR += renElementSize
        }
    }
}
