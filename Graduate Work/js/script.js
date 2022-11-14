'use strict';
const lvl_01 = 'https://n4kx.github.io/JS/Graduate%20Work/data/LVL_01.txt';
const lvl_02 = 'https://n4kx.github.io/JS/Graduate%20Work/data/LVL_02.txt';
const gameScript = 'https://n4kx.github.io/JS/Graduate%20Work/js/game.js';

let lvlData = null;

function loadLlvlData() {
	$.ajax(lvl_01,
		{ type: 'GET', dataType: 'text', success: lvlDataLoaded, error: errorHandler }
	);
}

function lvlDataLoaded(data) {
	lvlData = data;
	startBtn.addEventListener('click', loadGame, false);
	// console.log(lvlData);
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
		console.log('Игра запущена');
	}

	// отображаем canvas
	gameFieldCanvas.setAttribute('style', 'display: block');
	// прячем кнопку
	startBtn.setAttribute('style', 'display:none');
}