'use strict';
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
	this.gameField = [
		[1, 1, 1, 4, 4, 4, 4, 4, 2, 2],
		[2, 2, 2, 2, 2, 2, 2, 1, 2, 2],
		[3, 3, 3, 2, 3, 3, 3, 1, 3, 4],
		[4, 4, 4, 4, 4, 1, 1, 1, 1, 1],
		[3, 4, 3, 2, 3, 4, 3, 2, 3, 2],
		[3, 4, 3, 2, 3, 4, 3, 2, 3, 2],
		[3, 4, 3, 2, 3, 3, 3, 2, 3, 2],
		[4, 4, 2, 2, 2, 2, 2, 2, 3, 2],
		[3, 3, 3, 3, 3, 3, 2, 2, 2, 2],
		[4, 4, 4, 4, 4, 4, 1, 1, 2, 2],
	];
	// массив для хранения игрового поля
	// 0 - игрок
	// 1 - проход
	// 2 - земля которую можно копать
	// 3 - камень который нельзя копать
	// 4 - сундук

	// границы игрового поля
	this.topBorder = 0;											// верхняя граница
	this.bottomBorder = this.gameField.length;			// нижняя граница
	this.leftBorder = 0;											// левая граница
	this.rightBorder = this.gameField[0].length;			// правая граница

	this.player = 0;							// игрок в поле
	this.pass = 1;								// проход 

	// состояние игрока для анимации
	this.playerState = 0;
	// 0 - игрок стоит
	// 1 - игрок идет верх
	// 2 - игрок идет вправо
	// 3 - игрок идет вниз
	// 4 - игрок идет влево
	// 5 - игрок копает

	// состояние игры
	this.gameState = 1;
	// 0 - игра остановлена
	// 1 - игра запущена

	// очки игрока
	this.gameScore = 0;

	// стартовые координаты игрока
	this.posX = 0;
	this.posY = 0;

	// помещаем игрока в начальную позицию
	this.gameField[this.posY][this.posX] = this.player;

	let myView = null;

	// метод для связывания model и view
	this.start = (view) => {
		myView = view;	// переменная для view
	}

	// метод для обновления view (отображения)
	this.updateView = () => {
		if (myView) {
			myView.update();
		}
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
				console.log('ЛЕВАЯ или ПРАВАЯ СТЕНКА!!!')
			} else if (this.newPlayerPosY < this.topBorder || this.newPlayerPosY >= this.bottomBorder) {
				this.gameField[this.posY][this.newPlayerPosX] = this.player;	// если встретилась верхняя или нижняя стенка - оставляем игрока в текущих координатах по оси Y, т.е. упёрся в стену
				console.log('ВЕРХНЯЯ или НИЖНЯЯ СТЕНКА!!!')
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
		console.log('Тут проход - ДВИГАЕМСЯ!');
		console.log(this.gameField);
		this.gameState = 1;
	}

	// метод для копания
	this.dig = () => {
		// запускаем анимацию копания
		// === чуть ниже - волшебная константа, увязать с временем анимации ===============================
		this.gameState = 0;
		//	запускаем таймер на передвижение игрока
		setTimeout(this.shift, 50);
		console.log('Тут земля - КОПАЕМ!');
	}

	// метод при упирании в стену
	this.stuck = () => {
		// оставляем игрока в текущих координатах
		this.gameField[this.posY][this.posX] = this.player;
		console.log('Тут стена - Я НЕ МОГУ ПРОЙТИ!');
	}

	// метод для сбора алмаза
	this.collectDiam = () => {
		this.gameState = 0;
		//	запускаем таймер на передвижение игрока
		setTimeout(this.shift, 50);
		myView.playSound(myView.collectSound);
		// myView.stopSound(myView.stepSound);
		this.gameScore += 100;		//		прибавляем очки за собранный алмаз
		console.log('Тут алмаз - СОБИРАЕМ!');
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

		// для теста. музыка запускается, если кликнуть по игровому полю
		field.onclick = () => { this.soundInit(this.gameSound) };
		field.onclick = () => {
			this.gameSound.loop = true;
			this.playSound(this.gameSound);
			this.gameSound.volume = 0.05;
		};

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

// находим область отрисовки
const gameFieldCanvas = document.querySelector('#gameField');

// связываем MVC объекты игры
game.start(view);
view.start(game, gameFieldCanvas);
controller.start(game, gameFieldCanvas);