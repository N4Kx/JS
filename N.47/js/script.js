'use strict'
let gameState = 0; // переменная состояния игры
// 0	-	игра остановлена
// 1	-	игра запущена

const bodyWidth = 1200;		//	ширина игрового интерфейса
const bodyHeight = 650;		//	высота игрового интерфейса

const headerHeight = 50;
const scoreWidth = headerHeight;
const scoreFontSize = headerHeight / 2;
const scorefontFamily = 'sans-serif';	//	задаем шрифт

const scoreSeparatorX = bodyWidth / 2;				// координата X для разделител счета 
const leftPlayerScoreX = scoreSeparatorX - 50;	// координата X для счета левого игрока
const rightPlayerScoreX = scoreSeparatorX + 30;	// координата X для счета правого игрока
const scoreY = headerHeight * 0.8;					// координата Y для всех элементов счета

const fieldWidth = bodyWidth;	// ширина игрового поля
const fieldHeight = bodyHeight - headerHeight;	// высота игрового поля

const btnColor = '#D9D9D3';	// цвет кнопки

const fieldBGColor = '#EFEE77';	//	цвет игрового поля
const fieldX = 0;									// координата X игрового поля
const fieldY = bodyHeight - fieldHeight;	// координата Y игрового поля
const fieldCenterX = fieldWidth / 2;	//	вычисляем центр поля по оси X
const fieldCenterY = fieldHeight / 2 + headerHeight;	// вычисляем центр поля по оси Y

const playerWidth = fieldWidth / 100;	// ширина игрока
const playerHeight = fieldHeight / 3;	// высота игрока
const playerSpeed = fieldHeight / 100;	// скорость игрока

const leftPlayerColor = '#36AA53';	// цвет левого игрока
const leftPlayerX = fieldX;			// координата Х левого игрока
const leftPlayerY = (fieldY + fieldHeight) / 2 - playerHeight / 2;	// координата Y левого игрока по середине поля

const rightPlayerColor = '#1E179A';	//	цвет правого игрока
const rightPlayerX = fieldWidth - playerWidth;	// координата X правого игрока
const rightPlayerY = (fieldY + fieldHeight) / 2 - playerHeight / 2;	//  координата Y правого игрока по середине поля

const ballColor = '#E61B32';								// цвет мячика
const ballRadius = playerHeight / 6;					// радиус мячика
const ballCenterX = fieldCenterX - ballRadius / 2;	// вычисляем центр мячика
const ballCenterY = fieldCenterY - ballRadius / 2;	// вычисляем центр мячика

const bodyElem = document.querySelector('body');

//========================================================================================================
// добавляем тег SVG где будем рисовать игру

const svgBodyElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgBodyElem.setAttribute('width', bodyWidth);
svgBodyElem.setAttribute('height', bodyHeight);
bodyElem.prepend(svgBodyElem);

//========================================================================================================
// создаем шапку
//========================================================================================================
// создаем кнопку

const btnBody = document.createElementNS('http://www.w3.org/2000/svg', 'g');
svgBodyElem.prepend(btnBody);

btnBody.onclick = start;

// создаем тело кнопки
const btnElem = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
const btnWidth = headerHeight * 3;
const btnHeight = headerHeight / 2;
const btnX = fieldX;
const btnY = headerHeight / 2 - btnHeight / 2;

btnElem.setAttribute('width', btnWidth);
btnElem.setAttribute('height', btnHeight);
btnElem.setAttribute('x', btnX);
btnElem.setAttribute('y', btnY);
btnElem.setAttribute('fill', btnColor);

btnBody.prepend(btnElem);

// создаем текст в кнопке
const btnTextElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
const btnTextWidth = btnWidth / 2;
const btnTextFontSize = headerHeight / 3;
const btnTextCenterX = btnWidth / 2;
const btnTextCenterY = btnY + btnHeight / 2 + btnTextFontSize / 4;

