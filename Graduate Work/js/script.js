'use strict'
// Model
function GameModel() {
	this.gameField = [
		[1, 1, 1, 1, 1],
		[2, 2, 2, 2, 2],
		[3, 3, 1, 1, 1],
		[4, 4, 4, 4, 4],
	];
	// массив для хранения игрового поля
	// let gameField = [];	// массив для хранения игрового поля
	// 0 - игрок
	// 1 - проход
	// 2 - земля которую можно копать
	// 3 - камень который нельзя копать
	// 4 - алмаз
	// 5 - сундук или мешочек

	// границы игрового поля
	this.topBorder = 0;											// верхняя граница
	this.bottomBorder = this.gameField.length;			// нижняя граница
	this.leftBorder = 0;											// левая граница
	this.rightBorder = this.gameField[0].length;			// правая граница

	this.player = 0;							// игрок в поле
	this.pass = 1;								// проход 

	this.gameState = 1;		// состояние игры
	// 0 - игра остановлена
	// 1 - игра запущена

	this.gameScore = 0;		// очки игрока

	// стартовые координаты игрока
	this.posX = 0;
	this.posY = 0;

	this.gameField[this.posY][this.posX] = this.player;	// помещаем игрока в начальную позицию

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
						this.shift();
						break;
					case 2:
						this.dig();
						break;
					case 3:
						this.stuck();
						break;
					case 4:
						this.collectDiam();
						break;
				}
			}

			this.updateView();	// обновляем модель
		}
	}

	// метод передвижения модели игрока
	this.shift = () => {
		// ставим игрока в новые координаты
		this.gameField[this.newPlayerPosY][this.newPlayerPosX] = this.player;
		// записываем новые координаты игрока в текущую позицию
		this.posX = this.newPlayerPosX;
		this.posY = this.newPlayerPosY;
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
		setTimeout(this.shift, 3000);
		// this.gameField[this.newPlayerPosY][this.newPlayerPosX] = this.pass;
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
		// // ставим игрока в новые координаты
		// this.gameField[this.newPlayerPosY][this.newPlayerPosX] = this.player;
		// // записываем новые координаты игрока в текущую позицию
		// this.posX = this.newPlayerPosX;
		// this.posY = this.newPlayerPosY;
		this.gameState = 0;
		//	запускаем таймер на передвижение игрока
		setTimeout(this.shift, 3000);
		this.gameScore += 100;		//		прибавляем очки за собранный алмаз
		console.log('Тут алмаз - СОБИРАЕМ!');
	}
}






// View
function GameView() {
	let myModel = null;	// переменная для model
	let myField = null; 	// переменная для области в которой работаем


	this.start = (model, field) => {
		myModel = model;
		myField = field;
		myField.width = 1024;
		myField.height = 768;
	}

	this.update = () => {
		// функция которая будет изменять отображение в зависимости от модели





		console.log(myModel.gameField);
		console.log(myModel.nextCellValue)
		console.log('Игровые очки: ' + myModel.gameScore);
	}
}






// Controller
function GameController() {
	let myModel = null;
	let myField = null;

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
			console.log('Вверх');
			// console.log(myModel.gameField);
		}
		if (eo.code == 'ArrowDown') {
			eo.preventDefault();
			myModel.move(0, 1);
			console.log('Вниз');
			// console.log(myModel.gameField);
		}
		if (eo.code == 'ArrowLeft') {
			eo.preventDefault();
			myModel.move(-1, 0);
			console.log('Влево');
			// console.log(myModel.gameField);
		}
		if (eo.code == 'ArrowRight') {
			eo.preventDefault();
			myModel.move(1, 0);
			console.log('Вправо');
			// console.log(myModel.gameField);
		}
	}
}

const game = new GameModel();
const view = new GameView();
const controller = new GameController();

const gameFieldCanvas = document.querySelector('#gameField');

game.start(view);
view.start(game, gameFieldCanvas);
controller.start(game, gameFieldCanvas);

game.updateView();









