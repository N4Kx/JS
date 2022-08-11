let lastName = prompt('Введите Вашу фамилию');
/*проверка, что значение переменной не null, длиннее 1 символа и не число*/
while (lastName === null || lastName.length < 1 || isFinite(lastName)) {
	lastName = prompt('Введите Вашу фамилию');
}

let firstName = prompt('Введите Ваше имя');
/*проверка, что значение переменной не null, длиннее 1 символа и не число*/
while (firstName === null || firstName.length < 1 || isFinite(firstName)) {
	firstName = prompt('Введите Ваше имя');
}

let patronymic = prompt('Введите Ваше отчество');
/*проверка, что значение переменной не null, длиннее 1 символа и не число*/
while (patronymic === null || patronymic.length < 1 || isFinite(patronymic)) {
	patronymic = prompt('Введите Ваше отчество');
}

let ageYears = prompt('Введите ваш возраст в годах');
/*проверка, что значение переменной не null, не NaN, число больше 0 и не буква */
while (ageYears === null || isNaN(ageYears) || Number(ageYears) <= 0 || !isFinite(ageYears)) {
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