btnTextElem.setAttribute('x', btnTextCenterX);
btnTextElem.setAttribute('y', btnTextCenterY);
btnTextElem.setAttribute('textLength', btnTextWidth);
btnTextElem.setAttribute('text-anchor', 'middle');
btnTextElem.style.fontSize = btnTextFontSize + 'px';
btnTextElem.innerHTML = 'Старт!';

btnBody.append(btnTextElem);

//========================================================================================================
// создаем блок со счетом
// создаем счет для левого игрока
const leftPlayerScoreElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');

leftPlayerScoreElem.setAttribute('x', leftPlayerScoreX);
leftPlayerScoreElem.setAttribute('y', scoreY);
leftPlayerScoreElem.style.fontSize = scoreFontSize;
leftPlayerScoreElem.style.fontFamily = scorefontFamily;

// leftPlayerScoreElem.innerHTML = '0';
svgBodyElem.append(leftPlayerScoreElem);

// создаем счет для правого игрока
const rightPlayerScoreElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');

rightPlayerScoreElem.setAttribute('x', rightPlayerScoreX);
rightPlayerScoreElem.setAttribute('y', scoreY);
rightPlayerScoreElem.style.fontSize = scoreFontSize;
rightPlayerScoreElem.style.fontFamily = scorefontFamily;

// rightPlayerScoreElem.innerHTML = '0';

svgBodyElem.append(rightPlayerScoreElem);

// создаем разделитель
const scoreSeparatorElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');

scoreSeparatorElem.setAttribute('x', scoreSeparatorX);
scoreSeparatorElem.setAttribute('y', scoreY);
scoreSeparatorElem.style.fontSize = scoreFontSize;
scoreSeparatorElem.style.fontFamily = scorefontFamily;

scoreSeparatorElem.innerHTML = ':'

svgBodyElem.append(scoreSeparatorElem);

//========================================================================================================
// создаем игровое поле
const fieldBodyElem = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
svgBodyElem.append(fieldBodyElem);

//========================================================================================================
// создаем левого игрока
const leftPlayerElem = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
svgBodyElem.append(leftPlayerElem);

//========================================================================================================
// создаем правого игрока
const rightPlayerElem = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
svgBodyElem.append(rightPlayerElem);

//========================================================================================================
// создаем мячик
const ballElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
svgBodyElem.append(ballElem);

// хэш параметры левого игрока
let leftPlayerH = {
	posX: leftPlayerX,
	posY: leftPlayerY,
	speedY: 0,
	width: playerWidth,
	height: playerHeight,
	color: leftPlayerColor,

	update: function () {
		leftPlayerElem.setAttribute('x', this.posX);
		leftPlayerElem.setAttribute('y', this.posY);
		leftPlayerElem.setAttribute('width', this.width);
		leftPlayerElem.setAttribute('height', this.height);
		leftPlayerElem.setAttribute('fill', this.color);
	}
}

// хэш параметры левого игрока
let rightPlayerH = {
	posX: rightPlayerX,
	posY: rightPlayerY,
	speedY: 0,
	width: playerWidth,
	height: playerHeight,
	color: rightPlayerColor,

	update: function () {
		rightPlayerElem.setAttribute('x', this.posX);
		rightPlayerElem.setAttribute('y', this.posY);
		rightPlayerElem.setAttribute('width', this.width);
		rightPlayerElem.setAttribute('height', this.height);
		rightPlayerElem.setAttribute('fill', this.color);
	}
}

// хэш с параметрами поля
let fieldH = {
	posX: fieldX,
	posY: fieldY,
	width: fieldWidth,
	height: fieldHeight,
	color: fieldBGColor,

	update: function () {
		fieldBodyElem.setAttribute('x', this.posX);
		fieldBodyElem.setAttribute('y', this.posY);
		fieldBodyElem.setAttribute('width', this.width);
		fieldBodyElem.setAttribute('height', this.height);
		fieldBodyElem.setAttribute('fill', this.color);
	}
}

// хэш с параметрами мячика
let ballH = {
	posCenterX: ballCenterX,
	posCenterY: ballCenterY,
	speedX: 0,
	speedY: 0,
	radius: ballRadius,
	color: ballColor,

	update: function () {
		ballElem.setAttribute('cx', this.posCenterX);
		ballElem.setAttribute('cy', this.posCenterY);
		ballElem.setAttribute('r', this.radius);
		ballElem.setAttribute('fill', this.color);
	}
}

