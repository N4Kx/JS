'use strict'
const bodyElem = document.body; // находим и помещаем в константу ссылку на область в которой будем работать (в нашем случае body)
const clockSizeElem = document.querySelector('#clockSize');		// находим элемент input с размерами
let clockSize;		// объявляем переменную для хранения размера часов, значение по умолчанию 200
let numberSize;	// объявляем переменную для хранения размера кружочка часов
let numberFontSize;	// обявляем константу для вычисления размера шрифта на циферблате
const clockBtn = document.querySelector('#clockBtn');	// находим кнопку
const clockBGColor = '#FCCB6E';	// цвет основы циферблата
let clockRad;	// объявляем переменную для хранения радиуса часов
let circle = '50%';

let clockNumFontSize;
let clockNumDistance;

let numberBGColor = '#48B585';  // цвет кружочка под числом

let hours = 12; // переменная - количество часов


clockBtn.addEventListener('click', getClockSize, false);

function getClockSize(eo) {
	eo = eo || window.event;

	if (clockSizeElem.value >= 200) {
		clockSize = Number(clockSizeElem.value); // получаем значение размера часов и преобразуем в число - это диаметр
		clockRad = clockSize / 2; // вычисляем значение радиуса часов
		clockBtn.removeEventListener('click', getClockSize, false);		// удаляем обработчик событий

		// ====================================== создаем сами часы 
		let clock = document.createElement('div');	// создаем Div - который будет часами
		clock.style.width = clockSize + 'px';	// задаём ширину блока
		clock.style.height = clockSize + 'px';	// задаём высоту блока
		clock.style.backgroundColor = clockBGColor;	// задаём цвет основы циферблата часов
		clock.style.borderRadius = circle;	// из прямоугольного div делаем круг
		clock.style.position = 'fixed';
		// clock.style.top = '300px';
		// clock.style.left = '300px';
		bodyElem.prepend(clock);	// помещаем div-часы в начало body

		// ====================================== создаем циферблат (зелёные кружочки с номером часа)
		let angle = 0;	// задаем начальный угол для первого элемента в цикле
		const angleDegStep = Math.round(360 / hours);		// вычисляем шаг угла
		numberSize = clockRad / 5;	// вычисляем диаметр кружочка часов
		numberFontSize = clockSize / 20;	// вычисляем размер шрифта для циферблата

		for (let i = hours; i > 0; i--, angle -= angleDegStep) {
			// создаем кружочки на часах
			// console.log('================== № ' + i);
			const hourBG = document.createElement('div');	// создаем div для зелёного кружочка и № часа
			hourBG.style.backgroundColor = numberBGColor;	// задаем цвет кружочку
			hourBG.style.width = numberSize + 'px';
			hourBG.style.height = numberSize + 'px';
			hourBG.style.fontSize = numberFontSize + 'px';
			hourBG.style.borderRadius = circle;
			hourBG.style.display = 'flex';
			hourBG.style.flexWrap = 'nowrap';
			hourBG.style.alignItems = 'center';
			hourBG.style.justifyContent = 'center';
			hourBG.style.position = 'fixed';
			hourBG.innerHTML = i;	// заполняем кружочек номером часа

			clock.prepend(hourBG);

			pos(hourBG, clock, angle, numberSize);
		}

		// ====================================== создаем элемент для цифровых часов
		const clockNum = document.createElement('div');
		clockNumFontSize = clockSize / 10;		// вычисляем размер шрифта относительно размера часов
		clockNumDistance = clockSize / 3.3;		// вычисляем расстояние от края;

		clockNum.style.position = 'fixed';
		clockNum.style.fontSize = clockNumFontSize + 'px';
		clockNum.style.fontStyle = 'italic';
		clockNum.style.fontFamily = 'sans-serif';

		do updateTime();
		while (clockNum.innerHTML == '');

		if (clockNum.innerHTML !== '')
			setInterval(updateTime, 1000);


		function updateTime() {
			const currTime = new Date();
			const currTimeStr = formatDateTime(currTime);
			clockNum.innerHTML = currTimeStr;
			console.log(currTimeStr);
		}




		clock.prepend(clockNum);



		pos(clockNum, clock, angle, clockNumDistance);



		bodyElem.querySelector('label').remove();	// удаляем label
		clockSizeElem.remove();	// Удаляем поле ввода размера часов
		clockBtn.remove();		// удаляем кнопку
		while (bodyElem.querySelector('br')) {	// циклом удаляем все теги br
			bodyElem.querySelector('br').remove();
		}

	} else {
		alert('Введите размер часов НЕ менее 200');
		clockSizeElem.focus();
	}
	return clockSize;
}

function pos(elem, body, angDeg, distance) {
	// функция получает родительский элемент body относительно которого вычисляются координаты
	// элемента elem с учётом угла angDeg и elem задаются координаты в стилевые свойства с учетом отступа от
	// края равного distance 

	// аргументы elem - элемент, которому нужно вычислить координаты,
	//  angDeg - угол в градусах, body - родительский элемент для elem
	const radius = body.offsetWidth / 2 - distance;
	const angle = angDeg / 180 * Math.PI; // переводим угол в градусах в радианы

	const bodyCenterX = body.offsetLeft + body.offsetWidth / 2;
	const bodyCenterY = body.offsetTop + body.offsetHeight / 2;

	const innerCenterX = bodyCenterX + radius * Math.sin(angle);
	const innerCenterY = bodyCenterY - radius * Math.cos(angle);

	elem.style.left = Math.round(innerCenterX - elem.offsetWidth / 2) + 'px';
	elem.style.top = Math.round(innerCenterY - elem.offsetHeight / 2) + 'px';
}

// форматирует дату-время в формате дд.мм.гггг чч:мм:сс
function formatDateTime(dt) {
	const year = dt.getFullYear();
	const month = dt.getMonth() + 1;
	const day = dt.getDate();
	const hours = dt.getHours();
	const minutes = dt.getMinutes();
	const seconds = dt.getSeconds();
	return str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
}

// дополняет строку val слева нулями до длины Len
function str0l(val, len) {
	let strVal = val.toString();
	while (strVal.length < len)
		strVal = '0' + strVal;
	return strVal;
}