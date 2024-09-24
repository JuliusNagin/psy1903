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

let results = []
function getWordLengths(words) {
    for (let word of words) {
        results.push(word.length);
    }
    return (results)
}
let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
console.log(getWordLengths(words)); // Expected output: [5, 6, 6, 4, 5]





