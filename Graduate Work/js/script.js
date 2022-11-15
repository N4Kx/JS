'use strict';
const pageOrigin = window.location.origin;

const lvl_01 = pageOrigin + '/Graduate%20Work/data/LVL_01.txt';
const lvl_02 = pageOrigin + '/Graduate%20Work/data/LVL_02.txt';
const gameScript = pageOrigin + '/Graduate%20Work/js/game.js';

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
// находим обёртку кнопок
const btnWrapper = document.querySelector('#btn__wrapper');

const gameWrapper = document.querySelector('#main__wrapper');
gameWrapper.classList.toggle('hidden');

// находим область отрисовки
const gameFieldCanvas = document.querySelector('#gameField');

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
	gameWrapper.classList.toggle('hidden');
	btnWrapper.classList.toggle('hidden');
}