let lastName = prompt('Введите Вашу фамилию');
let firstName = prompt('Введите Ваше имя');
let patronymic = prompt('Введите Ваше отчество');
let ageYears = prompt('Введите ваш возраст в годах');

/*проверка, что фамилия длиннее 1 символа и не число*/
while (lastName.length < 1 || isFinite(lastName)) {
	lastName = prompt('Введите Вашу фамилию');
}

/*проверка, что имя длиннее 1 символа и не число*/
while (firstName.length < 1 || isFinite(firstName)) {
	firstName = prompt('Введите Ваше имя');
}

/*проверка, что отчество длиннее 1 символа и не число*/
while (patronymic.length < 1 || isFinite(patronymic)) {
	patronymic = prompt('Введите Ваше отчество');
}

/*проверка, что возраст не NaN или число больше 0 или не буква */
while (isNaN(ageYears) || Number(ageYears) < 0 || !isFinite(ageYears)) {
	ageYears = prompt('Введите ваш возраст в годах');
}

let ageDays = Number(ageYears) * 365;
let ageAfterFive = Number(ageYears) + 5;
let gender = confirm('Ваш пол мужской?');

gender ? gender = 'мужской' : gender = 'женский';

let pension;
(gender == 'мужской') ? (ageYears >= 65 ? pension = 'да' : pension = 'нет') : (ageYears >= 61 ? pension = 'да' : pension = 'нет');

alert(
	`Ваше ФИО: ${lastName} ${firstName} ${patronymic} \nВаш возраст в годах: ${ageYears} \nВаш возраст в днях: ${ageDays} \nЧерез 5 лет вам будет: ${ageAfterFive} \nВаш пол: ${gender} \nВы на пенсии: ${pension}`
);