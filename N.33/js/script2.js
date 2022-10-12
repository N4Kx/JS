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
		clock.style.position = 'absolute';

		bodyElem.prepend(clock);	// помещаем div-часы в начало body

		numberSize = clockRad / 5;	// вычисляем диаметр кружочка часов

		/*
		// создаем кружочки на часах
		let hourBG = document.createElement('div');	// создаем div для зелёного кружочка и № часа
		hourBG.style.backgroundColor = numberBGColor;	// задаем цвет кружочку

		numberSize = clockRad / 5;	// вычисляем диаметр кружочка часов
		hourBG.style.width = numberSize + 'px';
		hourBG.style.height = numberSize + 'px';
		hourBG.style.borderRadius = circle;
		hourBG.style.display = 'flex';
		hourBG.style.flexWrap = 'nowrap';
		hourBG.style.alignItems = 'center';
		hourBG.style.justifyContent = 'center';
		hourBG.style.position = 'relative';
		// hourBG.style.left = clockSize / 2 - numberSize / 2 + 'px';	// вычисляем координаты первого зелёного кружочка 12 часов
		// hourBG.style.top = numberSize / 5 + 'px';		// расстояние от края желтого круга в 5 раз меньше диаметра самого зелёного кружочка

		hourBG.innerHTML = '12';

		clock.prepend(hourBG);
*/
		// pos(clock, clockRad, 12, clockBGColor, numberBGColor, numberSize);

		bodyElem.querySelector('label').remove();	// удаляем label
		clockSizeElem.remove();	// Удаляем поле ввода размера часов
		clockBtn.remove();		// удаляем кнопку
		while (bodyElem.querySelector('br')) {	// циклом удаляем все теги br
			bodyElem.querySelector('br').remove();
		}
		for (let i = 12; i > 0; i--) {
			// создаем кружочки на часах
			let hourBG = document.createElement('div');	// создаем div для зелёного кружочка и № часа
			hourBG.style.backgroundColor = numberBGColor;	// задаем цвет кружочку

			numberSize = clockRad / 5;	// вычисляем диаметр кружочка часов
			hourBG.style.width = numberSize + 'px';
			hourBG.style.height = numberSize + 'px';
			hourBG.style.borderRadius = circle;
			hourBG.style.display = 'flex';
			hourBG.style.flexWrap = 'nowrap';
			hourBG.style.alignItems = 'center';
			hourBG.style.justifyContent = 'center';
			hourBG.style.position = 'relative';
			let a = 0;
			pos(a);
			a = a - 30;

			hourBG.innerHTML = i;

			clock.prepend(hourBG);


		}

		function pos(angDeg) {	// аргумент - угол в градусах
			const radius = clockRad - numberSize;
			const angle = angDeg / 180 * Math.PI; // переводим угол в градусах в радианы

			const clockCenterX = clock.offsetLeft + clock.offsetWidth / 2;
			const clockCenterY = clock.offsetTop + clock.offsetHeight / 2;
			// console.log('Часы по Х: ' + clockCenterX);
			// console.log('Часы по Y: ' + clockCenterY);


			const hourBGCenterX = clockCenterX + radius * Math.sin(angle);
			const hourBGCenterY = clockCenterY - radius * Math.cos(angle);
			// console.log('Кружок по X: ' + hourBGCenterX);
			// console.log('Кружок по Y: ' + hourBGCenterY);


			hourBG.style.left = Math.round(hourBGCenterX - hourBG.offsetWidth / 2) + 'px';
			hourBG.style.top = Math.round(hourBGCenterY - hourBG.offsetHeight / 2) + 'px';
		}

	} else {
		alert('Введите размер часов НЕ менее 200');
		clockSizeElem.focus();
	}
	return clockSize;
}

/*
function pos(elem, elemRadius, amount, elemColor, secElemColor, secElemRadius) {
	const radius = elemRadius;
	let angle = 0; // вычисляем угол на котором будут расположены элементы относительно центра
	const angleStep = 2 * Math.PI / amount; // вычисляем шаг угла (сдвиг угла)

	const elemCenterX = elem.offsetLeft + elem.offsetWidth / 2;	// находим координату Х центра элемента в котором рисуем
	const elemCenterY = elem.offsetTop + elem.offsetHeight / 2; // находим координату Y центра элемента в котором рисуем

	// запускаем цикл, который построит заданное количество малых элементов внутри элемента
	for (let i = amount; i > 0; i--, amount--) {
		let hourBG = document.createElement('div');	// создаем div для зелёного кружочка и № часа
		hourBG.style.backgroundColor = secElemColor;	// задаем малому элементу
		hourBG.style.width = secElemRadius + 'px';
		hourBG.style.height = secElemRadius + 'px';
		hourBG.style.borderRadius = circle;
		hourBG.style.display = 'flex';
		hourBG.style.flexWrap = 'nowrap';
		hourBG.style.alignItems = 'center';
		hourBG.style.justifyContent = 'center';
		hourBG.style.position = 'relative';
		hourBG.innerHTML = amount;



		let secElemCenterX = elemCenterX + radius * Math.sin(angle);	// находим координату X центра малого элемента
		let secElemCenterY = elemCenterY - radius * Math.cos(angle);	// находим координату Y центра малого элемента

		hourBG.style.left = Math.round(secElemCenterX - hourBG.offsetWidth / 2) + 'px';
		hourBG.style.top = Math.round(secElemCenterY - hourBG.offsetHeight / 2) + 'px';

		angle = angle - angleStep;

		elem.append(hourBG);
	}

}
*/


