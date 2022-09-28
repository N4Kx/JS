/*
Список проверок:
	1. Разработчики - поле не может быть пустым
	2. Название сайта - поле не может быть пустым
	3. URL сайта - поле не может быть пустым, длина URL не должна быть длиннее 40 символов.
	4. Дата запуска сайта - поле не может быть пустым, год запуска сайта должен быть не меньше 2023 - мы очень заняты ))))
	5. Посетителей в сутки - поле не может быть пустым, не должно быть больше 1000 - у нас не хватает мощности серверов и/или "плохая связь" у наших серверов.
	6. E-mail для связи - поле не должно быть пустым, введённая строка должна содержать символ '@'
	7. Рубрика каталога - нельзя выбрать "Бытовая техника" (Value = 3);
	8. Размещение - поле не должно быть пустым.
	9. Разрешить отзывы - поле не должно быть пустым.
	10. Описание сайта - поле не должно быть пустым, поле должно содержать не менее 5 слов.

	Я понимаю, что полям типа чекбокс и радиокнопка я обработал не совсем как того требовало задание, но мне показался этот вариант интреснее.
	
	Ещё я понимаю, что в вёрстке может и не быть div-элемента для записи/отображения ошибки. Его можно создать через JS, задать ему стили/CSS-класс (чтобы не поломать вёрстку) и в него поместить текст с описанием какая ошибка возникла. Для этого я бы делал проверку в несколько этапов if... else if И в зависимости от того, какой if сработал - помщать в него текст, чтобы помочь пользователю понять, что пошло не так.
*/

'use strict';
const formTag = document.forms.form1;												// получаем ссылку на форму, помещаем её в глобальную константу

formTag.addEventListener('submit', validateFormSubmit, false)				// подписываемся на обработчик событий для всей формы

const devField = formTag.elements.form1__developers;							// помещаем в константу ссылку на поле формы "разработчики"
devField.addEventListener('blur', validateFormDev, false);					// подписываемся на обработчик событий по потере фокуса в поле формы "разработчики"

const siteNameField = formTag.elements.form1__sitename;						// помещаем в константу ссылку на поле формы "Название сайта"
siteNameField.addEventListener('blur', validateFormSiteName, false);		// подписываемся на обработчик событий по потере фокуса в поле формы "Название сайта"

const siteUrlField = formTag.elements.form1__siteurl;							// помещаев в константу ссылку на поле формы "URL сайта"
siteUrlField.addEventListener('blur', validateFormSiteUrl, false);		// подписываемся на обработчик событий по потере фокуса в поле формы "URL сайта"

const dateField = formTag.elements.form1__start_date;
dateField.addEventListener('blur', validateFormDate, false);

const visitorsField = formTag.elements.form1__visitors;						// помещаем в константу ссылку на поле формы "посетителей в сутки"
visitorsField.addEventListener('blur', validateFormVisitors, false);		// подписываемся на обработчик событий по потере фокуса в поле формы "посетителей в сутки"

const emailField = formTag.elements.form1__email;								// помещаем в константу ссылку на поле формы "email для связи"
emailField.addEventListener('blur', validateFormEmail, false);				// подписываемся на обработчик событий по потере фокуса в поле формы "email для связи"

const categoryField = formTag.elements.form1__category;						// находим поле формы "Рубрика каталога"
categoryField.addEventListener('change', validateFormSelect, false);		// подписываемся на обработчик событий по потере фокуса в поле формы "Рубрика каталога"

const accField = formTag.elements.form1__accommodation;						// находим коллекцию радиокнопок
accField.forEach((item) => item.addEventListener('change', validateFormAcc, false));	// каждому элементу радиокнопки вешаем обработчик событий по потере фокуса из радиокнопки

const allowField = formTag.elements.form1__allow;								// находим поле формы "Разрешить отзывы"
allowField.addEventListener('change', validateFormAllow, false);			// подписываемся на обработчик событий по потере фокуса в поле формы "Разрешить отзывы"

const descriptionField = formTag.elements.form1__description;
descriptionField.addEventListener('blur', validateFormDescription, false);


