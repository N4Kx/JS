function HashStorageFunc() {
	var self = this;
	var storage = {};  // объявляем пустой приватный хэш для хранения

	self.addValue = function (key, value) {
		storage[key] = value;
		// storage.key = value; 	я так и не понял, почему такой синтаксис не работает с аргументом key.
	}

	self.getValue = function (key) {
		return storage[key];

		// if (key in storage) {    тут я предполагал, что нужно сделать проверку, хотя сам по себе запрос по несуществующему ключу возвращает undefined;
		// 	return storage[key];
		// } else {
		// 	undefined;
		// }
	}

	self.deleteValue = function (key) {
		if (key in storage) {
			delete storage[key];
			return true;
		} else {
			return false;
		}
	}

	self.getKeys = function () {
		return Object.keys(storage);
	}
}

var drinkStorage = new HashStorageFunc();

function input() {
	let nameStr = prompt('Введите название напитка');
	let alcoStr = confirm('Ваш напиток алкоголный ?');
	let recStr = prompt('Введите рецепт приготовления вашего напитка');

	if (alcoStr)
		alcoStr = 'да';
	else
		alcoStr = 'нет';

	drinkStorage.addValue(nameStr, [alcoStr, recStr]);
}

function output() {
	let nameStr = prompt('Введите название напитка информацию о котором хотите получить');
	let drinkArr = drinkStorage.getValue(nameStr);
	console.log('Напиток: ' + nameStr + '\n'
		+ 'Алкоголный: ' + drinkArr[0] + '\n'
		+ 'Рецепт: ' + drinkArr[1]);
}

function userDelete() {
	let nameStr = prompt('Введите название напитка, который хотите удалить');
	console.log(drinkStorage.deleteValue(nameStr));
}

function drinkUserAsk() {
	console.log(drinkStorage.getKeys());
}