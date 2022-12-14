// 'use strict';
// предзагрузка изображений=============================================================================
(function () {
	var resourceCache = {};
	var loading = [];
	var readyCallbacks = [];

	// Load an image url or an array of image urls
	function load(urlOrArr) {
		if (urlOrArr instanceof Array) {
			urlOrArr.forEach(function (url) {
				_load(url);
			});
		}
		else {
			_load(urlOrArr);
		}
	}

	function _load(url) {
		if (resourceCache[url]) {
			return resourceCache[url];
		}
		else {
			var img = new Image();
			img.onload = function () {
				resourceCache[url] = img;

				if (isReady()) {
					readyCallbacks.forEach(function (func) { func(); });
				}
			};
			resourceCache[url] = false;
			img.src = url;
		}
	}

	function get(url) {
		return resourceCache[url];
	}

	function isReady() {
		var ready = true;
		for (var k in resourceCache) {
			if (resourceCache.hasOwnProperty(k) &&
				!resourceCache[k]) {
				ready = false;
			}
		}
		return ready;
	}

	function onReady(func) {
		readyCallbacks.push(func);
	}

	window.resources = {
		load: load,
		get: get,
		onReady: onReady,
		isReady: isReady
	};
})();

resources.load([
	'img/game_sprite.png',
	'img/player_walk_left.png',
	'img/player_walk_right.png',
	'img/player_walk_up.png',
	'img/player_walk_down.png'
]);
//======================================================================================================
// Model
function GameModel() {
	this.gameField;
	// массив для хранения игрового поля
	// 0 - игрок
	// 1 - проход
	// 2 - земля которую можно копать
	// 3 - камень который нельзя копать
	// 4 - сундук

	// границы игрового поля
	this.topBorder;		// верхняя граница
	this.bottomBorder;	// нижняя граница
	this.leftBorder;		// левая граница
	this.rightBorder;		// правая граница

	this.player = 0;	// игрок в поле
	this.pass = 1;		// проход 

	// состояние игрока для анимации
	this.playerState;
	// 0 - игрок стоит
	// 1 - игрок идет верх
	// 2 - игрок идет вправо
	// 3 - игрок идет вниз
	// 4 - игрок идет влево
	// 5 - игрок копает

	// состояние игры
	this.gameState;
	// 0 - игра остановлена
	// 1 - игра запущена

	// очки игрока
	this.gameScore;
	// количество собранных сундуков
	this.collectedChests;
	// количество сундуков в игровом поле
	this.restChests;

	// стартовые координаты игрока
	this.posX;
	this.posY;

	// зал славы
	this.hallOfFame = {};

	// никнейм игрока
	this.playerName = null;

	this.setPlayerName = (nickname) => {
		this.playerName = nickname;
	}

	this.updateHallOfFame = () => {
		this.hallOfFame[this.playerName] = this.gameScore;
	}

	this.updateHof = (externalHoF) => {
		// объединяем объекты в один
		this.hallOfFame = Object.assign(this.hallOfFame, externalHoF);
	}

	// метод подсчета кол-ва сундуков в игровом поле
	this.calcChests = (arr) => {
		let cnt = 0;
		arr.forEach((v, i, a) => {
			v.filter((v, i, a) => {
				if (v == 4)
					cnt++;
			})
		});
		return cnt;
	}

	// метод валидации загружаемого игрового массива
	// метод вернёт true в случае если массив "правильной формы" т.е. длина всех подмассивов одинаковая
	// вернёт false, если массив "неправильной формы" 
	// также метод преобразует введенный двумерный массив в двумерный массив с массивами
	// т.е. обрежет все типы кроме массивов для элементов 1го уровня.
	this.validateGameField = (arr) => {
		let newArr = [];			// новый массив для "исправленного" полученного массива (останется только массив с подмассивами)
		let arrayLength = [];	// массив с длинами подмассивов
		let status = true;		// выходное значение валидации

		// преобразуем полученный двумерный массив в массив с подмассивами (всё осталное выбросим)
		arr.forEach(function (v, i, a) {
			if (Array.isArray(v)) {
				newArr.push(v);
			}
		})

		// получим массив с длинами подмассивов
		newArr.forEach(function (v, i, a) {
			arrayLength.push((v.length));
		})

		// функция для проверки того, что длина подмассивов одинаковая (введённый массив "правильной формы")
		function checkSubArr(arr) {
			for (let i = 0; i < arr.length; i++) {
				let curr = arr[i];
				let prev = arr[i - 1];

				if (prev != undefined) {
					if (curr !== prev) {
						status = false;
						break;
					}
				}
			}
		}
		checkSubArr(arrayLength);
		return status;
	}

	// свойство - объект для хранения параметров хранилища {url: , stringName:}
	// ключи
	// url - адрес хранилища
	// name - имя хранилища
	this.storage = {};

	// метод для передачи параметров хранилища
	this.updateStorageProp = (extUrl, extName) => {
		this.storage['url'] = extUrl;
		this.storage['stringName'] = extName;
		// console.log(this.storage);
	}

	// метод чтения данных из внешнего хранилища и записи их в модель игры
	this.updateFromStorage = () => {
		$.ajax({
			url: this.storage.url, type: 'POST', cache: false, dataType: 'json',
			data: { f: 'READ', n: this.storage.stringName },
			success: this.readReady, error: this.errorHandler
		});
	}

	this.readReady = (callresult) => {
		if (callresult.error != undefined) {
			console.log(callresult.error);
		} else if (callresult.result != "") {
			const info = JSON.parse(callresult.result);
			// метод помещающий данные в таблицу зала славы
			this.updateHof(info);
			console.log('Данные получены');
			console.log(info);
		}
	}

	this.password;		// свойство для пароля к доступу к удаленному хранилищу

	// функция записи в хранилище
	this.saveToStorage = () => {
		// генерируем случайный пароль
		this.password = Math.random();
		// создаем запрос из хранилища с её блокированием в хранилище LOCKGET
		$.ajax({
			url: this.storage.url, type: 'POST', cache: false, dataType: 'json',
			data: { f: 'LOCKGET', n: this.storage.stringName, p: this.password },
			success: this.lockGetReady, error: this.errorHandler
		});
	}

	this.lockGetReady = (callresult) => {
		if (callresult.error != undefined) {
			console.log('фигня в lockGetReady' + callresult.error);
		}
		else {
			// записываем текущие имя и кол-во очков из игры
			const info = this.hallOfFame;	// получаем текущие имя и кол-во очков из игры
			console.log('Данные загружены')
			console.log(info);
			$.ajax({
				url: this.storage.url, type: 'POST', cache: false, dataType: 'json',
				data: { f: 'UPDATE', n: this.storage.stringName, v: JSON.stringify(info), p: this.password },
				success: this.updateReady, error: this.errorHandler
			});
		}
	}

	// функция ловит ошибку в случае записи
	this.updateReady = (callresult) => {
		if (callresult.error != undefined)
			console.log(callresult.error);
		// else
		// 	console.log('Данные загружены');
	}

	// метод отлова ошибок при загрузке из внешнего хранилища
	// функция для ручного отлова ошибок
	this.errorHandler = (jqXHR, statusStr, errorStr) => {
		console.log(statusStr + ' ' + errorStr);
	}

	// метод получающий таблицу с сервера, добавляющий в него текущие очки и отправляющий на сервер
	this.updateExtStorage = () => {
		this.updateFromStorage();	// читаем таблицу с сервера и помещаем в модель игры
		this.saveToStorage();		// сохраняем новую таблицу на сервер
	}


	let myView = null;
	let myLevel = null;

	// метод для связывания model и view
	this.start = (view, level) => {
		myView = view;	// переменная для view
		myLevel = level;	// переменная с уровнем игры
		this.updateField(myLevel);
		this.gameInit(myLevel);
	}

	// метод для обновления view (отображения)
	this.updateView = () => {
		if (myView) {
			myView.update();
		}
	}

	// метод обновляющий this.gameField
	this.updateField = (newField) => {
		if (this.validateGameField(newField))
			this.gameField = newField;
		else
			console.log('С игровым полем что-то не так');
	}

	// метод инициализации игрока
	this.gameInit = (lvl) => {
		// состояние игрока для анимации
		this.playerState = 0;

		// состояние игры
		this.gameState = 1;

		// очки игрока
		this.gameScore = 0;
		// количество собранных сундуков
		this.collectedChests = 0;

		// границы игрового поля
		this.topBorder = 0;											// верхняя граница
		this.bottomBorder = lvl.length;							// нижняя граница
		this.leftBorder = 0;											// левая граница
		this.rightBorder = lvl[0].length;						// правая граница

		// стартовые координаты игрока
		this.posX = 0;
		this.posY = 0;

		// помещаем игрока в начальную позицию
		this.gameField[this.posY][this.posX] = this.player;
		this.restChests = this.calcChests(lvl);
	}

	// метод для передвижения игрока
	this.move = (x, y) => {
		if (this.gameState == 1) {
			// ставим в текующую позицию игрока проход 1(для наглядности пока 8)
			this.gameField[this.posY][this.posX] = this.pass;

			// вычисляем новые координаты игрока
			this.newPlayerPosX = this.posX + x;
			this.newPlayerPosY = this.posY + y;

			if (this.newPlayerPosX < this.leftBorder || this.newPlayerPosX >= this.rightBorder) {
				this.gameField[this.newPlayerPosY][this.posX] = this.player;	// если встретилась левая или правая стенка - оставляем игрока в текущих координатах по оси X, т.е. упёрся в стену
				// console.log('ЛЕВАЯ или ПРАВАЯ СТЕНКА!!!')
			} else if (this.newPlayerPosY < this.topBorder || this.newPlayerPosY >= this.bottomBorder) {
				this.gameField[this.posY][this.newPlayerPosX] = this.player;	// если встретилась верхняя или нижняя стенка - оставляем игрока в текущих координатах по оси Y, т.е. упёрся в стену
				// console.log('ВЕРХНЯЯ или НИЖНЯЯ СТЕНКА!!!')
			} else {
				// вычисляем какое значение в ячейке куда передвигаем игрока
				this.nextCellValue = this.gameField[this.newPlayerPosY][this.newPlayerPosX];

				switch (this.nextCellValue) {
					case 1:
						this.shift();	// двигаем
						break;
					case 2:
						this.dig();		// копаем
						break;
					case 3:
						this.stuck();	// упираемся
						break;
					case 4:
						this.collectDiam();	// собираем
						break;
				}
			}
		}
	}

	// метод передвижения модели игрока
	this.shift = () => {
		// ставим игрока в новые координаты
		this.gameField[this.newPlayerPosY][this.newPlayerPosX] = this.player;
		// записываем новые координаты игрока в текущую позицию
		this.posX = this.newPlayerPosX;
		this.posY = this.newPlayerPosY;
		myView.playSound(myView.stepSound);
		// console.log('Тут проход - ДВИГАЕМСЯ!');
		// console.log(this.gameField);
		this.gameState = 1;
	}

	// метод для копания
	this.dig = () => {
		// запускаем анимацию копания
		// === чуть ниже - волшебная константа, увязать с временем анимации ===============================
		this.gameState = 0;
		//	запускаем таймер на передвижение игрока
		setTimeout(this.shift, 50);
		// console.log('Тут земля - КОПАЕМ!');
	}

	// метод при упирании в стену
	this.stuck = () => {
		// оставляем игрока в текущих координатах
		this.gameField[this.posY][this.posX] = this.player;
		// console.log('Тут стена - Я НЕ МОГУ ПРОЙТИ!');
	}

	// метод для сбора алмаза
	this.collectDiam = () => {
		this.gameState = 0;
		//	запускаем таймер на передвижение игрока
		setTimeout(this.shift, 50);
		myView.playSound(myView.collectSound);
		// myView.stopSound(myView.stepSound);
		this.gameScore += 100;			//		прибавляем очки за собранный сундук
		this.restChests--;				// уменьшаем кол-во оставшихся сундуков
		this.collectedChests++;			// увеличиваем счетчик собранных сундуков
		this.updateHallOfFame();		//		обновляем зал славы
		// console.log('Тут алмаз - СОБИРАЕМ!');
	}
}