// хэш со счетом
let scoreH = {
	leftPlayerScore: 0,
	rightPlayerScore: 0,

	update: function () {
		leftPlayerScoreElem.innerHTML = this.leftPlayerScore;
		rightPlayerScoreElem.innerHTML = this.rightPlayerScore;
	}
}

// функция описывающая кнопку начала раунда
function start(eo) {
	eo = eo || window.event;
	if (gameState == 0) {
		randomizeBall();

		ballH.posCenterX = ballCenterX;
		ballH.posCenterY = ballCenterY;
		gameState = 1;
	}

	btnTextElem.innerHTML = 'Рестарт!';
}

// функция останавливающая раунд
function stopRound() {
	gameState = 0;
	ballH.speedX = 0;
	ballH.speedY = 0;
	leftPlayerH.speedY = 0;
	rightPlayerH.speedY = 0;
}

// функция описывающая интерфейс управления игроками - начало движения
function movePlayer(eo) {
	eo = eo || window.event;
	if (gameState == 1) {
		if (eo.code == 'ShiftLeft') {
			eo.preventDefault();
			leftPlayerH.speedY = -playerSpeed;
		}
		if (eo.code == 'ControlLeft') {
			eo.preventDefault();
			leftPlayerH.speedY = playerSpeed;
		}
		if (eo.code == 'ArrowUp') {
			eo.preventDefault();
			rightPlayerH.speedY = -playerSpeed;
		}
		if (eo.code == 'ArrowDown') {
			eo.preventDefault();
			rightPlayerH.speedY = playerSpeed;
		}
	}
}

