'use strict';

const lvl_01 = '/Graduate%20Work/data/LVL_01.json';
const lvl_02 = '/Graduate%20Work/data/LVL_02.json';
const gameScript = '/Graduate%20Work/js/game.js';


let lvlData = null;

function loadLlvlData(lvl) {
	$.ajax(lvl,
		{ type: 'GET', dataType: 'text', success: lvlDataLoaded, error: errorHandler }
	);
}

function lvlDataLoaded(data) {
	startBtn.addEventListener('click', loadGame, false);
	lvlData = JSON.parse(data);
	// console.log(lvlData);
}

function errorHandler(jqXHR, statusStr, errorStr) {
	console.log(statusStr + ' ' + errorStr);
}

loadLlvlData(lvl_01);


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

const gameScoreElem = document.querySelector('#score');
const restChestsElem = document.querySelector('#chests');
const collectedChestsElem = document.querySelector('#collected');
const soundBtn = document.querySelector('#soundTrackStart');

// кнопка сохранить игру
const saveTheGame = document.querySelector('#saveGameBtn');

// кнопка загрузить уровень 2
const loalLvlBtn = document.querySelector('#loadLvl2');

//поле имени игрока
const playerNameElem = document.querySelector('#playerName');

// константы для работы с внешним хранилищем данных
const ajaxHoFScript = "https://fe.it-academy.by/AjaxStringStorage2.php";	// адрес скрипта для хранилища данных;
const strName = 'RUBAN_DIGGER_HALL_OF_FAME';		// имя запроса