// View
function GameView() {
	let myModel = null;	// переменная для model
	let myField = null; 	// переменная для области в которой работаем

	// метод для проигрывания звука
	this.playSound = (sound) => {
		sound.currentTime = 0;
		sound.volume = 1;
		sound.play();
	}

	// метод остановки воспроизведения звука
	this.stopSound = (sound) => {
		sound.pause();
	}
	// метод выключения звука у аудио
	this.muteSound = (sound) => {
		sound.volume = 0;
	}

	// метод инициализации аудио
	this.soundInit = (sound) => {
		sound.play();
		sound.pause();
		console.log('Звук инициализирован');
	}

	// метод связывающий model и область отрисовки
	this.start = (model, field) => {
		myModel = model;
		myField = field;

		myField.width = 640;
		myField.height = 640;
		this.gameSound = new Audio('audio/main_sound.wav');
		this.stepSound = new Audio('audio/double_step.wav');
		this.collectSound = new Audio('audio/collect.wav');

		// музыка запускается по виртуальному клику по спрятанной кнопке после загрузки игры
		// описываем новое событие click
		let event = new Event("click");

		// soundBtn.onclick = () => { this.soundInit(this.gameSound) };
		soundBtn.onclick = () => {
			this.gameSound.loop = true;
			this.playSound(this.gameSound);
			this.gameSound.volume = 0.05;
		};
		// имитируем клик по скрытой кнопке, который запускает саундтрек
		soundBtn.dispatchEvent(event);

		resources.onReady(this.init);
	}

	// метод обновления визуализации игры
	this.update = () => {
		// функция которая отрисовывает игровое поле в зависимости от модели
		this.drawBackground();

		if (myModel.playerState == 0) {
			this.drawPlayer();
		}
		if (myModel.playerState == 1) {
			this.playerWalkUp();
		}
		if (myModel.playerState == 2) {
			this.playerWalkRight();
		}
		if (myModel.playerState == 3) {
			this.playerWalkDown();
		}
		if (myModel.playerState == 4) {
			this.playerWalkLeft();
		}
		gameScoreElem.innerHTML = myModel.gameScore;
		restChestsElem.innerHTML = myModel.restChests;
		collectedChestsElem.innerHTML = myModel.collectedChests;
	}

	// цикл игры
	let lastTime;

	this.loop = () => {
		let now = Date.now();
		let dt = (now - lastTime) / 1000.0;

		this.update();
		// this.update(dt);

		lastTime = now;
		requestAnimationFrame(this.loop);
	}

	// первая инициализация игры
	this.init = () => {
		lastTime = Date.now();

		this.loop();
	}

	// метод отрисовки заднего фона
	this.drawBackground = () => {
		this.context = myField.getContext('2d');
		this.context.clearRect(0, 0, myField.width, myField.height);
		for (let row = 0; row < 10; row++) {
			for (let column = 0; column < 10; column++) {
				// отрисовываем игровое поле
				this.context.drawImage(resources.get('img/game_sprite.png'),
					myModel.gameField[row][column] * 64, 0, 64, 64,
					column * 64, row * 64, 64, 64);
			}
		}
	}

	// метод отрисовки игрока
	this.drawPlayer = () => {
		this.context = myField.getContext('2d');
		for (let row = 0; row < 10; row++) {
			for (let column = 0; column < 10; column++) {
				// отрисовываем человечка
				if (myModel.gameField[row][column] == 0) {
					this.context.drawImage(resources.get('img/game_sprite.png'),
						5 * 64, 0, 64, 64,
						column * 64, row * 64, 64, 64)
				}
			}
		}
	}

	this.step = 0;
	this.stepSubFrame = 0;
	// метод отрисовки анимации идущего вправо игрока
	this.playerWalkRight = () => {
		this.context = myField.getContext('2d');
		for (let row = 0; row < 10; row++) {
			for (let column = 0; column < 10; column++) {
				// отрисовываем человечка
				if (myModel.gameField[row][column] == 0) {
					this.context.clearRect(0, 0, myField.width, myField.height);
					this.drawBackground();

					this.context.drawImage(resources.get('img/player_walk_right.png'),
						this.stepSubFrame * 64, 0, 64, 64,
						column * 64, row * 64, 64, 64);

					if (this.step % 12 == 0) {
						this.stepSubFrame++;
					}
					if (this.stepSubFrame == 8) {
						this.stepSubFrame = 0;
					}
					this.step++;
				}
			}
		}
	}

	// метод отрисовки анимации идущего влево игрока
	this.playerWalkLeft = () => {
		this.context = myField.getContext('2d');
		for (let row = 0; row < 10; row++) {
			for (let column = 0; column < 10; column++) {
				// отрисовываем человечка
				if (myModel.gameField[row][column] == 0) {
					this.context.clearRect(0, 0, myField.width, myField.height);
					this.drawBackground();

					this.context.drawImage(resources.get('img/player_walk_left.png'),
						this.stepSubFrame * 64, 0, 64, 64,
						column * 64, row * 64, 64, 64);

					if (this.step % 12 == 0) {
						this.stepSubFrame++;
					}
					if (this.stepSubFrame == 8) {
						this.stepSubFrame = 0;
					}
					this.step++;
				}
			}
		}
	}

	// метод отрисовки анимации идущего вверх игрока
	this.playerWalkUp = () => {
		this.context = myField.getContext('2d');
		for (let row = 0; row < 10; row++) {
			for (let column = 0; column < 10; column++) {
				// отрисовываем человечка
				if (myModel.gameField[row][column] == 0) {
					this.context.clearRect(0, 0, myField.width, myField.height);
					this.drawBackground();

					this.context.drawImage(resources.get('img/player_walk_up.png'),
						this.stepSubFrame * 64, 0, 64, 64,
						column * 64, row * 64, 64, 64);

					if (this.step % 12 == 0) {
						this.stepSubFrame++;
					}
					if (this.stepSubFrame == 8) {
						this.stepSubFrame = 0;
					}
					this.step++;
				}
			}
		}
	}

	// метод отрисовки анимации идущего вверх игрока
	this.playerWalkDown = () => {
		this.context = myField.getContext('2d');
		for (let row = 0; row < 10; row++) {
			for (let column = 0; column < 10; column++) {
				// отрисовываем человечка
				if (myModel.gameField[row][column] == 0) {
					this.context.clearRect(0, 0, myField.width, myField.height);
					this.drawBackground();

					this.context.drawImage(resources.get('img/player_walk_down.png'),
						this.stepSubFrame * 64, 0, 64, 64,
						column * 64, row * 64, 64, 64);

					if (this.step % 12 == 0) {
						this.stepSubFrame++;
					}
					if (this.stepSubFrame == 8) {
						this.stepSubFrame = 0;
					}
					this.step++;
				}
			}
		}
	}
}

