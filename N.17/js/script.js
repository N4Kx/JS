var userString = prompt('Введите строку:')

console.log('Введёная строка: \n' + userString);

function vowels_arr_forEach(str) {
	str = str.toLowerCase();
	var userArr = str.split('');
	var searchedVowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
	var count = 0;

	function f(v, i, a) {
		if (searchedVowels.indexOf(v) !== -1) {
			count++;
		}
	}

	userArr.forEach(f);
	return count;
}

function vowels_arr_filter(str) {
	str = str.toLowerCase();
	var userArr = str.split('');
	var searchedVowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];

	function funct(v, i, a) {
		if (searchedVowels.indexOf(v) !== -1) {
			return true;
		}
	}
	let filteredArr = userArr.filter(funct);

	return filteredArr.length;
}

function vowels_arr_reduce(str) {
	str = str.toLowerCase();
	var userArr = str.split('');
	var searchedVowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];

	function ff(r, v, i, a) {
		if (searchedVowels.indexOf(v) !== -1) {
			r++;
		}
		return r;
	}

	return userArr.reduce(ff, 0);
}

console.log('Количество гласных в строке методом forEach: \n' + vowels_arr_forEach(userString) + '\n' +
	'Количество гласных в строке методом filter: \n' + vowels_arr_filter(userString) + '\n' +
	'Количество гласных в строке методом reduce: \n' + vowels_arr_reduce(userString));