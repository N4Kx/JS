'use strict';
const lvl_01 = 'http://127.0.0.1:5500/TEST/data/LVL_01.txt';
const lvl_02 = 'http://127.0.0.1:5500/TEST/data/LVL_02.txt';
const gameScript = 'http://127.0.0.1:5500/TEST/js/game.js';

let lvlData = null;

function loadLlvlData() {
	$.ajax(lvl_01,
		{ type: 'GET', dataType: 'text', success: lvlDataLoaded, error: errorHandler }
	);
}

function lvlDataLoaded(data) {
	lvlData = data;
	startBtn.addEventListener('click', loadGame, false);
	console.log(lvlData);
}

function errorHandler(jqXHR, statusStr, errorStr) {
	console.log(statusStr + ' ' + errorStr);
}

loadLlvlData();

// находим кнопку
const startBtn = document.querySelector('#startTheGame');


// находим область отрисовки
const gameFieldCanvas = document.querySelector('#gameField');
gameFieldCanvas.setAttribute('style', 'display: none');

function loadGame() {
	// функция игры
	function loadGameScript() {
		$.ajax(gameScript,
			{ type: 'GET', dataType: 'script', success: loadMessage, error: errorHandler }
		);
	}
	loadGameScript();

	function loadMessage(data) {
		let gameSound = new Audio('audio/main_sound.wav');
		gameSound.loop = true;
		gameSound.currentTime = 0;
		gameSound.volume = 0.05;
		gameSound.play();
		console.log('Игра запущена');
	}

	// отображаем canvas
	gameFieldCanvas.setAttribute('style', 'display: block');
	startBtn.setAttribute('style', 'display:none');
}