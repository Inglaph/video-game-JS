const $canvas = document.querySelector('#game');
const game = $canvas.getContext('2d')

const $btnUp = document.querySelector('#up')
const $btnLeft = document.querySelector('#left')
const $btnRight = document.querySelector('#right')
const $btnDown = document.querySelector('#down')
const $messages = document.querySelector('.messages')

let $divLiveShow
let $divTimeShow

let timeEmptyReload = 500
let canvasSize
let adjElementSize
let elementSize
let renElementSize
let initialTime
let gameTime
let finishTime
let control = false

let player = {
    beginMap: true,
    live: 3,
    level: 0,
    pX: 0,
    pY: 0,
    aColumn: 0,
    aRow: 0,
}

let arr = maps
let level = 0
// console.log(game); // lap: probe



//**************************************************************************** */

// lap: write a function for change color canvas
function changeColorCanvas(color) {
    game.fillStyle = "green "
    game.fillRect(0, 0, canvasSize, canvasSize)
}

// lap: functions ------------------------->
function showTime() {
    let counterTime = Date.now() - initialTime
    let seconds = Math.floor(counterTime / 1000)
    let minutes = Math.floor(seconds / 60)
    $spanTime.innerHTML = `${minutes} : ${seconds % 60} :${parseInt((counterTime % 1000) / 10)}`
}

// lap: create a function to start time game level
function startTimeLevel() {
    let starTime = Date.now()
    return starTime
}

function renderDivMessages() {
    $divLiveShow = document.createElement('div')
    $divLiveShow.classList.add('div-lives')
    $messages.appendChild($divLiveShow)

    $divTimeShow = document.createElement('div')
    $divTimeShow.classList.add('div-time')
    $messages.appendChild($divTimeShow)

    $divScoreShow = document.createElement('div')
    $divScoreShow.classList.add('div-score')
    $messages.appendChild($divScoreShow)
}

// lap: create a function to render section .messages
function renderMessages() {

    // lap: render lives ***************//
    let $lives = document.querySelector('.lives')
    if ($lives) {
        $lives.innerHTML = ''
    }
    if ($lives === null) {
        console.log('intro en vefLives to create the p')
        $lives = document.createElement('p')
        $labelLives = document.createElement('span')
        $labelLives.classList.add('label-lives')
        $labelLives.innerText = 'Lives: '

    }
    $lives.classList.add('lives')
    $divLiveShow.appendChild($lives)
    $lives.appendChild($labelLives)


    // lap: render time ***************//
    let $time = document.querySelector('.times')
    if ($time) {
        $time.innerHTML = ''
    }
    if ($time === null) {
        $time = document.createElement('p')
        $time.classList.add('times')
        $labelTime = document.createElement('span')
        $labelTime.classList.add('label-time')
        $labelTime.innerText = 'Time: '
        $spanTime = document.createElement('span')
        $spanTime.classList.add('time')
        $spanTime.innerText = '00 : 00 : 00'

    }

    $time.classList.add('times')

    $divTimeShow.appendChild($time)
    $time.appendChild($labelTime)
    $time.appendChild($spanTime)

    for (let i = 0; i < player.live; i++) {
        const $span = document.createElement('span')
        $span.classList.add('live')
        $span.innerText = emojis['L']
        $lives.appendChild($span)
    }

    if (player.live === 0) {
        $lives.classList.remove('lives')
        $lives.classList.add('lives--empty')
    }

    // lap: score stage ***************//
    renderScore()
}

