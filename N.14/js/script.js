'use strict';
class HashStorageClass {
	addValue(key, value) {
		this[key] = value;
	}
	getValue(key) {
		if (key in this)
			return this[key];
		else
			return undefined;
	}
	deleteValue(key) {
		if (key in this) {
			delete this[key];
			return true;
		} else {
			return false;
		}
	}
	getKeys() {
		return Object.keys(this);
	}
}

var drinkStorage = new HashStorageClass();

function input() {
	let nameStr = prompt('Введите название напитка');
	let alcoBool = confirm('Ваш напиток алкоголный ?');
	let alcoStr;
	let recStr = prompt('Введите рецепт приготовления вашего напитка');

	if (alcoBool)
		alcoStr = 'да';
	else
		alcoStr = 'нет';

	drinkStorage.addValue(nameStr, [alcoStr, recStr]);
}

function output() {
	let nameStr = prompt('Введите название напитка информацию о котором хотите получить');
	let drinkArr = drinkStorage.getValue(nameStr);

	if (drinkArr === undefined) {									// проверяем, есть ли напиток в хэше;
		console.log('Напиток ' + nameStr + ' не найден');	// если его нет - выводим информацию, что такого напитка нет;
	} else {																// если напиток есть - то выводим информацию о нем;
		console.log('Напиток: ' + nameStr + '\n'
			+ 'Алкоголный: ' + drinkArr[0] + '\n'
			+ 'Рецепт: ' + drinkArr[1]);
	}
}

function userDelete() {
	let nameStr = prompt('Введите название напитка, который хотите удалить');
	if (drinkStorage.deleteValue(nameStr))		// удаляем напиток из хэша и выводим сообщение о проведённой операции;
		console.log('Напиток ' + nameStr + ' удалён');
	else
		console.log('Напиток ' + nameStr + ' не найден');
}

function drinkUserAsk() {
	console.log(drinkStorage.getKeys());
}
