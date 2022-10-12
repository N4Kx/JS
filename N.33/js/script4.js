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

	if (clockSizeElem.value > 200) {
		clockSize = Number(clockSizeElem.value); // получаем значение размера часов и преобразуем в число - это диаметр
		clockRad = clockSize / 2; // получаем значение радиуса часов
		clockBtn.removeEventListener('click', getClockSize, false);		// удаляем обработчик событий

		// создаем часы

		let clock = document.createElement('div');	// создаем Div - который будет часами
		clock.style.width = clockSize + 'px';	// задаём ширину блока
		clock.style.height = clockSize + 'px';	// задаём высоту блока
		clock.style.backgroundColor = clockBGColor;	// задаём цвет основы циферблата часов
		clock.style.borderRadius = circle;	// из прямоугольного div делаем круг
		clock.style.position = 'relative';
		bodyElem.prepend(clock);	// помещаем div-часы в начало body

		let angle = 0;


		for (let i = hours; i > 0; i--) {
			// создаем кружочки на часах
			let hourBG = document.createElement('div');	// создаем div для зелёного кружочка и № часа
			const angleDegStep = Math.round(360 / hours);

			hourBG.style.backgroundColor = numberBGColor;	// задаем цвет кружочку
			numberSize = 30;	// вычисляем диаметр кружочка часов
			hourBG.style.width = numberSize + 'px';
			hourBG.style.height = numberSize + 'px';
			hourBG.style.borderRadius = circle;
			hourBG.style.display = 'flex';
			hourBG.style.flexWrap = 'nowrap';
			hourBG.style.alignItems = 'center';
			hourBG.style.justifyContent = 'center';
			hourBG.style.position = 'absolute';
			hourBG.innerHTML = i;


			console.log('Угол до кружочка: ' + angle);

			clock.append(hourBG);
			pos(hourBG, angle, clock);
			angle = angle - 30;
			console.log('Угол: ' + angle);
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

function pos(elem, angDeg, body) {	// аргумент - угол в градусах
	const radius = body.offsetHeight / 2 - elem.offsetHeight;
	const angle = angDeg / 180 * Math.PI; // переводим угол в градусах в радианы

	const clockCenterX = body.offsetLeft + body.offsetWidth / 2;
	const clockCenterY = body.offsetTop + body.offsetHeight / 2;
	// console.log('Часы по Х: ' + clockCenterX);
	// console.log('Часы по Y: ' + clockCenterY);


	let hourBGCenterX = clockCenterX + radius * Math.sin(angle);
	let hourBGCenterY = clockCenterY - radius * Math.cos(angle);
	console.log('Кружок по X: ' + hourBGCenterX);
	console.log('Кружок по Y: ' + hourBGCenterY);


	elem.style.left = Math.round(hourBGCenterX - elem.offsetWidth / 2) + 'px';
	elem.style.top = Math.round(hourBGCenterY - elem.offsetHeight / 2) + 'px';

	console.log(elem.offsetWidth);
	console.log(elem.offsetHeight);
}





/*
function pos(elem, angDeg, body) {	// аргумент - угол в градусах
	const radius = clockRad - numberSize;
	const angle = angDeg / 180 * Math.PI; // переводим угол в градусах в радианы

	const bodyCenterX = body.offsetLeft + body.offsetWidth / 2;
	const bodyCenterY = body.offsetTop + body.offsetHeight / 2;
	console.log('Часы по Х: ' + bodyCenterX);
	console.log('Часы по Y: ' + bodyCenterY);

	console.log('Угол в радианах: ' + angle);
	let innerCenterX = bodyCenterX + radius * Math.sin(angle);
	let innerCenterY = bodyCenterY - radius * Math.cos(angle);
	console.log('Радиус в функции: ' + radius);

	console.log('Кружок по X: ' + innerCenterX);
	console.log('Кружок по Y: ' + innerCenterY);


	elem.style.left = Math.round(innerCenterX - elem.offsetWidth / 2) + 'px';
	elem.style.top = Math.round(innerCenterY - elem.offsetHeight / 2) + 'px';
}
*/