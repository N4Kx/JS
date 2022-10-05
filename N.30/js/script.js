'use strict';

window.addEventListener('load', numImages, false);		// вешаем обработчик событий по загрузке страницы, чтобы картинки прогрузились;
const elems = document.body.getElementsByTagName('img');

// вешаем обработчик событий на окно, а картинка будет "цепляться" через всплытие событий. Мне кажется такая практика будет лучше, т.к. обработчика будет всего 3. А если вешать циклом на каждую картинку, то если картинок будет миллион, то и обработчиков будет миллион, что как мне кажется - не лучший вариант. Также я заметил, что можно вместо window вешать только на document.body, вроде и понимаю в чем разница, а каких-то особых отличий не вижу в данном случае

window.addEventListener('mousedown', startDrag, false);
window.addEventListener('mouseup', stopDrag, false);
window.addEventListener('mousemove', dragOver, false);


// на каждую картинку циклом вешаем обработчики мышиных событий
/*
for (let i = 0; i < elems.length; i++) {
	let elem = elems[i];
	elem.addEventListener('mousedown', startDrag, false);
	elem.addEventListener('mousemove', dragOver, false);
	elem.addEventListener('mouseup', stopDrag, false);
}
*/

let startDragHash = {};	// объявляем переменную со ссылкой на объект для хранения координат начала перетаскивания
let elemDragged;

// описываем функцию по нажатию кнопки мыши
function startDrag(eo) {
	eo = eo || window.event;
	eo.preventDefault();
	// console.log(eo.target);

	if (eo.target !== document.body) {

		let startDragCoordX = eo.screenX;		// запоминаем координаты курсора по оси X начала перетаскивания
		let startDragCoordY = eo.screenY;		// запоминаем координаты курсора по оси Y начала перетаскивания

		elemDragged = eo.target;					// запоминаем какой объект мы перетаскиваем

		let elemStartCoordX = elemDragged.offsetLeft;
		let elemStartCoordY = elemDragged.offsetTop;

		startDragHash['x0'] = startDragCoordX;	// записываем в объект координату курсора по оси X
		startDragHash['y0'] = startDragCoordY;	// записываем в объект координату курсора по оси Y
		startDragHash['obj'] = elemDragged;		// записываем в объект ссылку на элемент, который мы перетаскиваем
		startDragHash['x1'] = elemStartCoordX;	// записываем координату верхнего левого угла перетаскиваемого элемента по оси X
		startDragHash['y1'] = elemStartCoordY;	// записываем координату верхнего левого угла перетаскиваемого элемента по оси Y

		startDragHash['obj'].style.zIndex = '1000';		// устанавливаем перетаскиваемому элементу z-index = 1000, мне так захотелось 
		startDragHash['obj'].style.cursor = 'move';		// устанавливаем перетаскиваемому элементу внешний вид курсора

		// console.log('Координаты курсора в начале перетаскивания:');
		// console.log(startDragHash);
		// console.log(eo.currentTarget);
	}
}


function stopDrag(eo) {
	eo = eo || window.event;

	eo.preventDefault();
	if (eo.target !== document.body) {
		// console.log('Кнопка мыши ОТПУЩЕНА!');
		elemDragged.style.zIndex = '0';
		elemDragged.style.cursor = 'default';
		elemDragged = null;
	}
}

function dragOver(eo) {
	eo = eo || window.event;
	if (eo.target !== document.body) {
		if (elemDragged) {		// проверяем существует ли перетаскиваемый элемент
			let dragCoordX = eo.screenX;
			let dragCoordY = eo.screenY;

			elemDragged.style.left = dragCoordX - startDragHash['x0'] + startDragHash['x1'] + 'px';		// вычисляем координаты элемента по оси X
			elemDragged.style.top = dragCoordY - startDragHash['y0'] + startDragHash['y1'] + 'px';		// вычисляем координаты элемента по оси Y
		}
	}
	// console.log(dragCoordX + ' ' + dragCoordY);
}

function numImages(eo) {
	eo = eo || window.event;

	let coordsX = {};		// массив памяти для координат по оси X, где ключ - № картинки, а значение - сама координата;
	let coordsY = {};		// массив памяти для координат по оси Y, где ключ - № картинки, а значение - сама координата;			я намеренно сделал 2 массива, чтобы было проще понимать и отлаживать код.

	// let coords = {};
	// console.log(elems);

	/*
	это пример цикла с одним объектом как памяти для координат. Намеренно оставлял разное написание по оси X и оси Y, как мне показалось в таком объекте ошибиться проще, поэтому оставил 2 отдельных объекта
	for (let i = 0; i < elems.length; i++) {
		let elem = elems[i];
		coords['img' + i + ' X'] = elem.offsetLeft;
		coords['Y img' + i] = elem.offsetTop;
	}
	
	console.log(coords);
	*/

	// этим циклом мы проходим по картинкам и находим их координаты по оси X и по оси Y, записываем значения в объект как память.

	for (let i = 0; i < elems.length; i++) {
		let elem = elems[i];
		coordsX['X' + i] = elem.offsetLeft;
		coordsY['Y' + i] = elem.offsetTop;
	}
	// console.log(coordsX);
	// console.log(coordsY);

	// следующим циклом мы пройдемся по картинкам и запишем им полученные значения координат в position и зададим position: absolute, и принудительно задаю всем z-index = 0;

	for (let i = 0; i < elems.length; i++) {
		let elem = elems[i];
		elem.style.left = coordsX['X' + i] + 'px';
		elem.style.top = coordsY['Y' + i] + 'px';
		elem.style.position = 'absolute';
		elem.style.zIndex = '0';
	}

	// coordsX = null;
	// coordsY = null;
	// console.log(coordsX);
	// console.log(coordsY);
	window.removeEventListener('load', numImages, false);	// удаляем обработчик событий, т.к. функция выполнила свою задачу и больше обработчик событий по загрузке не нужен
}