function validateFormDev(eo) {														// описание функции проверяющей поле формы "разработчики"
	eo = eo || window.event;

	const formTag = document.forms.form1;											// получаем ссылку на форму, помещаем её в локальную константу
	const devField = formTag.elements.form1__developers;						// получаем ссылку на поле формы разработчики
	const devValue = devField.value;													// получаем значение поля формы разработчики
	const devAlertElem = formTag.querySelector('.form1__dev_error');		// находим первый элемент по css-селектору и ссылку на него помещаем в константу

	if (devValue.length < 1) {															// проверяем длину введённой строки (она не должна быть пустой)
		devAlertElem.classList.add('error_visible');
	} else {
		devAlertElem.classList.remove('error_visible');
	}
}

function validateFormSiteName(eo) {															// описание функции проверяющей поле формы "название сайта"
	eo = eo || window.event;

	const formTag = document.forms.form1;													// получаем ссылку на форму, помещаем её в локальную константу
	const siteNameField = formTag.elements.form1__sitename;							// помещаем в константу ссылку на поле формы "Название сайта"
	const siteNameValue = siteNameField.value;											// получаем значение поля формы "название сайта"
	const siteNameAlertElem = formTag.querySelector('.form1__sitename_error');	// находим первый элемент по css-селектору и ссылку на него помещаем в константу

	if (siteNameValue.length < 1) {
		siteNameAlertElem.classList.add('error_visible');
	} else {
		siteNameAlertElem.classList.remove('error_visible');
	}
}

function validateFormSiteUrl(eo) {															// описание функции проверяющей поле формы "URL сайта" не пустое и не длиннее 40 символов
	eo = eo || window.event;

	const formTag = document.forms.form1;													// получаем ссылку на форму, помещаем её в локальную константу
	const siteUrlField = formTag.elements.form1__siteurl;								// помещаем в константу ссылку на поле формы "URL сайта"
	const siteUrlValue = siteUrlField.value;												// получаем значение поля формы "URL сайта"
	const siteUrlAlertElem = formTag.querySelector('.form1__siteurl_error');	// находим первый элемент по css-селектору и ссылку на него помещаем в константу

	if (siteUrlValue.length < 1 || siteUrlValue.length > 40) {
		siteUrlAlertElem.classList.add('error_visible');
	} else {
		siteUrlAlertElem.classList.remove('error_visible');
	}
}

function validateFormDate(eo) {																// описание функции проверяющей является ли поле формы "дата запуска сайта" датой и дата должна быть не раньше 2023 года
	eo = eo || window.event;

	const formTag = document.forms.form1;												// получаем ссылку на форму, помещаем её в глобальную константу
	const dateField = formTag.elements.form1__start_date;
	const dateFieldValue = dateField.value;
	let sss = new Date(dateFieldValue);														// получаем объект класса Date с введёнными данными
	let dateYear = sss.getUTCFullYear();													// получаем год 
	const dateAlertElem = formTag.querySelector('.form1__date_error');
	dateAlertElem.classList.add('error_visible');

	if (isNaN(dateYear) || dateYear < 2023) {
		dateAlertElem.classList.add('error_visible');
	} else {
		dateAlertElem.classList.remove('error_visible');
	}
}

function validateFormVisitors(eo) {															// описание функции проверяющей является ли поле формы "посетителей в сутки" числом или не превышает ли оно 1000
	eo = eo || window.event;

	const formTag = document.forms.form1;													// получаем ссылку на форму, помещаем её в локальную константу
	const visitorsField = formTag.elements.form1__visitors;
	const visitorsValue = visitorsField.value;											// получаем значение поля формы "посетителей в сутки"
	const visitorsValueNum = parseInt(visitorsValue.trim());							// у строки обрезаем пробелы и преобразуем в число 
	const visitorsAlertElem = formTag.querySelector('.form1__visitors_error');

	if (Number.isNaN(visitorsValueNum) || visitorsValueNum > 1000) {
		visitorsAlertElem.classList.add('error_visible');
	} else {
		visitorsAlertElem.classList.remove('error_visible');
	}
}

function validateFormEmail(eo) {																// описание функции проверяющей поле формы "e-mail для связи" не пустои и содержит ли символ '@'
	eo = eo || window.event;

	const formTag = document.forms.form1;												// получаем ссылку на форму, помещаем её в глобальную константу
	const emailField = formTag.elements.form1__email;									// находим поле в форме
	const emailValue = emailField.value;													// получаем значение поля формы
	const emailAlertElem = formTag.querySelector('.form1__email_error');			// находим элемент для отображения ошибки

	if (emailValue.length < 1 || emailValue.indexOf('@') == -1) {
		emailAlertElem.classList.add('error_visible');
	} else {
		emailAlertElem.classList.remove('error_visible');
	}
}

