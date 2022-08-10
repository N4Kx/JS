let lastName = prompt('Введите Вашу фамилию');
let firstName = prompt('Введите Ваше имя');
let patronymic = prompt('Введите Ваше отчество');
let ageYears = prompt('Введите ваш возраст в годах');
let ageDays = ageYears * 365;
let ageAfterFive = Number(ageYears) + 5;
let gender = confirm('Ваш пол мужской?');

gender ? gender = 'мужской' : gender = 'женский';

let pension;
(gender == 'мужской') ? (ageYears >= 65 ? pension = 'да' : pension = 'нет') : (ageYears >= 61 ? pension = 'да' : pension = 'нет');

while (lastName.length < 1) {
	lastName = prompt('Введите Вашу фамилию');
}
while (firstName.length < 1) {
	firstName = prompt('Введите Ваше имя');
}
while (patronymic.length < 1) {
	patronymic = prompt('Введите Ваше отчество');
}

while (isNaN(ageYears)) {
	ageYears = prompt('Введите ваш возраст в годах');
}

alert(
	`Ваше ФИО: ${lastName} ${firstName} ${patronymic} \nВаш возраст в годах: ${ageYears} \nВаш возраст в днях: ${ageDays} \nЧерез 5 лет вам будет: ${ageAfterFive} \nВаш пол: ${gender} \nВы на пенсии: ${pension}`
);