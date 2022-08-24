"use strict";

function randomDiap(n, m) {
	return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
	var colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
	var used = {}; // хэш как память;

	console.log('цветов: ' + colorsCount);
	for (var i = 1; i <= colorsCount; i++) {
		do {
			var n = randomDiap(1, 7);
			var colorName = colors[n];
		}
		while (colorName in used)  // зацикливаем генерацию случайного числа(цвета) до тех пор, пока не выпадет не встречавшийся ранее цвет
		used[colorName] = true;    // записываем в хэш цвет, который уже встретился
		console.log(colorName);
	}
}

mood(3);

/*

"use strict";

function randomDiap(n, m) {
	return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
	var colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
	var used = {};

	console.log('цветов: ' + colorsCount);
	for (var i = 1; i <= colorsCount; i++) {
		var n = randomDiap(1, 7);            	// выбираем случайное число от 1 до 7;
		var colorName = colors[n];					// выбираем цвет, согласно случайному числу;


		if (colorName in used) {					// проверяем встречался ли цвет в раньше;
			continue;									// выполняем какое-то действие, по идее нужно повторить выбор случайного цвета и проверить нет ли его в хэше
		}
		used[colorName] = true;						// записываем в хэш использованный цвет
		console.log(colorName);						// выводим в консоль выбранный цвет


	}

	console.error(used);
}

mood(3);



/*

"use strict";

function randomDiap(n, m) {
	return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
	var colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
	let used = {};
	var colorsValues = [];

	console.log('цветов: ' + colorsCount);
	for (var i = 1; i <= colorsCount; i++) {
		var n = randomDiap(1, 7);
		var colorName = colors[n];
		colorsValues[i] = colorName;

		if (colorsValues[i] in used) {
			var m = randomDiap(1, 7);
			colorName = colors[m];
		}
		used[colorsValues[i]] = true;

		console.log(colorName);
	}
	console.log(used);
	console.log(colorsValues);
}

mood(3);

*/

/*

const values = [55, 77, 55, 66, 77];
let used = {}; // ключ хэша - число, которое уже встречалось
for (let i = 0; i < values.length; i++) {
	const value = values[i]; // очередное значение
	if (value in used) // встречалось ли оно?
		continue; // если да - всё, берём следующее
	used[value] = true; // если нет - запоминаем, что это значение уже встречалось
	console.error(value); // выводим его в консоль
}



*/