const flags = document.getElementById("flags");
const flagCounter = document.getElementById("flagCounter");

const MAP = { x: 8, y: 8 }
var MINES_COUNT = 3;
const MIN_MAP_SIZE = 4;
const MAX_MAP_SIZE = 12;
let MAX_MINES_COUNT = 55;
let availableFlags;
let pointsToWin;
let theme = "dark";

window.addEventListener("load", () => {
    if(sessionStorage.getItem("mapX") != "null")
        MAP.x = sessionStorage.getItem("mapX");
    if(sessionStorage.getItem("mapY") != "null")
        MAP.y = sessionStorage.getItem("mapY");
    if(sessionStorage.getItem("minesCount") != "null")
        MINES_COUNT = sessionStorage.getItem("minesCount");
    if(sessionStorage.getItem("theme") != "null")
        theme = sessionStorage.getItem("theme");
});

const config = {
    main: document.getElementById("config"),
    mapX: document.getElementById("config-mapX"),
    mapY: document.getElementById("config-mapY"),
    countOfMines: document.getElementById("config-countOfMines"),
    minesCounter: document.getElementById("config-minesCounter"),
    theme: document.getElementById("config-theme"),
    submit: document.getElementById("config-submit")
};

Object.keys(config).forEach((key, i) => 
{
    if(i == 1 || i == 2)
    {
        config[key].addEventListener("input", () => {
            if(config[key].value > MAX_MAP_SIZE) config[key].value = MAX_MAP_SIZE;
            if(config[key].value < MIN_MAP_SIZE) config[key].value = MIN_MAP_SIZE;
			
			MAP.x = config.mapX.value;
			MAP.y = config.mapY.value;
			
			MAX_MINES_COUNT = (MAP.x * MAP.y) - 9;
			config.countOfMines.setAttribute("max",MAX_MINES_COUNT);
			config.minesCounter.textContent = config.countOfMines.value;
        });
    }
});

config.countOfMines.addEventListener("input",() => {
    config.minesCounter.textContent = config.countOfMines.value;
});

config.submit.addEventListener("click",() => {
    MINES_COUNT = config.countOfMines.value;

    config.main.style.display = 'none';
    flags.style.display = 'flex';
    flagCounter.textContent = MINES_COUNT;
    availableFlags = MINES_COUNT;
    pointsToWin = MINES_COUNT;
    theme = config.theme.value;
    document.getElementById("flags-img").setAttribute("src",`themes/${theme}/11.png`);

    sessionStorage.setItem("mapX", MAP.x);
    sessionStorage.setItem("mapY", MAP.y);
    sessionStorage.setItem("minesCount", MINES_COUNT);
    sessionStorage.setItem("theme", theme);

    generateBoard();
});