// lap:create a function to render score of stage
function renderScore() {
    let $score = document.querySelector('.score')
    if ($score) {
        $score.innerHTML = ''
    }
    if ($score === null) {
        $score = document.createElement('p')
        $score.classList.add('score')
    }

    $divScoreShow.appendChild($score)
    // $time.appendChild($labelTime)
    // $time.appendChild($spanTime)

    for (let p = 1; p < 4; p++) {
        let showLocalStorageGame = String('recordGame' + '-L-' + player.level + '-' + p)
        console.log(showLocalStorageGame + ': ' + localStorage.getItem(showLocalStorageGame))

        $labelScore = document.createElement('span')
        $labelScore.classList.add('label-score')

        if (p === 1) $labelScore.innerText = emojis['ONE']
        else if (p === 2) $labelScore.innerText = emojis['TWO']
        else if (p === 3) $labelScore.innerText = emojis['THREE']

        $score.appendChild($labelScore)

        $spanScore = document.createElement('span')
        $spanScore.classList.add('score-time')
        if (localStorage.getItem(showLocalStorageGame)) {
            $spanScore.innerText = localStorage.getItem(showLocalStorageGame)
        }
        $score.appendChild($spanScore)
    }

    if (player.live === 0) {
        $lives.classList.remove('lives')
        $lives.classList.add('lives--empty')
    }





}

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
    let vefMap = validationArrayMapSquare(arr, player.level)
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
    let vefMap = validationArrayMapSquare(arr, player.level)
    if (player.aColumn + 2 > vefMap.length) {
        return console.log('moveRight out of the map')
    }
    move('ArrowRight')
}

