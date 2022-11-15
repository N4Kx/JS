const clickAudio = new Audio;
// результат canPlayType: "probably" - скорее всего,
// "maybe" - неизвестно, "" - нет
console.log(
	clickAudio.canPlayType("audio/ogg; codecs=vorbis"),
	clickAudio.canPlayType("audio/mpeg"));


if (clickAudio.canPlayType("audio/mpeg") == "probably")
	clickAudio.src =
		"http://fe.it-academy.by/Examples/Sounds/button-16.mp3";
else
	clickAudio.src =
		"http://fe.it-academy.by/Examples/Sounds/button-16.ogg";

// если поддержка формата точно известна,
// можно сразу так:
// const clickAudio=new Audio("имяфайла.mp3");

let ballH = {
	posX: 0,
	posY: 0,
	speedX: 1,
	speedY: 1,
	width: 100,
	height: 100,

	update: function () {
		const ballElem = document.getElementById('IBall');
		ballElem.style.left = this.posX + "px";
		ballElem.style.top = this.posY + "px";
	}
}

const areaH = {
	width: 290,
	height: 280
}

function start() {
	clickSoundInit(); // важно "запустить" звук
	// по событию, т.е. нажатию кнопки
	requestAnimationFrame(tick);
}

function tick() {
	ballH.posX += ballH.speedX;
	// вылетел ли мяч правее стены?
	if (ballH.posX + ballH.width > areaH.width) {
		ballH.speedX = -ballH.speedX;
		ballH.posX = areaH.width - ballH.width;
		clickSound();
	}
	// вылетел ли мяч левее стены?
	if (ballH.posX < 0) {
		ballH.speedX = -ballH.speedX;
		ballH.posX = 0;
		clickSound();
	}

	ballH.posY += ballH.speedY;
	// вылетел ли мяч ниже пола?
	if (ballH.posY + ballH.height > areaH.height) {
		ballH.speedY = -ballH.speedY;
		ballH.posY = areaH.height - ballH.height;
		clickSound();
	}
	// вылетел ли мяч выше потолка?
	if (ballH.posY < 0) {
		ballH.speedY = -ballH.speedY;
		ballH.posY = 0;
		clickSound();
	}

	ballH.update();

	requestAnimationFrame(tick);
}

ballH.update();

function clickSoundInit() {
	clickAudio.play(); // запускаем звук
	clickAudio.pause(); // и сразу останавливаем
}

function clickSound() {
	clickAudio.currentTime = 0; // в секундах
	clickAudio.play();
}
