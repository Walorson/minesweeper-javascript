const flags = document.getElementById("flags");
const flagCounter = document.getElementById("flagCounter");

var MAP = { x: 12, y: 12 }
var MINES_COUNT = 3;
const MIN_MAP_SIZE = 4;
const MAX_MAP_SIZE = 12;
let availableFlags;
let pointsToWin;

const config = {
    main: document.getElementById("config"),
    mapX: document.getElementById("config-mapX"),
    mapY: document.getElementById("config-mapY"),
    countOfMines: document.getElementById("config-countOfMines"),
    minesCounter: document.getElementById("config-minesCounter"),
    submit: document.getElementById("config-submit")
};

Object.keys(config).forEach((key, i) => 
{
    if(i == 1 || i == 2)
    {
        config[key].addEventListener("input", () => {
            if(config[key].value > MAX_MAP_SIZE) config[key].value = MAX_MAP_SIZE;
            if(config[key].value < MIN_MAP_SIZE) config[key].value = MIN_MAP_SIZE;
        });
    }
});

config.countOfMines.addEventListener("input",() => {
    config.minesCounter.textContent = config.countOfMines.value;
});

config.submit.addEventListener("click",() => {
    MAP.x = config.mapX.value;
    MAP.y = config.mapY.value;
    MINES_COUNT = config.countOfMines.value;

    config.main.style.display = 'none';
    flags.style.display = 'flex';
    flagCounter.textContent = MINES_COUNT;
    availableFlags = MINES_COUNT;
    pointsToWin = MINES_COUNT;
    generateBoard();
});