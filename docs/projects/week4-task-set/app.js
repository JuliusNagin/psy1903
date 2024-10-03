//Question #3 
// function celsiusToFahrenheit(celsius) {
//     return (celsius * 1.8) + 32;
// }
// console.log(celsiusToFahrenheit(10)); //returned 50

//Question 4

// function convertTemp(temp, convertTo) {
//     if (convertTo == 'c') {
//         return (temp - 32) / 1.8;
//     }
//     if (convertTo == 'f') {
//         return (temp * 1.8) + 32;
//     } //could also use 'else,' but that would return a Fahrenheit result to anything besides a 'c' in the second argument
// }

// console.log(convertTemp(10, 'c'));//returns 12.22
// console.log(convertTemp(10, 'f')); //returns 50

//Question 5
// let results = []
// function getWordLengths(words) {
//     for (let word of words) {
//         results.push(word.length);
//     }
//     return (results)
// }
// let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
// console.log(getWordLengths(words)); // Expected output: [5, 6, 6, 4, 5]

//Question 6

// function getLongestWord() {
//     let longestWord = '';
//     for (let word of words) {
//         if (word.length > longestWord.length) {
//             longestWord = word
//         }
//     }
//     return longestWord;
// }

// let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
// console.log(words);

// console.log(getLongestWord(words));

//Question 7

// function getOddNumbers(numbers) {
//     let results = [];
//     for (let number of numbers) {
//         if (number % 2 != 0) {
//             results.push(number)
//         }

//     }
//     return (results)
// }

// console.log(getOddNumbers([1, 2, 3, 4, 5])); // Expected output: [1, 3, 5]
// console.log(getOddNumbers([12, 45, 10, 11, 61])); // Expected output: [45, 11, 61]

//Question 8 

// function filterNumbers(numbers, evenOrOdd) {
//     let results = [];
//     if (evenOrOdd == 'even') {
//         for (number of numbers) {
//             if (number % 2 == 0) {
//                 results.push(number)
//             }
//         }

//     } if (evenOrOdd == 'odd') {
//         for (number of numbers) {
//             if (number % 2 != 0) {
//                 results.push(number)
//             }
//         }
//     }
//     return (results)
// }
// console.log(filterNumbers([1, 2, 3, 4, 5], 'even')); // Expected output: [2, 4]
// console.log(filterNumbers([1, 2, 3, 4, 5], 'odd')); // Expected output: [1, 3, 5]

// console.log(filterNumbers([45, 10, 11, 61], 'even')); // Expected output: [10]
// console.log(filterNumbers([45, 10, 11, 61], 'odd')); // Expected output: [45, 11, 61]


//Question 9 

// // Global variables/functions decluttering 

// //instructions/messages 
// let welcomeMessage =
//     `Welcome to the even/odd response time task. 
    
// You are about to see a series of numbers. 

// If number you see is EVEN, type the letter "e".
// If the number you see is ODD, type the letter "o". 
    
// Please answer as quickly and as accurately as possible. 
//     `;

// let instructionReminder = `
// Type the letter 'e' for EVEN.
// Type the letter 'o' for ODD.`

// let thankYouMessage = 'Thank you for your time!'

// //functions

// function getRandomNumber() {
//     let randomNumber = Math.floor(Math.random() * 20) + 1;
//     return randomNumber
// }

// function answerCheck(answer, number) {
//     if (answer == 'o' && number % 2 != 0 || answer == 'e' && number % 2 == 0) {
//         return true
//     } else {
//         return false
//     }
// }

// function timeCalc(endTime, startTime) {
//     return (endTime - startTime) / 1000;
// }


// //The real test

// let results = [];

// alert(welcomeMessage);

// for (let i = 0; i < 5; i++) {
//     let number = getRandomNumber();
//     let startTime = Date.now();

//     let answer = prompt(`Number: ${number} ${instructionReminder}`)

//     let endTime = Date.now();

//     results.push({
//         number: number,
//         response: answer,
//         correct: answerCheck(answer, number),
//         responseTime: timeCalc(endTime, startTime),


//     })

// }

// alert(thankYouMessage);

// console.log(results);