// Controller
function GameController() {
	let myModel = null;
	let myField = null;

	// метод для связывания controller и model, и области отрисовки
	this.start = (model, field) => {
		myModel = model;
		myField = field;
		window.addEventListener('keydown', this.movePlayer);	// подписываемся на обрабочик событий по нажатию кнопки

	}
	this.movePlayer = (eo) => {
		eo = eo || window.event;

		if (eo.code == 'ArrowUp') {
			eo.preventDefault();
			myModel.move(0, -1);
			myModel.playerState = 1;	// вверх
			// console.log('Вверх');
			// console.log(myModel.gameField);
		}
		if (eo.code == 'ArrowDown') {
			eo.preventDefault();
			myModel.move(0, 1);
			myModel.playerState = 3;	// вниз
			// console.log('Вниз');
			// console.log(myModel.gameField);
		}
		if (eo.code == 'ArrowLeft') {
			eo.preventDefault();
			myModel.move(-1, 0);
			myModel.playerState = 4;		// влево
			// console.log('Влево');
			// console.log(myModel.playerState);
		}
		if (eo.code == 'ArrowRight') {
			eo.preventDefault();
			myModel.move(1, 0);
			myModel.playerState = 2;		// вправо
			// console.log('Вправо');
			// console.log(myModel.gameField);
		}
	}
}

// создаем MVC объекты игры
const game = new GameModel();
const view = new GameView();
const controller = new GameController();

game.start(view, lvlData);
view.start(game, gameFieldCanvas);
controller.start(game, gameFieldCanvas);

// вносим игрока в Model игры
const playerName = playerNameElem.value;
game.setPlayerName(playerName);

game.updateStorageProp(ajaxHoFScript, strName);

// сохранение игры во внешнее хранилище
saveTheGame.addEventListener('click', game.updateExtStorage);

// загрузить HoF из внешнего хранилища
loalLvlBtn.addEventListener('click', game.updateFromStorage);