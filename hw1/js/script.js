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

if (lastName.length > 0) {
	lastName = prompt('Введите Вашу фамилию');
}


alert(
	`Ваше ФИО: ${lastName} ${firstName} ${patronymic} \nВаш возраст в годах: ${ageYears} \nВаш возраст в днях: ${ageDays} \nЧерез 5 лет вам будет: ${ageAfterFive} \nВаш пол: ${gender} \nВы на пенсии: ${pension}`
);