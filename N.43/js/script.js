'use strict'

const fieldBGColor = '#EFEE77';	//	цвет игрового поля
const fieldWidth = 1200;		//	ширина игрового поля
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
leftPlayerElem.style.backgroundColor = leftPlayerColor;
leftPlayerElem.style.position = 'absolute';


const rightPlayerElem = document.querySelector('.right_player');
rightPlayerElem.style.backgroundColor = rightPlayerColor;
rightPlayerElem.style.position = 'absolute';

//========================================================================================================
// формируем мячик

const ballElem = document.querySelector('.ball');
ballElem.style.backgroundColor = ballColor;
ballElem.style.position = 'absolute';
ballElem.style.borderRadius = circle;

// хэш параметры левого игрока
let leftPlayerH = {
	posX: 0,
	posY: fieldCenterY - playerHeight / 2,
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

// хэш параметры правого игрока
let rightPlayerH = {
	posX: fieldWidth - playerWidth,
	posY: fieldCenterY - playerHeight / 2,
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

// хэш параметры мячика
let ballH = {
	posX: ballCenterX,
	posY: ballCenterY,
	speedX: 0,
	speedY: 0,
	width: ballRadius,
	height: ballRadius,

	update: function () {
		ballElem.style.left = this.posX + 'px';
		ballElem.style.top = this.posY + 'px';
		ballElem.style.height = this.height + 'px';
		ballElem.style.width = this.width + 'px';
	}
}

// хэш счёт
let scoreH = {
	scoreLeft: 0,
	scoreRight: 0,

	update: function () {
		scoreLeft.innerHTML = this.scoreLeft;
		scoreRight.innerHTML = this.scoreRight;
	}
}

// хэш параметры игрового поля
let fieldH = {
	width: fieldWidth,
	height: fieldHeight,
}

// функция обработчика событий по нажатию на кнопку
function startGame(eo) {
	eo = eo || window.event;
	randomizeBall(ballH);

	ballH.posX = ballCenterX;
	ballH.posY = ballCenterY;

	btnElem.value = 'Рестарт!';

	window.addEventListener('keydown', movePlayer, false);
	window.addEventListener('keyup', stopPlayer, false);
	btnElem.removeEventListener('click', startGame, false);
}

//=========================================================================
function randomizeBall() {
	let a = randomDiap(0, 100);	// коэффициент для выбора знака по оси X
	let b = randomDiap(0, 100);	// коэффициент для выбора знака по оси Y

	const ballSpeedX = randomDiap(4, 8);	// случайная скорость по оси X в диапазоне от a до b
	const ballSpeedY = randomDiap(1, 5);	// случайная скорость по оси Y в диапазоне от a до b

	(a % 2 == 0) ? a = -1 : a = 1; // если a - чётное - то коэфф. отрицательный, иначе а - положительный
	ballH.speedX = ballSpeedX * a;	// задание значения и направления скорости по оси X


	(b % 2 == 0) ? b = -1 : b = 1; // если b - чётное - то коэфф. отрицательный, иначе а - положительный
	ballH.speedY = ballSpeedY * b;	// задание значения и направления скорости по оси Y
}

// функция обработчика событи по нажатию и отпусканию кнопок управления - управление игроками
function movePlayer(eo) {
	if (eo.code == 'ShiftLeft') {
		eo.preventDefault();
		leftPlayerH.speedY = -3;
	}
	if (eo.code == 'ControlLeft') {
		eo.preventDefault();
		leftPlayerH.speedY = 3;
	}
	if (eo.code == 'ArrowUp') {
		eo.preventDefault();
		rightPlayerH.speedY = -3;
	}
	if (eo.code == 'ArrowDown') {
		eo.preventDefault();
		rightPlayerH.speedY = 3;
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

// функция для остановки игроков
function endRound() {
	leftPlayerH.speedY = 0;
	rightPlayerH.speedY = 0;
}

// получение целого случайного числа в заданном диапазоне от n до m
function randomDiap(n, m) {
	return Math.floor(
		Math.random() * (m - n + 1)
	) + n;
}

function updateGame() {
	//===========================================================================
	// левй игрок
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
	//===========================================================================
	// правый игрок
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
	//===========================================================================
	// мячик
	ballH.posX += ballH.speedX;
	ballH.posY += ballH.speedY;

	// проверям достиг ли мячик правой стенки
	if (ballH.posX > (fieldH.width - ballH.width)) {
		ballH.posX = (fieldH.width - ballH.width);
		ballH.speedX = 0;
		ballH.speedY = 0;
		scoreH.scoreLeft += 1;
		endRound();
		window.removeEventListener('keydown', movePlayer, false);
		btnElem.addEventListener('click', startGame, false);
	}
	// проверям достиг ли мячик левой стенки
	if (ballH.posX < 0) {
		ballH.posX = 0;
		ballH.speedX = 0;
		ballH.speedY = 0;
		scoreH.scoreRight += 1;
		endRound();
		window.removeEventListener('keydown', movePlayer, false);
		btnElem.addEventListener('click', startGame, false);
	}
	// проверяем достиг ли мячик верхней стенки, если достиг - он отпрыгивает с той же скоростью
	if (ballH.posY <= 0) {
		ballH.speedY = ballH.speedY * (-1);
		ballH.posY = 0;
	}
	// проверяем достиг ли мячик нижней стенки, если достиг - он отпрыгивает с той же скоростью
	if (ballH.posY > (fieldH.height - ballH.height)) {
		ballH.speedY = ballH.speedY * (-1);
		ballH.posY = fieldH.height - ballH.height;
	}

	// проверяем отбила ли левая ракетка мячик
	// подлетая к правой границе левого игрока проверяем находится ли левый игрок напротив мячика
	const offsetBall = ballH.height / 3;	// поправочный коэффициент из-за закругления мячика
	const leftPlayerBorderX = leftPlayerH.posX + leftPlayerH.width;
	const leftPlayerBorderY0 = leftPlayerH.posY - offsetBall;
	const leftPlayerBorderY1 = leftPlayerH.posY + leftPlayerH.height + offsetBall;

	const ballLeftBorderX = ballH.posX;
	const ballLeftBorderY = ballH.posY + ballH.height / 2;

	if (ballLeftBorderX < leftPlayerBorderX) {
		if (ballLeftBorderY > leftPlayerBorderY0 && ballLeftBorderY < leftPlayerBorderY1) {
			ballH.posX = 0 + leftPlayerH.width;
			ballH.speedX = -ballH.speedX;
			// console.log('Левый ОТБИЛ!');
		}
	}

	// проверяем отбила ли правая ракетка мячик
	// подлетая к левой границе правого игрока проверяем находится ли правый игрок напротив мячика
	const rightPlayerBorderX = rightPlayerH.posX;
	const rightPlayerBorderY0 = rightPlayerH.posY - offsetBall;
	const rightPlayerBorderY1 = rightPlayerH.posY + rightPlayerH.height + offsetBall;

	const ballRightBorderX = ballH.posX + ballH.width;
	const ballRightBorderY = ballH.posY + ballH.height / 2;

	if (ballRightBorderX > rightPlayerBorderX) {
		if (ballRightBorderY > rightPlayerBorderY0 && ballRightBorderY < rightPlayerBorderY1) {
			ballH.posX = fieldH.width - ballH.width - rightPlayerH.width;
			ballH.speedX = -ballH.speedX;
			// console.log('Правый ОТБИЛ!');
		}
	}

	leftPlayerH.update();
	rightPlayerH.update();
	ballH.update();
	// scoreH.update();

	requestAnimationFrame(updateGame);
}

// функция обработчик по загрузке страницы, устанавливает начальные параметры игроков и таймер
window.onload = () => {
	leftPlayerH.update();
	rightPlayerH.update();
	ballH.update();
	// scoreH.update();
	// setInterval(updateGame, 500);
	requestAnimationFrame(updateGame);
};