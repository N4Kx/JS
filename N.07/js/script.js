var userString = prompt('Введите строку:');

console.log('Введёная строка: \n' + userString);

function vowels(str) {
	console.time("время подсчета");
	str = str.toLowerCase();
	var searchedVowels = ["а", "о", "и", "е", "ё", "э", "ы", "у", "ю", "я"];
	var count = 0;

	for (i = 0; i < str.length; i++) {
		if (searchedVowels.indexOf(str[i]) !== -1) {
			count += 1;
		}
	}
	console.timeEnd("время подсчета");
	return count;
}

console.log('Введённая строка содержит: \n' + vowels(userString) + ' гласных букв');