const $canvas = document.querySelector('#game');
const game = $canvas.getContext('2d')
console.log(game);

// lap: tools -------------------------------------------------------------------------//





// lap: create a function to return the canvas size for square form
function canvasSizeSquare() {
    // console.log('tamañoPantalla an * al => ' + window.innerWidth + ' * ' + window.innerHeight) // lap: probe
    let heightScreen = window.innerHeight
    let widthScreen = window.innerWidth
    return Math.min(heightScreen, widthScreen)
}


window.addEventListener('load', startGame)
window.addEventListener('resize', startGame)

function startGame() {
    let canvasSize = canvasSizeSquare()

    $canvas.setAttribute('width', canvasSize * 0.75)
    $canvas.setAttribute('height', canvasSize * 0.75)

    let matrix = 11
    let elementSize = (canvasSize / matrix)
    // console.log('elementSize: ' + elementSize) // lap: probe
    let renElementSize = elementSize - LapTools.findValPercentage(26.726, elementSize)
    let positionC = renElementSize
    let positionR = renElementSize
    // console.log('renElementSize: ' + Number(renElementSize.toFixed(1)), 'canvasSize: ' + canvasSize) // lap: probe
    game.font = renElementSize + 'px Arial'
    game.textAlign = 'right'
    for (let r = 0; r < matrix; r++) {
        for (let c = 0; c < matrix; c++) {
            game.fillText(emojis['X'], positionC + LapTools.findValPercentage(0.556, canvasSize), positionR)
            positionC += renElementSize
        }
        positionC = renElementSize
        positionR += renElementSize
    }

}