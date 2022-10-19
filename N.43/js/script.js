'use strict'

const fieldBGColor = '#EFEE77';	//	цвет игрового поля
const fieldWidth = 800;		//	ширина игрового поля
const fieldHeight = 500;	//	высота игрового поля
const fieldCenterX = fieldWidth / 2;	//	вычисляем центр поля по оси X
const fieldCenterY = fieldHeight / 2;	// вычисляем центр поля по оси Y

const playerWidth = fieldWidth / 100;	// ширина игрока
const playerHeight = fieldHeight / 3;	// высота игрока

const ballColor = '#E61B32';	// цвет мячика
const ballRadius = playerHeight / 3;	// радиус мячика
const ballCenterX = fieldCenterX - ballRadius / 2;	// вычисляем центр мячика
const ballCenterY = fieldCenterY - ballRadius / 2;	// вычисляем центр мячика
const circle = '50%';	// Радиус закругления мячика

const leftPlayerColor = '#36AA53';	// цвет левого игрока
const rightPlayerColor = '#1E179A';	//	цвет правого игрока
const fontSize = Math.round(fieldHeight / 10);	//	задаем высоту шрифта
const fontFamily = 'sans-serif';	//	задаем шрифт

//========================================================================================================
// формируем шапку с кнопкой и счетом
const headerElem = document.querySelector('.header');
headerElem.style.width = fieldWidth + 'px';
headerElem.style.position = 'relative';

const btnElem = document.querySelector('#start_Btn');
btnElem.value = 'Старт!';
btnElem.style.position = 'absolute';
btnElem.style.top = fontSize / 4 + 'px';
const btnElemWidth = btnElem.offsetWidth;

btnElem.addEventListener('click', startGame, false);

function startGame(eo) {
	eo = eo || window.event;
	console.log(eo);

	btnElem.value = 'Рестарт!';

	btnElem.removeEventListener('click', startGame, false);
}

const spanWrapperElem = document.querySelector('.span__wrapper');
spanWrapperElem.style.display = 'flex';
spanWrapperElem.style.justifyContent = 'center';


const scoreLeft = document.querySelector('.score_green');
const scoreRight = document.querySelector('.score_blue');

const scoreSpan = document.querySelectorAll('span');

scoreSpan.forEach((elem) => {
	elem.style.fontSize = fontSize + 'px';
	elem.style.fontFamily = fontFamily;
});
scoreLeft.innerHTML = '0';
scoreRight.innerHTML = '0';

//========================================================================================================
// формируем игровое поле

const fieldElem = document.querySelector('.field');

fieldElem.style.width = fieldWidth + 'px';
fieldElem.style.height = fieldHeight + 'px';
fieldElem.style.backgroundColor = fieldBGColor;
fieldElem.style.position = 'relative';

//========================================================================================================
// формируем игроков

const leftPlayerElem = document.querySelector('.left_player');
// leftPlayerElem.style.height = playerHeight + 'px';
// leftPlayerElem.style.width = playerWidth + 'px';
leftPlayerElem.style.backgroundColor = leftPlayerColor;
leftPlayerElem.style.position = 'absolute';


const rightPlayerElem = document.querySelector('.right_player');
// rightPlayerElem.style.height = playerHeight + 'px';
// rightPlayerElem.style.width = playerWidth + 'px';
rightPlayerElem.style.backgroundColor = rightPlayerColor;
rightPlayerElem.style.position = 'absolute';
// rightPlayerElem.style.top = '100px';
// rightPlayerElem.style.left = fieldWidth - playerWidth + 'px';

window.addEventListener('keydown', movePlayer, false);
window.addEventListener('keyup', stopPlayer, false);

function movePlayer(eo) {
	if (eo.code == 'ShiftLeft') {
		eo.preventDefault();
		leftPlayerH.speedY = -10;
	}
	if (eo.code == 'ControlLeft') {
		eo.preventDefault();
		leftPlayerH.speedY = 10;
	}
	if (eo.code == 'ArrowUp') {
		eo.preventDefault();
		rightPlayerH.speedY = -10;
	}
	if (eo.code == 'ArrowDown') {
		eo.preventDefault();
		rightPlayerH.speedY = 10;
	}
}

function stopPlayer(eo) {
	if (eo.code == 'ShiftLeft' || eo.code == 'ControlLeft') {
		eo.preventDefault();
		leftPlayerH.speedY = 0;
	}
	if (eo.code == 'ArrowUp' || eo.code == 'ArrowDown') {
		eo.preventDefault();
		rightPlayerH.speedY = 0;
	}

}

//========================================================================================================
// формируем мячик

const ballElem = document.querySelector('.ball');
ballElem.style.backgroundColor = ballColor;
ballElem.style.height = ballRadius + 'px';
ballElem.style.width = ballRadius + 'px';
ballElem.style.backgroundColor = ballColor;
ballElem.style.position = 'absolute';
ballElem.style.left = ballCenterX + 'px';
ballElem.style.top = ballCenterY + 'px';
ballElem.style.borderRadius = circle;

let leftPlayerH = {
	posX: 0,
	posY: ballCenterY - playerHeight / 2,
	speedY: 0,
	width: playerWidth,
	height: playerHeight,

	update: function () {
		leftPlayerElem.style.top = this.posY + 'px';
		leftPlayerElem.style.left = this.posX + 'px';
		leftPlayerElem.style.width = this.width + 'px';
		leftPlayerElem.style.height = this.height + 'px';
	}
}

let rightPlayerH = {
	posX: fieldWidth - playerWidth,
	posY: ballCenterY - playerHeight / 2,
	speedY: 0,
	width: playerWidth,
	height: playerHeight,

	update: function () {
		rightPlayerElem.style.top = this.posY + 'px';
		rightPlayerElem.style.left = this.posX + 'px';
		rightPlayerElem.style.width = this.width + 'px';
		rightPlayerElem.style.height = this.height + 'px';
	}
}

let fieldH = {
	width: fieldWidth,
	height: fieldHeight,
}






window.onload = () => {
	leftPlayerH.update();
	rightPlayerH.update();
	setInterval(updateGame, 40)
};


function updateGame() {
	leftPlayerH.posY += leftPlayerH.speedY;
	// проверяем достиг ли левый игрок верхней границы поля
	if (leftPlayerH.posY <= 0) {
		leftPlayerH.posY = 0;
		leftPlayerH.speedY = 0;
	}
	// проверяем достиг ли левый игрок нижней границы поля
	if (leftPlayerH.posY > (fieldH.height - leftPlayerH.height)) {
		leftPlayerH.posY = (fieldH.height - leftPlayerH.height);
		leftPlayerH.speedY = 0;
	}

	rightPlayerH.posY += rightPlayerH.speedY;
	// проверяем достиг ли правый игрок верхней границы поля
	if (rightPlayerH.posY <= 0) {
		rightPlayerH.posY = 0;
		rightPlayerH.speedY = 0;
	}
	// проверяем достиг ли правый игрок нижней границы поля
	if (rightPlayerH.posY > (fieldH.height - leftPlayerH.height)) {
		rightPlayerH.posY = (fieldH.height - leftPlayerH.height);
		rightPlayerH.speedY = 0;
	}


	leftPlayerH.update();
	rightPlayerH.update();
}