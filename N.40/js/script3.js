'use strict'

const bodyElem = document.body;	// находим элемент body, в нем будем строить часы
const clockSizeElem = document.querySelector('#clockSize');	// находим поле ввода размера часов
const clockBtn = document.querySelector('#clockBtn');	//находим кнопку
let clockSize; // размер часов
const clockBGColor = '#FCCB6E';	// цвет основы циферблата
const numberBGColor = '#48B585';  // цвет кружочка под числом

const arrowColor = 'black';	// задаем цвет стрелок
const digitalClockColor = 'black';	// задаем цвет для цифровых часов


clockBtn.addEventListener('click', getClockSize, false);	// вешаем обработчик событий на кнопку
function getClockSize(eo) {
	eo = eo || window.event;

	if (clockSizeElem.value >= 200) {
		clockSize = Number(clockSizeElem.value);
		//===============================================================================================
		// создаем canvas-тег
		const canvasElem = document.createElement('canvas');
		canvasElem.setAttribute('id', 'canvasClock');
		canvasElem.setAttribute('width', clockSize);
		canvasElem.setAttribute('height', clockSize);
		bodyElem.prepend(canvasElem);

		//===============================================================================================
		// создаем функцию, обновляющую часы (стрелки, цифры)
		function updateClock() {
			const currTime = new Date();

			const currHour = currTime.getHours();
			const currMin = currTime.getMinutes();
			const currSec = currTime.getSeconds();
			const currMs = currTime.getMilliseconds();

			const currentTime = str0l(currHour, 2) + ':' + str0l(currMin, 2) + ':' + str0l(currSec, 2);

			const hourAngle = 2 * Math.PI / 12 * (currHour + currMin / 60);
			const minArrowAngle = 2 * Math.PI / 60 * currMin;
			const secArrowAngle = 2 * Math.PI / 60 * currSec;

			let context = canvasElem.getContext('2d');
			context.clearRect(0, 0, canvasElem.width, canvasElem.height);	// стираем содержимое тега CANVAS

			//===============================================================================================
			// создаем часы (основа)
			const clockRad = clockSize / 2;	// радиус часов

			const clockCenterX = clockRad;	// координата центра часов по X
			const clockCenterY = clockRad;	// координата центра часов по Y

			context.fillStyle = clockBGColor;
			context.beginPath();
			context.arc(clockCenterX, clockCenterY, clockRad, 0, 2 * Math.PI, false);
			context.fill();

			//===============================================================================================
			// создаем циферблат
			const hourDistance = clockRad * 0.8;	// задаем расстояние для циферок циферблата
			const hourRad = clockRad * 0.1;	// задаём радиус кружочка для циферблата
			const hourTextSize = clockSize / 20; // задаем размер шрифта относительно размера часов

			for (let i = 1; i <= 12; i++) {
				const hourAngle = 2 * Math.PI / 12 * i;

				const hourX = clockCenterX + hourDistance * Math.sin(hourAngle);
				const hourY = clockCenterY - hourDistance * Math.cos(hourAngle);

				context.fillStyle = numberBGColor;
				context.beginPath();
				context.arc(hourX, hourY, hourRad, 0, 2 * Math.PI, false);
				context.fill();

				context.fillStyle = 'black';
				context.font = hourTextSize + 'px sans-serif';
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillText(i, hourX, hourY);
			}

			//===============================================================================================
			// создаем стрелки
			const hourArrowLength = clockRad * 0.5;	// длина часовой стрелки
			const hourAnglethickness = 20;		// толщина часовой стрелки

			const minArrowLength = clockRad * 0.8;		// длина минутной стрелки
			const minArrowthickness = 8;		// толщина минутной стрелки

			const secArrowLength = clockRad * 0.95;		// длина секундной стрелки
			const secArrowthickness = 2;		// толщина секундной стрелки

			const arrowOffset = clockRad * 0.1;	// смещение стрелок от оси вращения

			const digitalClockDistance = clockRad * 0.32;	// смещение цифровых часов по оси Y
			const digitalClockFontSize = clockRad * 0.2;		// задаем размер шрифта цифровым часам

			context.strokeStyle = arrowColor;

			//===============================================================================================
			// создаем стрелки
			createArrow(context, clockCenterX, clockCenterY, arrowOffset, hourArrowLength, hourAngle, hourAnglethickness);
			createArrow(context, clockCenterX, clockCenterY, arrowOffset, minArrowLength, minArrowAngle, minArrowthickness);
			createArrow(context, clockCenterX, clockCenterY, arrowOffset, secArrowLength, secArrowAngle, secArrowthickness);

			//===============================================================================================
			// создаем цифровые часы
			const digitalClockX = clockCenterX;
			const digitalClockY = clockCenterY - digitalClockDistance;

			context.fillStyle = digitalClockColor;
			context.beginPath();
			context.font = digitalClockFontSize + 'px sans-serif';
			context.textAlign = 'center';
			context.textBaseline = 'bottom';
			context.fillText(currentTime, digitalClockX, digitalClockY);

			setTimeout(updateClock, (1010 - currMs));	// синхронизируем время

			console.log(currentTime);	// выводим время в консоль
		}

		updateClock();	// вызываем функцию, которая обновит часы


		//===============================================================================================
		// удаляем все "ненужные" элементы
		bodyElem.querySelector('label').remove();	// удаляем label
		clockSizeElem.remove();	// удаляем поле ввода размера
		clockBtn.remove();	// удаляем кнопку
		while (bodyElem.querySelector('br')) {
			bodyElem.querySelector('br').remove();	// удаляем все теги
		}
	} else {
		alert('Введите размер часов НЕ менее 200');
		clockSizeElem.focus();
	}
}

function createArrow(contextType, X0, Y0, offset, length, angle, thickness) {
	const arrowX0 = X0 - offset * Math.sin(angle);
	const arrowY0 = Y0 + offset * Math.cos(angle);

	const arrowX1 = X0 + length * Math.sin(angle);
	const arrowY1 = Y0 - length * Math.cos(angle);

	contextType.beginPath();
	contextType.moveTo(arrowX0, arrowY0);
	contextType.lineWidth = thickness;
	contextType.lineCap = 'round';
	contextType.lineTo(arrowX1, arrowY1);
	contextType.stroke();
}

//===============================================================================================
// дополняет строку val слева нулями до длины Len
function str0l(val, len) {
	let strVal = val.toString();
	while (strVal.length < len)
		strVal = '0' + strVal;
	return strVal;
}