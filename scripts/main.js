const game = document.getElementById("game");
const flagCounter = document.getElementById("flagCounter");
flagCounter.textContent = MINES_COUNT;
let randPool = [];
function generateBoard() {

    for(let i=0; i<MAP.y; i++) {
        for(let j=0; j<MAP.x; j++) {
            randPool.push(globalID);
            tiles.push(new Tile(j, i));
        }
    }
    tiles.forEach(tile => tile.update());
}
function generateMines() {
    for(let i=0; i<MINES_COUNT; i++) {
        let rand = Math.floor(Math.random()*randPool.length);
        
        tiles[randPool[rand]].setMine();
        randPool = randPool.delete(rand);
    }
}
function endGame(isWin) {
    const background = new Background();
    if(!isWin) {
        background.insertText("Bomb has been exploded! You lost!");
        background.insertButton("Try Again", () => location.reload());
    }
    else {
        background.insertText("You won! You flagged all mines correctly!");
        background.insertButton("Play Again",() => location.reload());
    }
}
generateBoard();

window.addEventListener("contextmenu",(e) => e.preventDefault());