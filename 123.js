// модель данных
function TGameModel(_Parent) {
	this.Parent = _Parent;

	this.CatalogModelH = {};

	// класс "пушка"
	function TGun(_Parent) {
		this.Parent = _Parent; // родитель
		this.Ident = null; // идентификатор
		this.Type = this.Parent.Parent.CGunsType;
		this.Bullets = undefined; // свойство "осталось снарядов"
		// метод "перезарядка"
		this.Reload = function (NewBullets) { this.Bullets = NewBullets; }
		// метод "огонь"
		this.Fire = function () { console.log('Fire!'); }
		// инициализатор - пушка как объект JS создана, заполняем поля, регистрируем в каталоге
		this.Init = function (_Ident) {
			this.Ident = _Ident;
			this.Reload(50);  // заряжаем 50 снарядами
			this.Parent.CatalogModelH[this.Ident] = this; // регистрируем в каталоге
			console.log('модель пушки ' + this.Ident + ' создана и инициализирована');
		}
		// деструктор - удаляем из каталога, чистим все ссылки, методы можно не чистить
		this.Destroy = function () {
			delete this.Parent.CatalogModelH[this.Ident];
			this.Parent = null;
			console.log('модель пушки ' + this.Ident + ' разрушена');
		}
	}

	// класс "фабрика пушек"
	function TGunFactory(_Parent) {
		this.Parent = _Parent; // родитель
		this.Counter = 0; // сколько уже пушек создано
		// создание новой пушки
		this.Create = function () {
			this.Counter++;
			var Ident = this.Parent.Parent.CGunsType + this.Counter;
			var Gun = new TGun(this.Parent); // родителем для пушек будет GameModel
			Gun.Init(Ident);
			return Gun;
		}
	}

	this.GunFactory = new TGunFactory(this);

	// менеджер тайлов (не реализован)
	function TTilesManager(_Parent) { }
	this.TilesManager = new TTilesManager(this);
}

// визуал
function TGameVisual(_Parent) {
	this.Parent = _Parent;

	this.CatalogVisualH = {};

	// класс "визуал пушки"
	function TGunVisual(_Parent) {
		this.Parent = _Parent; // родитель
		this.Ident = null; // идентификатор
		this.Type = this.Parent.Parent.CGunsType;
		this.Image = null; // ссылка на некий DOM-элемент
		// инициализатор - визуал пушки как объект JS создан, заполняем поля, регистрируем в каталоге
		this.InitVisual = function (_Ident) {
			this.Ident = _Ident;
			var Gun = this.Parent.Parent.GameModel.CatalogModelH[this.Ident];
			// this.Image=document.createElement(...)
			this.Parent.CatalogVisualH[this.Ident] = this; // регистрируем в каталоге
			console.log('визуал пушки ' + Gun.Ident + ' создан и инициализирован');
		}
		// деструктор - удаляем из каталога, чистим все ссылки, методы можно не чистить
		this.DestroyVisual = function () {
			delete this.Parent.CatalogVisualH[this.Ident];
			// удаляем this.Image из DOM или прячем в чулан
			this.Image = null;
			console.log('визуал пушки ' + this.Ident + ' разрушен');
		}
		// метод "обновить визуал"
		this.UpdateVisual = function () {
			// получаем модель пушки
			var Gun = this.Parent.Parent.GameModel.CatalogModelH[this.Ident];
			// вносим нужные изменения в визуал, т.е. в DOM-элемент
		}
	}

	// класс "фабрика визуалов пушек"
	function TGunVisualFactory(_Parent) {
		this.Parent = _Parent; // родитель
		// создание нового визуала пушки
		this.CreateVisual = function (_Ident) {
			var GunVisual = new TGunVisual(this.Parent); // родителем для визуалов пушек будет GameVisual
			GunVisual.InitVisual(_Ident);
			return GunVisual;
		}
	}

	this.GunVisualFactory = new TGunVisualFactory(this);
}

// контроллер игры
function TGameControl(_Parent) {
	this.Parent = _Parent;

	this.CatalogControlH = {};

	// класс "контроллер пушки"
	function TGunControl(_Parent) {
		this.Parent = _Parent; // родитель
		this.Ident = null; // идентификатор
		this.Type = this.Parent.Parent.CGunsType;
		this.Timer = null; // ссылка на некий создаваемый объект
		// инициализатор - контроллер пушки как объект JS создан, заполняем поля, регистрируем в каталоге
		this.InitControl = function (_Ident) {
			this.Ident = _Ident;
			var Gun = this.Parent.Parent.GameModel.CatalogModelH[this.Ident];
			// this.Timer=createInterval(...) // создаём необходимые контроллеру объекты
			// addEventListener(...);  // навешиваем обработчики
			this.Parent.CatalogControlH[this.Ident] = this; // регистрируем в каталоге
			console.log('контроллер пушки ' + Gun.Ident + ' создан и инициализирован');
		}
		// деструктор - удаляем из каталога, чистим все ссылки, методы можно не чистить
		this.DestroyControl = function () {
			console.log('контроллер пушки ' + this.Ident + ' разрушен');
			delete this.Parent.CatalogControlH[this.Ident];
			// clearInterval(...); // останавливаем таймер
			// removeEventListener(...);  // удаляем обработчики
			this.Timer = null;
		}
		// метод "обновить визуал"
		this.UpdateControl = function () {
			// получаем модель пушки
			var Gun = this.Parent.Parent.GameModel.CatalogModelH[this.Ident];
			// получаем визуал пушки
			var GunVisual = this.Parent.Parent.GameVisual.CatalogVisualH[this.Ident];
			// вносим нужные изменения в контроллер - в обработчики, в таймер...
		}
	}

	// класс "фабрика контроллеров пушек"
	function TGunControlFactory(_Parent) {
		this.Parent = _Parent; // родитель
		// создание нового контроллера пушки
		this.CreateControl = function (_Ident) {
			var GunControl = new TGunControl(this.Parent); // родителем для контроллеров пушек будет GameControl
			GunControl.InitControl(_Ident);
			return GunControl;
		}
	}

	this.GunControlFactory = new TGunControlFactory(this);

	this.TestGunCreate = function () {
		console.log('--- тест создания пушки');

		var Gun = this.Parent.GameModel.GunFactory.Create();
		var GunVisual = this.Parent.GameVisual.GunVisualFactory.CreateVisual(Gun.Ident);
		var GunControl = this.Parent.GameControl.GunControlFactory.CreateControl(Gun.Ident);

		console.log('ГОТОВА пушка ' + Gun.Ident + ', снарядов ' + Gun.Bullets);

		return Gun.Ident;
	}
	this.TestGunDestroy = function (Ident) {
		console.log('--- тест удаления пушки');

		var GunControl = this.CatalogControlH[Ident];
		GunControl.DestroyControl();

		var GunVisual = this.Parent.GameVisual.CatalogVisualH[Ident];
		GunVisual.DestroyVisual();

		var Gun = this.Parent.GameModel.CatalogModelH[Ident];
		Gun.Destroy();

		console.log('УДАЛЕНА пушка ' + Ident);
	}
}

// класс игры
function TGame() {
	this.CGunsType = "GUN"; // константа - тип для объектов "пушка"

	this.GameModel = new TGameModel(this);
	this.GameVisual = new TGameVisual(this);
	this.GameControl = new TGameControl(this);

	this.Test = function () {
		var GunIdent = this.GameControl.TestGunCreate();
		this.GameControl.TestGunDestroy(GunIdent);
	}
}

// объект игры
var Game = new TGame();

// тестируем
Game.Test();