// функция описывающая интерфейс управления игроками - окончание движения
function stopPlayer(eo) {
	eo = eo || window.event;
	if (gameState == 1) {
		if (eo.code == 'ControlLeft' || eo.code == 'ShiftLeft') {
			eo.preventDefault();
			leftPlayerH.speedY = 0;
		}
		if (eo.code == 'ArrowUp' || eo.code == 'ArrowDown') {
			eo.preventDefault();
			rightPlayerH.speedY = 0;
		}
	}
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

// получение целого случайного числа в заданном диапазоне от n до m
function randomDiap(n, m) {
	return Math.floor(
		Math.random() * (m - n + 1)
	) + n;
}

// функция 
function updateGame() {
	//===========================================================================
	// передвижение левого игрока
	leftPlayerH.posY += leftPlayerH.speedY;
	// проверяем достиг ли левый игрок верхней стенки
	if (leftPlayerH.posY <= (fieldH.posY)) {
		leftPlayerH.posY = fieldH.posY;
		leftPlayerH.speedY = 0;
	}
	// проверяем достиг ли левый игрок нижней стенки
	if (leftPlayerH.posY >= ((fieldH.posY + fieldH.height) - leftPlayerH.height)) {
		leftPlayerH.posY = ((fieldH.posY + fieldH.height) - leftPlayerH.height);
		leftPlayerH.speedY = 0;
	}

	//===========================================================================
	// передвижение правого игрока
	rightPlayerH.posY += rightPlayerH.speedY;
	// проверяем достиг ли левй игрок верхней стенки
	if (rightPlayerH.posY <= (fieldH.posY)) {
		rightPlayerH.posY = fieldH.posY;
		rightPlayerH.speedY = 0;
	}
	// проверяем достиг ли правый игрок нижней стенки
	if (rightPlayerH.posY >= ((fieldH.posY + fieldH.height) - rightPlayerH.height)) {
		rightPlayerH.posY = ((fieldH.posY + fieldH.height) - rightPlayerH.height);
		rightPlayerH.speedY = 0;
	}

	//===========================================================================
	// передвижение мячика
	ballH.posCenterX += ballH.speedX;
	ballH.posCenterY += ballH.speedY;
	// проверяем достиг ли мячик верхней стенки, если достиг - он отпрыгивает с той же скоростью
	if (ballH.posCenterY <= (fieldH.posY + ballH.radius)) {
		ballH.posCenterY = fieldH.posY + ballH.radius;
		ballH.speedY = -ballH.speedY;
	}
	// проверяем достиг ли мячик нижней стенки, если достиг - он отпрыгивает с той же скоростью
	if (ballH.posCenterY > (fieldH.posY + fieldH.height - ballH.radius)) {
		ballH.posCenterY = (fieldH.posY + fieldH.height - ballH.radius);
		ballH.speedY = -ballH.speedY;
	}
	// проверям достиг ли мячик левой стенки, если достиг остановить матч
	if (ballH.posCenterX < fieldH.posX + ballH.radius) {
		ballH.posCenterX = fieldH.posX + ballH.radius;
		stopRound();
		scoreH.rightPlayerScore += 1;
	}
	// проверям достиг ли мячик правой стенки
	if (ballH.posCenterX > (fieldH.width - ballH.radius)) {
		ballH.posCenterX = fieldH.width - ballH.radius;
		stopRound();
		scoreH.leftPlayerScore += 1;
	}
	// проверяем отбила ли левая ракетка мячик
	// подлетая к правой границе левого игрока проверяем находится ли мячик напротив левого игрока
	const offsetBall = ballH.radius / 1.6;	// поправочный коэффициент из-за закругления мячика для более красивого подсчета координат отбития (чтобы ракетка не налазила на мячик)
	const leftPlayerBorderX = leftPlayerH.posX + leftPlayerH.width;	// правая сторона левого игрока по оси X 
	const leftPlayerBorderY0 = leftPlayerH.posY - offsetBall;	// верхняя сторона левого игрока по оси Y с учетом смещения для исключения наслаивания мячика на игрока
	const leftPlayerBorderY1 = leftPlayerH.posY + leftPlayerH.height + offsetBall;	// нижняя сторона левого игрока по оси Y с учетом смещения для исключения наслаивания мячика на игрока

	const ballLeftSideX = ballH.posCenterX - ballH.radius;	// координата X середины левой границы мячика
	const ballLeftSideY = ballH.posCenterY;	// координата Y середины левой границы мячика 

	if (ballLeftSideX < leftPlayerBorderX) {
		if (ballLeftSideY > leftPlayerBorderY0 && ballLeftSideY < leftPlayerBorderY1) {
			ballH.posCenterX = leftPlayerH.posX + leftPlayerH.width + ballH.radius;
			ballH.speedX = - ballH.speedX;
		}
	}

	// проверяем отбила ли правая ракетка мячик
	// подлетая к левой границе правого игрока проверяем находится ли мячик напротив правого игрока
	const rightPlayerBorderX = rightPlayerH.posX;	// левая сторона правого игрока
	const rightPlayerBorderY0 = rightPlayerH.posY - offsetBall;	// верхняя сторона правого игрока по оси Y с учетом смещения для исключения наслаивания мячика на игрока
	const rightPlayerBorderY1 = rightPlayerH.posY + rightPlayerH.height + offsetBall;	// нижняя сторона правого игрока по оси Y с учетом смещения для исключения наслаивания мячика на игрока

	const ballRightSideX = ballH.posCenterX + ballH.radius;	// координата X середины правой границы мячика
	const ballRightSideY = ballH.posCenterY;	// координата Y середины правой границы мячика

	if (ballRightSideX > rightPlayerBorderX) {
		if (ballRightSideY > rightPlayerBorderY0 && ballRightSideY < rightPlayerBorderY1) {
			ballH.posCenterX = rightPlayerH.posX - ballH.radius;
			ballH.speedX = -ballH.speedX;
		}
	}

	scoreH.update();
	fieldH.update();
	leftPlayerH.update();
	rightPlayerH.update();
	ballH.update();

	requestAnimationFrame(updateGame);
}

window.onload = () => {
	window.addEventListener('keydown', movePlayer, false);
	window.addEventListener('keyup', stopPlayer, false);

	requestAnimationFrame(updateGame);
}