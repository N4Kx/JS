'use strict'

const fieldBGColor = 'yellow';	//	цвет игрового поля
const fieldWidth = 800;		//	ширина игрового поля
const fieldHeight = 300;	//	высота игрового поля

const ballColor = 'red';	// цвет мячика
const ballRadius = 20;	// радиус мячика

const playerWidth = fieldWidth / 100;	// ширина игрока
const playerHeight = fieldHeight / 3;	// высота игрока

const leftPlayerColor = 'green';	// цвет левого игрока
const rightPlayerColor = 'blue';	//	цвет правого игрока
const fontSize = Math.round(fieldHeight / 10);	//	задаем высоту шрифта
const fontFamily = 'sans-serif';	//	задаем шрифт

//========================================================================================================
// формируем шапку с кнопкой и счетом

const btnElem = document.querySelector('')


const scoreLeft = document.querySelector('.score_green');
const scoreRight = document.querySelector('.score_blue');

const scoreSpan = document.querySelectorAll('span');

scoreSpan.forEach((elem) => {
	elem.style.fontSize = fontSize + 'px';
	elem.style.fontFamily = fontFamily;
});
scoreLeft.innerHTML = '0';
scoreRight.innerHTML = '0';



// scoreLeft.style.fontSize = fontSize + 'px';



// scoreRight.style.fontSize = fontSize + 'px';

//========================================================================================================
// формируем игровое поле

const fieldElem = document.querySelector('.field');

fieldElem.style.width = fieldWidth + 'px';
fieldElem.style.height = fieldHeight + 'px';
fieldElem.style.backgroundColor = fieldBGColor;