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

let clockNumFontSize;	// переменная для задания размера шрифтов в часах (в кружочках)
let clockNumDistance;	// переменная для задания удаленности элемента от края родительского элемента

let numberBGColor = '#48B585';  // цвет кружочка под числом

let hours = 12; // переменная - количество часов

let transformOriginValue; // объявляем переменную для значения свойства transformOrigin для секундной стрелки
let arrowPosShift; // объявляем переменную для сдвига стрелки при позиционировании
let ArrowShift; // задаем контсанту для сдвига положения стрелки и оси вращения стрелки

const secArrowWidth = 3;	// задаем ширину секундной стрелки
const secArrowBR = 2;	// задаем радиус скругления секундной стрелки
const secZI = 4;	// задаем Z-Index для секундной стрелки
const secArrowAngleStep = 360 / 60; // вычисляем шаг секундной стрелки
let secArrowLength;	// объявляем переменную для длинны секундной стрелки


const minArrowWidth = 5;	// задаем ширину минутной стрелки
const minArrowBR = 3;	// задаем радиус скругления секундной стрелки
const minZI = 3;	// задаём Z-Index для минутной стрелки
const minArrowAngleStep = 360 / 60;	// вычисляем шаг минутной стрелки
let minArrowLength;	// объявляем переменную для длины минутной стрелки


const hourArrowWidth = 10;	//задаем ширину часовой стрелки
const hourArrowBR = 5;	// задаем радиус скругления часовой стрелки
const hourZI = 2;	// задаем Z-Index для часовой стрелки
const hourArrowAngleStep = 360 / 12;	// изменить для часа 30/60;
const hourArrowAngleStepForMin = 30 / 60;
let hourArrowLength;


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

		updateTime();	// однократно вызываем функцию, чтобы записать текущее значение времени
		setInterval(updateTime, 1000);	// добавляем таймер вызова функции, для обновления текущего времени

		/* или вот такая конструкция тоже сработала
		do updateTime();
		while (clockNum.innerHTML == '');

		if (clockNum.innerHTML !== '');
		setInterval(updateTime, 1000);
		*/

		function updateTime() {
			const currTime = new Date();
			const currTimeStr = formatDateTime(currTime);
			clockNum.innerHTML = currTimeStr;
			console.log(currTimeStr);
		}

		clock.prepend(clockNum);

		pos(clockNum, clock, angle, clockNumDistance);	// позиционируем цифровые часы

		// ====================================== создаем секундную стрелку
		const secArrow = document.createElement('div');
		secArrowLength = clockRad;	// вычисляем длину секундной стрелки
		ArrowShift = secArrowLength / 20;

		transformOriginValue = '0px ' + (clockRad - ArrowShift) + 'px ' + '0px'; // вычисляем смещение оси вращения стрелки, т.к. элемент сдвинут вниз на 10 пикселей, то смещение вверх на 10 пикселей.

		secArrow.style.width = secArrowWidth + 'px';
		secArrow.style.height = secArrowLength + 'px';
		secArrow.style.backgroundColor = 'black';
		secArrow.style.borderRadius = secArrowBR + 'px';
		secArrow.style.position = 'fixed';
		secArrow.style.transformOrigin = transformOriginValue;	// стандартно точка вращения в середине элемента
		secArrow.style.zIndex = secZI;	// задаем z-Index для секундной стрелки

		arrowPosShift = secArrowLength / 2 + ArrowShift;	// вычисляем сдвиг секундной стрелки для позиционирования

		function setSecAngle() {	// функция вычисляет и задает угол положения секундной стрелки
			const currTime = new Date();
			const currTimeSec = currTime.getSeconds();
			secArrow.style.transform = 'rotate(' + (currTimeSec * secArrowAngleStep) + 'deg)';
		}
		setInterval(setSecAngle, 1000);
		setSecAngle();

		clock.prepend(secArrow);

		pos(secArrow, clock, angle, arrowPosShift);	// позиционируем стрелку


		// ====================================== создаем минутную стрелку
		const minArrow = document.createElement('div');
		minArrowLength = clockRad * 0.8; // вычисляем длину минутной стрелки

		ArrowShift = minArrowLength / 3.2;

		transformOriginValue = '0px ' + (clockRad - ArrowShift) + 'px ' + '0px'; // вычисляем смещение оси вращения стрелки, т.к. элемент сдвинут вниз на 10 пикселей, то смещение вверх на 10 пикселей.

		arrowPosShift = minArrowLength / 2 + ArrowShift;
		minArrow.style.width = minArrowWidth + 'px';
		minArrow.style.height = minArrowLength + 'px';
		minArrow.style.backgroundColor = 'black';
		minArrow.style.borderRadius = minArrowBR + 'px';
		minArrow.style.position = 'fixed';
		minArrow.style.transformOrigin = transformOriginValue;
		minArrow.style.zIndex = minZI;	// задаем Z-Index для минутной стрелки


		function getMinAngle() {
			const currTime = new Date();
			const currTimeMin = currTime.getMinutes();
			minArrow.style.transform = 'rotate(' + (currTimeMin * minArrowAngleStep) + 'deg';
		}

		getMinAngle();
		setInterval(getMinAngle, 1000);

		clock.prepend(minArrow);

		pos(minArrow, clock, angle, arrowPosShift);

		// ====================================== создаем часовую стрелку
		const hourArrow = document.createElement('div');
		hourArrowLength = clockRad * 0.5; // вычисляем длину минутной стрелки

		ArrowShift = hourArrowLength + hourArrowLength / 10;

		transformOriginValue = '0px ' + (clockRad - ArrowShift) + 'px ' + '0px';

		arrowPosShift = hourArrowLength / 2 + ArrowShift;
		hourArrow.style.width = hourArrowWidth + 'px';
		hourArrow.style.height = hourArrowLength + 'px';
		hourArrow.style.backgroundColor = 'black';
		hourArrow.style.borderRadius = hourArrowBR + 'px';
		hourArrow.style.position = 'fixed';
		hourArrow.style.transformOrigin = transformOriginValue;
		hourArrow.style.zIndex = hourZI;


		function getHourAngle() {
			const currTime = new Date();
			const currTimeHour = currTime.getHours();
			const currTimeMin = currTime.getMinutes();
			hourArrow.style.transform = 'rotate(' + (currTimeHour * hourArrowAngleStep + currTimeMin * hourArrowAngleStepForMin) + 'deg';
		}

		getHourAngle();
		setInterval(getHourAngle, 1000);



		clock.prepend(hourArrow);

		pos(hourArrow, clock, angle, arrowPosShift);

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

// форматирует дату-время в формате чч:мм:сс
function formatDateTime(dt) {
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