function validateFormSelect(eo) {														// описание функции проверяющей поле формы "рубрика каталога". Значение не должно быть равным 3
	eo = eo || window.event;

	const formTag = document.forms.form1;												// получаем ссылку на форму, помещаем её в глобальную константу
	const categoryField = formTag.elements.form1__category;
	const categoryFieldValue = categoryField.value;
	const categoryAlertElem = formTag.querySelector('.form1__category_error');

	if (categoryFieldValue == 1) {
		categoryAlertElem.classList.add('error_visible');
	} else {
		categoryAlertElem.classList.remove('error_visible');
	}
}

function validateFormAcc(eo) {															// описание функции проверяющей поле формы "размещение". Поле не должно быть пустым
	eo = eo || window.event;

	const formTag = document.forms.form1;												// получаем ссылку на форму, помещаем её в глобальную константу
	const accommodationField = formTag.elements.form1__accommodation;
	const accomodatinFieldValue = accommodationField.value;
	const accommodationAlertElem = formTag.querySelector('.form1__accommodation_error');

	if (accomodatinFieldValue == '') {
		accommodationAlertElem.classList.add('error_visible');
	} else {
		accommodationAlertElem.classList.remove('error_visible');
	}
}

function validateFormAllow(eo) {															// описание функции проверяющей поле формы "разрешыть отзывы". Поле не должно быть пустым
	eo = eo || window.event;

	const formTag = document.forms.form1;												// получаем ссылку на форму, помещаем её в глобальную константу
	const allowField = formTag.elements.form1__allow;
	const allowFieldValue = allowField.checked;
	const allowAlertElem = formTag.querySelector('.form1__allow_error');

	if (!allowFieldValue) {
		allowAlertElem.classList.add('error_visible');
	} else {
		allowAlertElem.classList.remove('error_visible');
	}
}

function validateFormDescription(eo) {																		// описание функции проверяющей поле формы "описание сайта" в поле должно быть введено не менее 5 слов
	eo = eo || window.event;

	const formTag = document.forms.form1;																	// получаем ссылку на форму, помещаем её в глобальную константу
	const descriptionField = formTag.elements.form1__description;									// находим поле формы "описание сайта"
	const descriptionFieldValue = descriptionField.value;												// получаем значение поля формы
	const descriptionFieldValueArray = descriptionFieldValue.split(' ');							// в переменную помещаем ссылку на массив из слов, введённых в поле формы
	const descriptionAlertElem = formTag.querySelector('.form1__description_error');			// находим элемент для отображения ошибки

	if (descriptionFieldValueArray.length < 5) {
		descriptionAlertElem.classList.add('error_visible');
	} else {
		descriptionAlertElem.classList.remove('error_visible');
	}
}


