let canvasElem = document.querySelector('#CanvasElem');
canvasElem.width = 640;
canvasElem.height = 640;

let gameField = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	[3, 3, 3, 2, 3, 3, 3, 1, 1, 1],
	[4, 4, 4, 4, 4, 1, 1, 1, 1, 1],
	[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	[2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

// массив для хранения игрового поля
// let gameField = [];	// массив для хранения игрового поля
// 0 - игрок
// 1 - проход
// 2 - земля которую можно копать
// 3 - камень который нельзя копать
// 4 - алмаз
// 5 - сундук или мешочек

let context = canvasElem.getContext('2d');
let spriteSheet = new Image();
// let playerSprite = new Image();

spriteSheet.src = 'img/game_sprite.png';
// playerSprite.src = 'img/player_sprite.png';

function drawBackground() {
	context.clearRect(0, 0, canvasElem.width, canvasElem.height);
	for (let row = 0; row < 10; row++) {
		for (let column = 0; column < 10; column++) {
			// отрисовываем игровое поле
			context.drawImage(spriteSheet,
				gameField[row][column] * 64, 0, 64, 64,
				column * 64, row * 64, 64, 64);
		}
	}
}

function drawPlayer() {

	for (let row = 0; row < 10; row++) {
		for (let column = 0; column < 10; column++) {
			// отрисовываем человечка
			if (gameField[row][column] == 0) {
				context.drawImage(spriteSheet,
					5 * 64, 0, 64, 64,
					column * 64, row * 64, 64, 64)
			}
		}
	}
}

let playerWalkRightSprite = new Image();
playerWalkRightSprite.src = 'img/Player_walk_left.png';

let step = 0;
let stepSubFrame = 0;

function playerWalkRight() {
	requestAnimationFrame(playerWalkRight);

	context.clearRect(0, 0, canvasElem.width, canvasElem.height);
	drawBackground();


	context.drawImage(playerWalkRightSprite,
		stepSubFrame * 64, 0, 64, 64,
		64, 64, 64, 64);
	if (step % 12 == 0) {
		stepSubFrame++;
	}
	if (stepSubFrame == 8) {
		stepSubFrame = 0;
	}
	step++;

}

function loop() {
	// drawBackground();
	// drawPlayer();
}

playerWalkRightSprite.onload = function () {
	requestAnimationFrame(playerWalkRight);
	// playerWalkRight();
	// setInterval(playerWalkRight, 20);
}

spriteSheet.onload = function () {
	setInterval(loop, 30);
}