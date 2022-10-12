const bodyElem = document.body; // находим и помещаем в константу ссылку на область в которой будем работать (в нашем случае body)
const clockSizeElem = document.querySelector('#clockSize');		// находим элемент input с размерами
let clockSize;		// объявляем переменную для хранения размера часов, значение по умолчанию 200
let numberSize;	// объявляем переменную для хранения размера кружочка часов
const clockBtn = document.querySelector('#clockBtn');	// находим кнопку
const clockBGColor = '#FCCB6E';	// цвет основы циферблата
let clockRad;	// объявляем переменную для хранения радиуса часов
let circle = '50%';

let numberBGColor = '#48B585';  // цвет кружочка под числом

let hours = 12; // переменная - количество часов


clockBtn.addEventListener('click', getClockSize, false);

function getClockSize(eo) {
	eo = eo || window.event;

	if (clockSizeElem.value >= 200) {
		clockSize = Number(clockSizeElem.value); // получаем значение размера часов и преобразуем в число - это диаметр
		clockRad = clockSize / 2; // получаем значение радиуса часов
		clockBtn.removeEventListener('click', getClockSize, false);		// удаляем обработчик событий

		// создаем часы
		let clock = document.createElement('div');	// создаем Div - который будет часами
		clock.style.width = clockSize + 'px';	// задаём ширину блока
		clock.style.height = clockSize + 'px';	// задаём высоту блока
		clock.style.backgroundColor = clockBGColor;	// задаём цвет основы циферблата часов
		clock.style.borderRadius = circle;	// из прямоугольного div делаем круг
		clock.style.position = 'fixed';
		// clock.style.top = '300px';
		// clock.style.left = '300px';
		bodyElem.prepend(clock);	// помещаем div-часы в начало body

		let angle = 0;	// задаем начальный угол для первого элемента в цикле

		for (let i = hours; i > 0; i--, angle -= 30) {
			// создаем кружочки на часах
			console.log('================== № ' + i);
			let hourBG = document.createElement('div');	// создаем div для зелёного кружочка и № часа
			const angleDegStep = Math.round(360 / hours);

			hourBG.style.backgroundColor = numberBGColor;	// задаем цвет кружочку
			numberSize = clockRad / 5;	// вычисляем диаметр кружочка часов
			hourBG.style.width = numberSize + 'px';
			hourBG.style.height = numberSize + 'px';
			hourBG.style.borderRadius = circle;
			hourBG.style.display = 'flex';
			hourBG.style.flexWrap = 'nowrap';
			hourBG.style.alignItems = 'center';
			hourBG.style.justifyContent = 'center';
			hourBG.style.position = 'fixed';
			hourBG.innerHTML = i;

			clock.prepend(hourBG);

			pos(hourBG, angle, clock);
		}


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

function pos(elem, angDeg, body) {
	// функция получает родительский элемент body относительно которого вычисляются координаты
	// элемента elem с учётом угла angDeg и elem задаются координаты в стилевые свойства

	// аргументы elem - элемент, которому нужно вычислить координаты,
	//  angDeg - угол в градусах, body - родительский элемент для elem
	const radius = body.offsetWidth / 2 - elem.offsetWidth;
	const angle = angDeg / 180 * Math.PI; // переводим угол в градусах в радианы

	const bodyCenterX = body.offsetLeft + body.offsetWidth / 2;
	const bodyCenterY = body.offsetTop + body.offsetHeight / 2;

	const innerCenterX = bodyCenterX + radius * Math.sin(angle);
	const innerCenterY = bodyCenterY - radius * Math.cos(angle);

	console.log('Центр кружка по X: ' + innerCenterX);
	console.log('Центр кружка по Y: ' + innerCenterY);

	elem.style.left = Math.round(innerCenterX - elem.offsetWidth / 2) + 'px';
	elem.style.top = Math.round(innerCenterY - elem.offsetHeight / 2) + 'px';
}