function validateFormSubmit(eo) {
	eo = eo || window.event;

	const formTag = document.forms.form1;											// получаем ссылку на форму, помещаем её в локальную константу

	const descriptionField = formTag.elements.form1__description;									// находим поле формы "описание сайта"
	const descriptionFieldValue = descriptionField.value;												// получаем значение поля формы
	const descriptionFieldValueArray = descriptionFieldValue.split(' ');							// в переменную помещаем ссылку на массив из слов, введённых в поле формы
	const descriptionAlertElem = formTag.querySelector('.form1__description_error');			// находим элемент для отображения ошибки

	const allowField = formTag.elements.form1__allow;
	const allowFieldValue = allowField.checked;
	const allowAlertElem = formTag.querySelector('.form1__allow_error');

	const accommodationField = formTag.elements.form1__accommodation;
	const accomodatinFieldValue = accommodationField.value;
	const accommodationAlertElem = formTag.querySelector('.form1__accommodation_error');

	const categoryField = formTag.elements.form1__category;
	const categoryFieldValue = categoryField.value;
	const categoryAlertElem = formTag.querySelector('.form1__category_error');

	const emailField = formTag.elements.form1__email;									// находим поле в форме
	const emailValue = emailField.value;													// получаем значение поля формы
	const emailAlertElem = formTag.querySelector('.form1__email_error');			// находим элемент для отображения ошибки

	const visitorsField = formTag.elements.form1__visitors;
	const visitorsValue = visitorsField.value;											// получаем значение поля формы "посетителей в сутки"
	const visitorsValueNum = parseInt(visitorsValue.trim());							// у строки обрезаем пробелы и преобразуем в число 
	const visitorsAlertElem = formTag.querySelector('.form1__visitors_error');

	const dateField = formTag.elements.form1__start_date;
	const dateFieldValue = dateField.value;
	let sss = new Date(dateFieldValue);														// получаем объект класса Date с введёнными данными
	let dateYear = sss.getUTCFullYear();													// получаем год 
	const dateAlertElem = formTag.querySelector('.form1__date_error');
	dateAlertElem.classList.add('error_visible');

	const siteUrlField = formTag.elements.form1__siteurl;								// помещаем в константу ссылку на поле формы "URL сайта"
	const siteUrlValue = siteUrlField.value;												// получаем значение поля формы "URL сайта"
	const siteUrlAlertElem = formTag.querySelector('.form1__siteurl_error');	// находим первый элемент по css-селектору и ссылку на него помещаем в константу

	const siteNameField = formTag.elements.form1__sitename;							// помещаем в константу ссылку на поле формы "Название сайта"
	const siteNameValue = siteNameField.value;											// получаем значение поля формы "название сайта"
	const siteNameAlertElem = formTag.querySelector('.form1__sitename_error');	// находим первый элемент по css-селектору и ссылку на него помещаем в константу

	const devField = formTag.elements.form1__developers;						// получаем ссылку на поле формы разработчики
	const devValue = devField.value;													// получаем значение поля формы разработчики
	const devAlertElem = formTag.querySelector('.form1__dev_error');		// находим первый элемент по css-селектору и ссылку на него помещаем в константу

	try {
		if (descriptionFieldValueArray.length < 5) {
			descriptionAlertElem.classList.add('error_visible');
			descriptionField.focus();
			eo.preventDefault();
		} else {
			descriptionAlertElem.classList.remove('error_visible');
		}

		if (!allowFieldValue) {
			allowAlertElem.classList.add('error_visible');
			allowField.focus();
			eo.preventDefault();
		} else {
			allowAlertElem.classList.remove('error_visible');
		}

		if (accomodatinFieldValue == '') {
			accommodationAlertElem.classList.add('error_visible');
			formTag.elements.form1__accommodation1.focus();
			eo.preventDefault();
		} else {
			accommodationAlertElem.classList.remove('error_visible');
		}

		if (categoryFieldValue == 1) {
			categoryAlertElem.classList.add('error_visible');
			categoryField.focus();
			eo.preventDefault();
		} else {
			categoryAlertElem.classList.remove('error_visible');
		}

		if (emailValue.length < 1 || emailValue.indexOf('@') == -1) {
			emailAlertElem.classList.add('error_visible');
			emailField.focus();
			eo.preventDefault();
		} else {
			emailAlertElem.classList.remove('error_visible');
		}

		if (Number.isNaN(visitorsValueNum) || visitorsValueNum > 1000) {
			visitorsAlertElem.classList.add('error_visible');
			visitorsField.focus();
			eo.preventDefault();
		} else {
			visitorsAlertElem.classList.remove('error_visible');
		}

		if (isNaN(dateYear) || dateYear < 2023) {
			dateAlertElem.classList.add('error_visible');
			dateField.focus();
			eo.preventDefault();
		} else {
			dateAlertElem.classList.remove('error_visible');
		}

		if (siteUrlValue.length < 1 || siteUrlValue.length > 40) {
			siteUrlAlertElem.classList.add('error_visible');
			siteUrlField.focus();
			eo.preventDefault();
		} else {
			siteUrlAlertElem.classList.remove('error_visible');
		}

		if (siteNameValue.length < 1) {
			siteNameAlertElem.classList.add('error_visible');
			siteNameField.focus();
			eo.preventDefault();
		} else {
			siteNameAlertElem.classList.remove('error_visible');
		}
		if (devValue.length < 1) {															// проверяем длину введённой строки (она не должна быть пустой)
			devAlertElem.classList.add('error_visible');
			devField.focus();
			eo.preventDefault();
		} else {
			devAlertElem.classList.remove('error_visible');
		}
	}
	catch (ex) {
		alert('Ой! Что-то пошло не так с ВАЛИДАЦИЕЙ ВСЕЙ ФОРМЫ');
		eo.preventDefault();
	}
}