/*
// model
function ManModel() {
	this.posX = 50;
	this.posY = 50;
	this.isRun = false;

	let myView = null;

	this.start = function (view) {
		myView = view;
	}

	this.updateView = function () {
		// при любых изменениях модели попадаем
		// сюда; представление может быть любым,
		// лишь бы имело метод update()
		if (myView)
			myView.update();
	};

	this.shift = function (x, y) {
		this.posX += (this.isRun ? 30 : 5) * x;
		this.posY += (this.isRun ? 30 : 5) * y;
		this.updateView();
		// модель при любых изменениях
		// вызывает обновление представления
	};

	this.setRun = function (r) {
		this.isRun = r;
		this.updateView();
		// модель при любых изменениях
		// вызывает обновление представления
	}

};

// view

function ManViewWebPage() {
	let myModel = null; // с какой моделью работаем
	// внутри какого тега наша вёрстка
	let myField = null;
	let runCheckbox = null; // чекбокс "бег"
	let manDiv = null; // сам человечек

	this.start = function (model, field) {
		myModel = model;
		myField = field;

		// ищем и запоминаем нужные элементы DOM
		runCheckbox = myField.querySelector('.SRun');
		manDiv = myField.querySelector('.SMan');
	}

	this.update = function () {
		runCheckbox.checked = myModel.isRun;
		manDiv.style.left = myModel.posX + "px";
		manDiv.style.top = myModel.posY + "px";
	}

};

// controller

function ManControllerButtons() {
	let myModel = null; // с какой моделью работаем
	// внутри какого тега наша вёрстка
	let myField = null;
	let runCheckbox = null; // чекбокс "бег"

	this.start = function (model, field) {
		myModel = model;
		myField = field;

		// ищем и запоминаем нужные элементы DOM
		// назначаем обработчики событий

		runCheckbox = myField.querySelector('.SRun');
		runCheckbox.addEventListener('change',
			this.runChanged);

		const buttonUp =
			myField.querySelector('.SUp');
		buttonUp.addEventListener('click',
			this.shiftUp);
		const buttonDown =
			myField.querySelector('.SDown');
		buttonDown.addEventListener('click',
			this.shiftDown);
		const buttonLeft =
			myField.querySelector('.SLeft');
		buttonLeft.addEventListener('click',
			this.shiftLeft);
		const buttonRight =
			myField.querySelector('.SRight');
		buttonRight.addEventListener('click',
			this.shiftRight);
	}

	// контроллер вызывает только методы модели
	this.shiftLeft = function () {
		myModel.shift(-1, 0);
	}

	this.shiftRight = function () {
		myModel.shift(1, 0);
	}

	this.shiftUp = function () {
		myModel.shift(0, -1);
	}

	this.shiftDown = function () {
		myModel.shift(0, 1);
	}

	this.runChanged = function () {
		if (myModel)
			myModel.setRun(runCheckbox.checked);
	}

}

*/

































