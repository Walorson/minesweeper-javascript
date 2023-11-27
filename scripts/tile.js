let globalID = 0;
const tiles = [];
let firstMove = false;

class Tile {
    constructor(posX, posY) {
        this.id = globalID;
        this.x = posX;
        this.y = posY;
        this.value = 0; // 0 - 8 - value / 9 - mine
        this.frontValue = 10; // 10 - normal / 11 - flagged
        this.isFlag = false;
        this.AdjacentTiles = [];

        this.init();
    }
    getDiv() { return document.getElementById("tile"+this.id); }
    init() {
        game.innerHTML += `<img src="img/${this.frontValue}.png" id="tile${this.id}">`;
        globalID++;
        this.findAdjacentTiles();
    }
    update() {
        this.getDiv().onclick = () => this.reveal();
        this.getDiv().oncontextmenu = (e) => {
            e.preventDefault();
            this.flag();
        }
    }
    findAdjacentTiles() {
        this.AdjacentTiles = [getID(this.x, this.y+1),getID(this.x+1, this.y+1), getID(this.x+1, this.y),getID(this.x+1, this.y-1),getID(this.x, this.y-1),getID(this.x-1, this.y-1),getID(this.x-1, this.y),getID(this.x-1, this.y+1)];

        this.AdjacentTiles = this.AdjacentTiles.filter(tile => tile >= 0 && tile <= (MAP.x * MAP.y) - 1);
    }
    reveal(ignoreMines = false) {
        if(this.isFlag) return;

        if(firstMove == false) {
            randPool[this.id] = undefined;
            this.AdjacentTiles.forEach(item => {
                randPool[item] = undefined;
            });
            randPool = randPool.purgeFromUndefined();
            generateMines();
            firstMove = true;
        }

        this.frontValue = 0;
        this.getDiv().setAttribute("src",`img/${this.value}.png`);
        this.getDiv().oncontextmenu = (e) => e.preventDefault();

        if(ignoreMines == true) return;

        if(this.value == 0) 
            this.revealAdjacentHiddenTiles();
        else if(this.value == 9)
            endGame(false);

    }
    flag() {
        if(!this.isFlag && availableFlags > 0) { 
            this.frontValue = 11; 
            this.isFlag = true;
            availableFlags--;
            if(this.value == 9) pointsToWin--;
            if(pointsToWin <= 0) endGame(true);
        } 
        else if(this.isFlag) { 
            this.frontValue = 10; 
            this.isFlag = false; 
            availableFlags++;
            if(this.value == 9) pointsToWin++;
        }
        flagCounter.textContent = availableFlags;

        this.getDiv().setAttribute("src",`img/${this.frontValue}.png`);
    }
    setMine() {
        this.value = 9;
        this.AdjacentTiles.forEach(tile => {
            if(tiles[tile].value < 9) tiles[tile].value++;
        });
    }
    revealAdjacentTiles() {
        for(let i=0; i<this.AdjacentTiles.length; i++) {
            tiles[this.AdjacentTiles[i]].reveal();
        }
    }
    revealAdjacentHiddenTiles() {
        for(let i=0; i<this.AdjacentTiles.length; i++) {
            if(tiles[this.AdjacentTiles[i]].frontValue == 10) {
                tiles[this.AdjacentTiles[i]].reveal();
            }
        }
    }
}
function revealAll() {
    tiles.forEach(tile => tile.reveal(true));
}
function getID(x, y) {
    if(x < 0 || x > MAP.x-1 || y < 0 || y > MAP.y-1) return;
    return y * MAP.y + x;
}