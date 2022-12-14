'use strict'

const bodyElem = document.body;	// находим элемент body, в нем будем строить часы
const clockSizeElem = document.querySelector('#clockSize');	// находим поле ввода размера часов
const clockBtn = document.querySelector('#clockBtn');	//находим кнопку
let clockSize; // размер часов
const clockBGColor = '#FCCB6E';	// цвет основы циферблата
const numberBGColor = '#48B585';  // цвет кружочка под числом

const arrowColor = 'black';	// задаем цвет стрелок


clockBtn.addEventListener('click', getClockSize, false);	// вешаем обработчик событий на кнопку

function getClockSize(eo) {
	eo = eo || window.event;

	if (clockSizeElem.value >= 200) {
		clockSize = Number(clockSizeElem.value);
		//===============================================================================================
		// создаем часы (основа)
		const clockRad = clockSize / 2;	// радиус часов

		const clockCenterX = clockRad;	// координата центра часов по X
		const clockCenterY = clockRad;	// координата центра часов по Y
		const clockSvgBody = document.createElementNS('http://www.w3.org/2000/svg', 'svg');	// создаем тег SVG для рисования часов

		clockSvgBody.setAttribute('width', clockSize);	// задаем ширину тега SVG
		clockSvgBody.setAttribute('height', clockSize);	// задаем высоты тега SVG
		bodyElem.prepend(clockSvgBody);	// помещаем тег SVG в начало тега body

		const clock = document.createElementNS('http://www.w3.org/2000/svg', 'circle');	// создаем часы
		clock.setAttribute('cx', clockCenterX);
		clock.setAttribute('cy', clockCenterY);
		clock.setAttribute('r', clockRad);
		clock.setAttribute('fill', clockBGColor);

		clockSvgBody.prepend(clock);

		//===============================================================================================
		// создаем циферблат
		const hourDistance = clockRad * 0.8;	// задаем расстояние для циферок циферблата
		const hourRad = clockRad * 0.1;	// задаём радиус кружочка для циферблата
		const hourTextSize = clockSize / 20; // задаем размер шрифта относительно размера часов

		for (let i = 1; i <= 12; i++) {

			const hourAngle = 2 * Math.PI / 12 * i;	// вычисляем угол на котором будет расположен элемент циферблата

			const hourX = clockCenterX + hourDistance * Math.sin(hourAngle);
			const hourY = clockCenterY - hourDistance * Math.cos(hourAngle);

			const hourBGElem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');	// создаем кружочек
			hourBGElem.setAttribute('cx', hourX);
			hourBGElem.setAttribute('cy', hourY);
			hourBGElem.setAttribute('r', hourRad);
			hourBGElem.setAttribute('fill', numberBGColor);

			clockSvgBody.append(hourBGElem);

			const hourTextX = hourX;
			const hourTextY = hourY + hourTextSize / 4;	// т.к. text-anchor = middle - выравниваем на 1/4 высоты шрифта

			const hourTextElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			hourTextElem.setAttribute('x', hourTextX);
			hourTextElem.setAttribute('y', hourTextY);
			hourTextElem.setAttribute('font-size', hourTextSize);
			hourTextElem.setAttribute('text-anchor', 'middle');	// выравнивание текста по середине базовой линии текста

			const hourText = document.createTextNode(i);
			hourTextElem.appendChild(hourText);

			clockSvgBody.append(hourTextElem);
		}

		//===============================================================================================
		// создаем константы для построения стрелок и цифровых часов
		const hourArrow = 'hour-arrow';	// задаем ID для часовой стрелки
		const hourArrowLength = clockRad * 0.5;	// длина часовой стрелки
		const hourAnglethickness = 20;		// толщина часовой стрелки

		const minArrow = 'min-arrow';	// задаем ID для минутной стрелки
		const minArrowLength = clockRad * 0.8;		// длина минутной стрелки
		const minArrowthickness = 8;		// толщина минутной стрелки

		const secArrow = 'sec-arrow';	// задаем ID для секундной стрелки
		const secArrowLength = clockRad * 0.95;		// длина секундной стрелки
		const secArrowthickness = 2;		// толщина секундной стрелки

		const arrowOffset = clockRad * 0.05;	// смещение стрелок от оси вращения

		const digitalClockDistance = clockRad * 0.32;	// смещение цифровых часов по оси Y
		const digitalClockFontSize = clockRad * 0.2;		// задаем размер шрифта цифровым часам

		buildArrow(clockSvgBody, hourArrowLength, hourAnglethickness, arrowColor, clockCenterX, clockCenterY, arrowOffset, hourArrow);	// создаем часовую стрелку
		buildArrow(clockSvgBody, minArrowLength, minArrowthickness, arrowColor, clockCenterX, clockCenterY, arrowOffset, minArrow);	// создаем минутную стрелку
		buildArrow(clockSvgBody, secArrowLength, secArrowthickness, arrowColor, clockCenterX, clockCenterY, arrowOffset, secArrow);	// создаем секундную стрелку

		buildDigitelClock(clockSvgBody, digitalClockDistance, digitalClockFontSize, clockCenterX, clockCenterY);

		const hourArrowElem = document.querySelector('#hour-arrow');	// находим часовую стрелку
		const minArrowElem = document.querySelector('#min-arrow');		// находим минутную стрелку
		const secArrowElem = document.querySelector('#sec-arrow');		// находим секундную стрелку

		const digitalClockElem = document.querySelector('#DIGITAL_CLOCK');	// находим текстовый элемент для цифровых часов

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

			rotateArrow(hourArrowElem, hourAngle, clockCenterX, clockCenterY);	// поворачиваем часовую стрелку
			rotateArrow(minArrowElem, minArrowAngle, clockCenterX, clockCenterY);	// поворачиваем минутную стрелку
			rotateArrow(secArrowElem, secArrowAngle, clockCenterX, clockCenterY);	// поворачиваем секундную стрелку

			digitalClockElem.innerHTML = currentTime;	// обновляем текущее время в цифровых часах

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

//===============================================================================================
// строит и позиционирует стрелки в родительском элементе body с длинной стрелки length,
// толщиной стрелки thickness, цветом стрелки color, и начальными координатами стрелки x1 и y1
// с отступом от центра offset и ID элемента = name

function buildArrow(body, length, thickness, color, x1, y1, offset, name) {
	const startX = x1;
	const startY = y1 + offset;

	const arrowX = x1;
	const arrowY = y1 - length;

	const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');

	arrow.setAttribute('x1', startX);
	arrow.setAttribute('y1', startY);
	arrow.setAttribute('x2', arrowX);
	arrow.setAttribute('y2', arrowY);
	arrow.setAttribute('stroke', color);
	arrow.setAttribute('stroke-width', thickness);
	arrow.setAttribute('stroke-linecap', 'round');
	arrow.setAttribute('id', name);

	body.append(arrow);
}

// функция для вращения стрелки
// arrow - ссылка на элемент стрелки
// angle - угол, на который нужно повернуть стрелку
// x и y - координаты относительно которых необходимо вращать стрелку
function rotateArrow(arrow, angle, x, y) {
	const angleDeg = angle * 180 / Math.PI;	// переводим угол из радиан в градусы
	const angleStr = 'rotate(' + angleDeg + ' ' + x + ' ' + y + ')';
	arrow.setAttribute('transform', angleStr);
}

//===============================================================================================
// строит цифровые часы с текущим временем time в родительском элементе body со смещением по оси Y distance
// размером шрифта fontSize и начальными координатами центра body x0, y0 
function buildDigitelClock(body, distance, fontSize, x0, y0, time) {
	const digitalClock = document.createElementNS('http://www.w3.org/2000/svg', 'text');

	digitalClock.setAttribute('x', x0);
	digitalClock.setAttribute('y', y0 - distance);
	digitalClock.setAttribute('text-anchor', 'middle');
	digitalClock.setAttribute('font-size', fontSize);
	digitalClock.setAttribute('id', 'DIGITAL_CLOCK');

	let digitalClockText = document.createTextNode(time);
	digitalClock.appendChild(digitalClockText);
	body.append(digitalClock);
}

//===============================================================================================
// дополняет строку val слева нулями до длины Len
function str0l(val, len) {
	let strVal = val.toString();
	while (strVal.length < len)
		strVal = '0' + strVal;
	return strVal;
}