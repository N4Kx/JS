var formDef1 =
	[
		{ label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
		{ label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
		{ label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
		{ label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
		{
			label: 'Рубрика каталога:', kind: 'combo', name: 'division',
			variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }]
		},
		{
			label: 'Размещение:', kind: 'radio', name: 'payment',
			variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }]
		},
		{ label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
		{ label: 'Описание сайта:', kind: 'memo', name: 'description' },
		{ caption: 'Опубликовать', kind: 'submit' },
	];

var formDef2 =
	[
		{ label: 'Фамилия:', kind: 'longtext', name: 'lastname' },
		{ label: 'Имя:', kind: 'longtext', name: 'firstname' },
		{ label: 'Отчество:', kind: 'longtext', name: 'secondname' },
		{ label: 'Возраст:', kind: 'number', name: 'age' },
		{ caption: 'Зарегистрироваться', kind: 'submit' },
	];

let frm = document.forms.testForm;												// находим форму с которой будем работать

function buildForm(form, arr) {													// создаем функцию, которой в качестве аргументов передадим ссылку на форму и массив по которому будем изменять форму.
	let elemFormLabel;
	let elemFormInput;
	let elemFormInputText;																// объявляем переменную для хранения ссылки на DOM-элемент input
	let labelText;
	let elemFormArea;
	let elemFormSelect;
	let elemFormOption;
	let elemFormOptionText;

	for (i = 0; i < arr.length; i++) {												// запускаем цикл, в котором пройдем по каждому из элементов массива

		elemFormLabel = document.createElement('label');					// для каждого элемента создадим label
		labelText = document.createTextNode(arr[i].label);					// для кадого label создадим текст
		elemFormLabel.appendChild(labelText);									// свяжем DOM-элементы label и его текст
		form.appendChild(elemFormLabel);											// поместим их в форму

		elemFormInput = document.createElement('input');					// создаем DOM-элемент input и присваиваем ссылку на него в переменную
		elemFormInput.name = arr[i].name;										// в DOM-элементе ipnut устанавливаем в атрибут name значение из массива

		switch (arr[i].kind) {														// запустим оператор switch через который будем определять какой нам вид input'а необходимо построить
			case 'longtext':
				elemFormInput.type = 'text';										// в DOM-элементе input устанавливаем в атрибут type значение text 				
				form.appendChild(elemFormInput);									// помещаем DOM-элемент input с атрибутами в форму
				break;

			case 'number':
				elemFormInput.type = 'number';									// в DOM-элементе input устанавливаем в атрибут type значение number					
				form.appendChild(elemFormInput);								// помещаем DOM-элемент input с атрибутами в форму
				break;

			case 'shorttext':
				elemFormInput.type = 'email';										// в DOM-элементе input устанавливаем атрибут type значение email					
				form.appendChild(elemFormInput);									// помещаем DOM-элемент input с атрибутами в форму
				break;

			case 'combo':
				elemFormSelect = document.createElement('select');										// создаем DOM-элемент select и переменной присваиваем ссылку на него
				elemFormSelect.name = arr[i].name;															// в DOM-элементе select устанавливаем атрибут name
				for (j = 0; j < arr[i].variants.length; j++) {											// запускаем цикл в котором пройдемся по всем объектам подмассива
					elemFormOption = document.createElement('option');									// создаем DOM-элемент option и в переменную присваиваем ссылку на него
					elemFormOption.value = arr[i].variants[j].value;									// в DOM-элементе устанавливаем атрибут value
					elemFormOptionText = document.createTextNode(arr[i].variants[j].text);		// создаем текст
					elemFormOption.appendChild(elemFormOptionText);										// связываем DOM-элемент option с текстом
					elemFormSelect.appendChild(elemFormOption);											// связываем DOM-элемент select с DOM-элементом option (т.е. помещаем option в select)
				}
				form.appendChild(elemFormSelect);															// помещаем DOM-элемент select в форму
				break;

			case 'radio':
				for (k = 0; k < arr[i].variants.length; k++) {											// запускаем цикл в котором пройдемся по всем объектам подмассива
					elemFormInput = document.createElement('input');									// создаем DOM-элемент input и переменной присваиваем ссылку на него
					elemFormInput.type = 'radio';																// в DOM-элементе input усианавливаем атрибут type
					elemFormInput.name = arr[i].name;														// в DOM-элементе input усианавливаем атрибут name
					elemFormInput.value = arr[i].variants[k].value;										// в DOM-элементе input усианавливаем атрибут value
					elemFormInputText = document.createTextNode(arr[i].variants[k].text);		// создаем текст
					form.appendChild(elemFormInputText);													// текст помещаем в форму
					form.insertBefore(elemFormInput, elemFormInputText);								// DOM-элемент input помещаем в форму перед текстом
				}
				break;

			case 'check':
				elemFormInput.type = 'checkbox';									// в DOM-элементе input устанавливаем атрибут type значение email
				elemFormInput.checked = 'true';									// в DOM-элементе input типа checkbox устанавливаем в атрибут checked значение ture 
				form.appendChild(elemFormInput);									// помещаем DOM-элемент input с атрибутами в форму
				break;

			case 'memo':
				elemFormArea = document.createElement('textarea');			// создаем DOM-элемент text-area и помещаем ссылку на него в переменную
				elemFormArea.name = arr[i].name;									// в DOM-элементе text-area устанавливаем атрибут name
				form.appendChild(elemFormArea);									// помещаем DOM-элемент text-area в форму
				break;
		}
		if (arr[i].caption !== undefined) {										// проверяем является ли объект в массиве caption
			form.removeChild(elemFormLabel);										// удаляем DOM-элемент label
			elemFormInput.removeAttribute('name');								// удаляем атрибут name из DOM-элемента input
			elemFormInput.type = 'submit';										// в DOM-элементе input устанавливаем атрибут type
			elemFormInput.value = arr[i].caption;								// в DOM-элементе input устанавливаем атрибут value
			form.appendChild(elemFormInput);										// помещаем DOM-элемент input в форму
		}


		let br = document.createElement('br');									// добавляем перевод строки
		form.appendChild(br);														// помещаем DOM-элемент в форму
	}
}

buildForm(frm, formDef1);
buildForm(frm, formDef2);