// lap: create a function move --------------------< MOVE >
function move(srtMove) {
    showPlayerProbe() // lap: probe

    let elementOrigin = findElementOrigin()

    switch (srtMove) { // lap: assign player index position
        case 'ArrowUp':
            player.aRow -= 1 // lap: assign player position to the Up
            break;
        case 'ArrowDown':
            player.aRow += 1 // lap: assign player position to the Down
            break;
        case 'ArrowLeft':
            player.aColumn -= 1 // lap: assign player position to the left
            break;
        case 'ArrowRight':
            player.aColumn += 1 // lap: assign player position to the right
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

    if (player.beginMap == true) {
        initialTime = startTimeLevel()
        gameTime = setInterval(showTime, 100);
        player.beginMap = false
    }
    console.log('initialTime: ' + initialTime)

    let elementNext = findElementOrigin()
    renderElementReset((player.pY - renElementSize) + LapTools.findValPercentage(7.5, elementSize), player.pX - renElementSize + LapTools.findValPercentage(2.9, elementSize))
    if (elementNext === '-' || elementNext === 'O') {
        renderPlayer(player.pY, player.pX)
    } else if (elementNext === 'X') {
        renderElement('BOMB_COLLISION', (player.pY) + LapTools.findValPercentage(7.8, elementSize), player.pX - LapTools.findValPercentage(7.8, elementSize))
        player.beginMap = false
        player.live -= 1
        renderMessages()
        switch (srtMove) { // lap: assign player index position
            case 'ArrowUp':
                player.aRow += 1 // lap: assign player position to the Up
                break;
            case 'ArrowDown':
                player.aRow -= 1 // lap: assign player position to the Down
                break;
            case 'ArrowLeft':
                player.aColumn += 1 // lap: assign player position to the left
                break;
            case 'ArrowRight':
                player.aColumn -= 1 // lap: assign player position to the right
                break;
            default:
                break;
        }
        switch (srtMove) { // lap: assign player canvas position X
            case 'ArrowUp':
                player.pY += renElementSize
                break;
            case 'ArrowDown':
                player.pY -= renElementSize
                break;
            case 'ArrowLeft':
                player.pX += renElementSize
                break;
            case 'ArrowRight':
                player.pX -= renElementSize
                break;
            default:
                break;
        }
        setTimeout(() => {
            if (player.live <= 0) {
                alert('GAME OVER') // ---------< GAME OVER >
                location.reload()
            }
            startGame(arr, player.level)
            renderElement('PLAYER', (player.pY) + LapTools.findValPercentage(7.8, elementSize), player.pX - LapTools.findValPercentage(7.8, elementSize))
            console.log('Estatus after bomb: ') // lap: probe
            showPlayerProbe() // lap: probe
        }, timeEmptyReload)
    } else if (elementNext === 'I') { //---------- < WIN >
        renderElement('WIN', (player.pY) + LapTools.findValPercentage(7.8, elementSize), player.pX)
        console.log(`Ganaste el nivel ${player.level} `) // lap: probe

        // lap: stop and record game time
        clearInterval(gameTime);
        let endTime = Date.now();
        let time = endTime - initialTime;
        console.log(`Time game: ${time} ms`);
        let varLocalStorageGame
        for (let p = 1; p < 4; p++) {
            varLocalStorageGame = String('recordGame' + '-L-' + player.level + '-' + p)
            if (!localStorage.getItem(varLocalStorageGame)) {
                localStorage.setItem(varLocalStorageGame, time)
                break;
            } else if (localStorage.getItem(varLocalStorageGame) && time < localStorage.getItem(varLocalStorageGame)) {
                if (p <= 2) {
                    let pDown = p + 1
                    let varLocalStorageGameB = String('recordGame' + '-L-' + player.level + '-' + pDown)
                    localStorage.setItem(varLocalStorageGameB, localStorage.getItem(varLocalStorageGame))
                }
                localStorage.setItem(varLocalStorageGame, time)
                break;
            }
        }
        if (player.level < maps.length - 1) {
            player.level += 1
            player.beginMap = true
            setTimeout(() => {
                startGame(arr, player.level)
                showPlayerProbe() // lap: probe
            }, timeEmptyReload);
        } else {
            alert('YOU WIN')
            location.reload()
        }


    } else {
        console.log('elementNext: ' + elementNext)
    }
    showPlayerProbe() // lap: probe
}

// lap: create a function to show console.log probe objPlayer
function showPlayerProbe() {
    // console.group('verification: ')
    // console.log('player.live: ' + player.live) // lap: probe
    // console.log('player.level: ' + player.level) // lap: probe
    // console.log('player.beginMap: ' + player.beginMap) // lap: probe
    // console.log('player.pX: ' + player.pX) // lap: probe
    // console.log('player.pY: ' + player.pY) // lap: probe
    // console.log('player.aColumn: ' + player.aColumn) // lap: probe
    // console.log('player.aRow: ' + player.aRow) // lap: probe
    // console.log('renElementSize: ' + renElementSize) // lap: probe
    // console.log('elementSize: ' + elementSize) // lap: probe
    // console.groupEnd()
}


// lap: create a function find element Origin
function findElementOrigin() {
    let objMap = arr.find(element => element.level === player.level)
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
    game.fillText(
        emojis[strElement],
        valPYc + LapTools.findValPercentage(6, elementSize),
        valPXr - LapTools.findValPercentage(0.56, canvasSize),
        renElementSize
    )
}

function renderElementReset(valPXr, valPYc) {
    game.fillStyle = '#000'
    game.fillStyle = '#fff';
    console.log('elementSize: ' + renElementSize)
    game.clearRect(valPYc + LapTools.findValPercentage(0.4, canvasSize), valPXr, renElementSize - LapTools.findValPercentage(0.4, canvasSize), elementSize - LapTools.findValPercentage(23, elementSize))
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

window.addEventListener('load', () => {
    startGame(arr, level) // <-- LOAD
    renderMessages()
})

// window.addEventListener('resize', startGame(arr, level))


// lap: create a function to start the game ------------------------->
function startGame(arr, level) {
    control = true
    // lap: information about canvas size
    canvasSize = canvasSizeSquare(arr, level)
    $canvas.setAttribute('width', canvasSize * 0.75)
    $canvas.setAttribute('height', canvasSize * 0.75)

    renderDivMessages()
    renderMessages()



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
                    if (player.beginMap == true) {
                        player.pX = positionC
                        player.pY = positionR
                        player.aColumn = c
                        player.aRow = Number(row)
                        showPlayerProbe() // lap: probe
                        renderPlayer(player.pY, player.pX)
                    }
                }

                positionC += renElementSize
            }
            positionC = renElementSize
            positionR += renElementSize
        }

        if (player.beginMap == false) {
            renderPlayer
        }

    }

}
