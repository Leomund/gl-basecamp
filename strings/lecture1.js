//1. Reverse a string. ‘Hello’ -> ‘olleH’
function reverse(str) {
	return str.split('').reverse().join('');
}

//2. Change all small letters to big and vise versa . ‘Hey’ -> ‘hEY’
function invertCase (str) {
	let arr = str.split('');
	for (let i in arr) {
		if (arr[i] === arr[i].toUpperCase()) {
			arr[i] = arr[i].toLowerCase();
		} else if (arr[i] === arr[i].toLowerCase()) {
			arr[i] = arr[i].toUpperCase();
		}
	}
	return arr.join('');
}

//3. Return count of each letter in string. ‘Book’ -> ‘1B2o1k’
function addCount(str) {
	let count = {}
	let result = '';

	let length = str.length;

	for (let i = 0; i < length; i++) {
		let letter = str.charAt(i);
		count[letter] = (isNaN(count[letter]) ? 1 : count[letter] + 1);
	}

	for (key in count) {
		result += count[key] + key;
	}

	return result;
}

//4. Remove all numbers in String.  ‘H4e6 y5’ -> ‘He y’
function removeNumbers(str) {
	return str.replace(/[0-9]/g, '');
}

//5. Change whitespaces with single comma. ‘H4  e6 y5’ -> ‘H4,e6,y5’
function whitespacesToComma(str) {
	return str.replace(/\s/g, ',');
}

//6. Find count of word ‘he’ in String. ‘hello, he is bad guy.’ -> ‘1’
function countHe(str) {
	let arr = str.match(/\bhe\b/g);
	return arr.length;
}

//7. Reverse every second word in String. ‘Hey it is me’-> ‘Hey ti is em’
function reverseSecond(str) {
	let arr = str.split(' ');
	for (var i = 0; i < arr.length; i++) {
		if (i % 2 !== 0) {
			arr[i] = reverse(arr[i]);
		}
	}
	return arr.join(' ');
}