/*
// модель данных
function TGameModel(_Parent)
{
  this.Parent=_Parent;

  this.CatalogModelH={};
  
  // класс "пушка"
  function TGun(_Parent)
  {
	 this.Parent=_Parent; // родитель
	 this.Ident=null; // идентификатор
	 this.Type=this.Parent.Parent.CGunsType;
	 this.Bullets=undefined; // свойство "осталось снарядов"
	 // метод "перезарядка"
	 this.Reload=function(NewBullets) { this.Bullets=NewBullets; }
	 // метод "огонь"
	 this.Fire=function() { console.log('Fire!'); }
	 // инициализатор - пушка как объект JS создана, заполняем поля, регистрируем в каталоге
	 this.Init=function(_Ident) 
	 {
		this.Ident=_Ident;
		this.Reload(50);  // заряжаем 50 снарядами
		this.Parent.CatalogModelH[this.Ident]=this; // регистрируем в каталоге
		console.log('модель пушки '+this.Ident+' создана и инициализирована');
	 }
	 // деструктор - удаляем из каталога, чистим все ссылки, методы можно не чистить
	 this.Destroy=function()
	 {
		delete this.Parent.CatalogModelH[this.Ident];
		this.Parent=null;
		console.log('модель пушки '+this.Ident+' разрушена');
	 }
  }

  // класс "фабрика пушек"
  function TGunFactory(_Parent)
  {
	 this.Parent=_Parent; // родитель
	 this.Counter=0; // сколько уже пушек создано
	 // создание новой пушки
	 this.Create=function()
	 {
		this.Counter++;
		var Ident=this.Parent.Parent.CGunsType+this.Counter;
		var Gun=new TGun(this.Parent); // родителем для пушек будет GameModel
		Gun.Init(Ident);
		return Gun;
	 }
  }

  this.GunFactory=new TGunFactory(this);

  // менеджер тайлов (не реализован)
  function TTilesManager(_Parent) { }
  this.TilesManager=new TTilesManager(this);
}

// визуал
function TGameVisual(_Parent)
{
  this.Parent=_Parent;

  this.CatalogVisualH={};
  
  // класс "визуал пушки"
  function TGunVisual(_Parent)
  {
	 this.Parent=_Parent; // родитель
	 this.Ident=null; // идентификатор
	 this.Type=this.Parent.Parent.CGunsType;
	 this.Image=null; // ссылка на некий DOM-элемент
	 // инициализатор - визуал пушки как объект JS создан, заполняем поля, регистрируем в каталоге
	 this.InitVisual=function(_Ident)
	 {
		this.Ident=_Ident;
		var Gun=this.Parent.Parent.GameModel.CatalogModelH[this.Ident];
		// this.Image=document.createElement(...)
		this.Parent.CatalogVisualH[this.Ident]=this; // регистрируем в каталоге
		console.log('визуал пушки '+Gun.Ident+' создан и инициализирован');
	 }
	 // деструктор - удаляем из каталога, чистим все ссылки, методы можно не чистить
	 this.DestroyVisual=function()
	 {
		delete this.Parent.CatalogVisualH[this.Ident];
		// удаляем this.Image из DOM или прячем в чулан
		this.Image=null;
		console.log('визуал пушки '+this.Ident+' разрушен');
	 }
	 // метод "обновить визуал"
	 this.UpdateVisual=function()
	 {
		// получаем модель пушки
		var Gun=this.Parent.Parent.GameModel.CatalogModelH[this.Ident];
		// вносим нужные изменения в визуал, т.е. в DOM-элемент
	 }
  }

  // класс "фабрика визуалов пушек"
  function TGunVisualFactory(_Parent)
  {
	 this.Parent=_Parent; // родитель
	 // создание нового визуала пушки
	 this.CreateVisual=function(_Ident)
	 {
		var GunVisual=new TGunVisual(this.Parent); // родителем для визуалов пушек будет GameVisual
		GunVisual.InitVisual(_Ident);
		return GunVisual;
	 }
  }

  this.GunVisualFactory=new TGunVisualFactory(this);
}

// контроллер игры
function TGameControl(_Parent)
{
  this.Parent=_Parent;

  this.CatalogControlH={};
  
  // класс "контроллер пушки"
  function TGunControl(_Parent)
  {
	 this.Parent=_Parent; // родитель
	 this.Ident=null; // идентификатор
	 this.Type=this.Parent.Parent.CGunsType;
	 this.Timer=null; // ссылка на некий создаваемый объект
	 // инициализатор - контроллер пушки как объект JS создан, заполняем поля, регистрируем в каталоге
	 this.InitControl=function(_Ident)
	 {
		this.Ident=_Ident;
		var Gun=this.Parent.Parent.GameModel.CatalogModelH[this.Ident];
		// this.Timer=createInterval(...) // создаём необходимые контроллеру объекты
		// addEventListener(...);  // навешиваем обработчики
		this.Parent.CatalogControlH[this.Ident]=this; // регистрируем в каталоге
		console.log('контроллер пушки '+Gun.Ident+' создан и инициализирован');
	 }
	 // деструктор - удаляем из каталога, чистим все ссылки, методы можно не чистить
	 this.DestroyControl=function()
	 {
		console.log('контроллер пушки '+this.Ident+' разрушен');
		delete this.Parent.CatalogControlH[this.Ident];
		// clearInterval(...); // останавливаем таймер
		// removeEventListener(...);  // удаляем обработчики
		this.Timer=null;
	 }
	 // метод "обновить визуал"
	 this.UpdateControl=function()
	 {
		// получаем модель пушки
		var Gun=this.Parent.Parent.GameModel.CatalogModelH[this.Ident];
		// получаем визуал пушки
		var GunVisual=this.Parent.Parent.GameVisual.CatalogVisualH[this.Ident];
		// вносим нужные изменения в контроллер - в обработчики, в таймер...
	 }
  }

  // класс "фабрика контроллеров пушек"
  function TGunControlFactory(_Parent)
  {
	 this.Parent=_Parent; // родитель
	 // создание нового контроллера пушки
	 this.CreateControl=function(_Ident)
	 {
		var GunControl=new TGunControl(this.Parent); // родителем для контроллеров пушек будет GameControl
		GunControl.InitControl(_Ident);
		return GunControl;
	 }
  }

  this.GunControlFactory=new TGunControlFactory(this);

  this.TestGunCreate=function()
  {
	 console.log('--- тест создания пушки');
	 
	 var Gun=this.Parent.GameModel.GunFactory.Create();
	 var GunVisual=this.Parent.GameVisual.GunVisualFactory.CreateVisual(Gun.Ident);
	 var GunControl=this.Parent.GameControl.GunControlFactory.CreateControl(Gun.Ident);

	 console.log('ГОТОВА пушка '+Gun.Ident+', снарядов '+Gun.Bullets);

	 return Gun.Ident;
  }
  this.TestGunDestroy=function(Ident)
  {
	 console.log('--- тест удаления пушки');

	 var GunControl=this.CatalogControlH[Ident];
	 GunControl.DestroyControl();

	 var GunVisual=this.Parent.GameVisual.CatalogVisualH[Ident];
	 GunVisual.DestroyVisual();

	 var Gun=this.Parent.GameModel.CatalogModelH[Ident];
	 Gun.Destroy();

	 console.log('УДАЛЕНА пушка '+Ident);
  }
}

// класс игры
function TGame()
{
  this.CGunsType="GUN"; // константа - тип для объектов "пушка"

  this.GameModel=new TGameModel(this);
  this.GameVisual=new TGameVisual(this);
  this.GameControl=new TGameControl(this);

  this.Test=function()
  {
	 var GunIdent=this.GameControl.TestGunCreate();
	 this.GameControl.TestGunDestroy(GunIdent);
  }
}

// объект игры
var Game=new TGame();

// тестируем
Game.Test();
*/