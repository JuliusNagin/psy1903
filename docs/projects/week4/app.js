//string interpolation (` ${}`) practice 
/* let feedback = 'correct';
let responseTime = 2.4;
let answer = 25;

alert(`You are ${feedback}. Answer: ${answer}. Response time: ${responseTime}`); */

// //Part 1: functions
// let num1 = getRandomNumber(1, 10); //1 and 10 are arguments
// let num2 = getRandomNumber(0, 100); //num2 is a global variable

// console.log(num1);
// console.log(num2);

// displayRandomNumber();

// function getRandomNumber(min, max) {
//     let randomNumber = Math.floor(Math.random() * max) + min;
//     return randomNumber;
// } //min and max are parameters, randomNumber is a local variable

// function displayRandomNumber() {
//     alert(getRandomNumber(1, 10));
// }
// //producing info from the function requires the return statement 

//Part 2: Arrays

// // Scalar data types:
// let name = 'James'; // String
// let age = 15; // Number
// let adult = false; // Boolean

// // Arrays
// // An Array of Numbers
// let ages = [45, 23, 28, 35, 35];

// // An Array of Strings
// let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];
// console.log(names[1]); // Jamal...Java starts counting at 0
// names[1] = 'Bob';
// console.log(names);
// names.push('Sara'); //adds a new name to the end of the array
// console.log(names);
// names.unshift('Sara h.'); //adds a name to the beginning of the array
// console.log(names);

// // An Array can contain other Arrays
// let numbers = [1, 2, 3, [8, 9, 10]];

// // An Array of mixed data types (Strings, Numbers, Array)
// let mixed = ['a', 'b', 1, 2, [true, 'bar']];

//Part 3: Loops 

// let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];

// let namesThatStartWithA = [];

// for (let name of names) {
//     if (name.charAt(0) == 'A') {
//         namesThatStartWithA.push(name);
//     }
// }
// console.log(namesThatStartWithA);

//Part 4: Numerical for Loops

// let results = [];

// for (let i = 0; i < 3; i++) {
//     let num1 = getRandomNumber(1, 10);
//     let num2 = getRandomNumber(1, 10);
//     let start = Date.now();
//     let response = prompt(`What is ${num1} + ${num2} ?`);
//     let end = Date.now();
//     let time = (end - start) / 1000; // Calculate response time in seconds
//     if (response == num1 + num2) {
//         feedback = 'correct';
//     } else {
//         feedback = 'incorrect';
//     }

//     results.push([feedback, time]);

//     alert(`You answered ${response} (${feedback}) in ${time} seconds.`);


// function getRandomNumber(min, max) {
//     let randomNumber = Math.floor(Math.random() * max) + min;
//     return randomNumber;
// }

//Part 5: Objects 

//Arrays: store multiple elements accessible via numerical indexes
// let participantA = ['Alice', 21, true];

// let participantB = {
//     name: 'Alice',
//     age: 21,
//     consent: true
// }
// participantB.consent = false; //updating an existing object value 
// participantB.startTime = '2:00pm'; //adding a new object value
// delete participantB.age; //deleting an object value
// console.log(participantB);


// //Objects are more intuitive here 
// if (participantA[2]) {
//     //...
// }

// if (participantB.consent) {
//     //...
// }

//     let person = {
//         // Strings
//         firstName: 'Elliot',
//         lastName: 'Brown',

//         // Number
//         age: 30,

//         // Array
//         hobbies: ['reading', 'gaming', 'hiking'],

//         // Nested Object
//         address: {
//             street: '324 Western Ave',
//             city: 'Cambridge',
//             zipCode: '02139'
//         },

//         // Functions for qorking with the above object
//         // Observe how the keyword *this* is used in functions to reference other properties within this object
//         getFullName: function () {
//             return `${this.firstName} ${this.lastName}`;
//         },

//         greet: function () {
//             return `Hello, my name is ${this.getFullName()} and I am ${this.age} years old.`;
//         },

//         getAddress: function () {
//             return `I live at ${this.address.street}, ${this.address.city} ${this.address.zipCode}`;
//         },

//         getHobbies: function () {
//             return `My hobbies include ${this.hobbies.join(', ')}`;
//         }
//     };

//     console.log(person.getAddress());

//     document.getElementById()// document is a built in javaScript object, getElementbyId is a function/method within the document object 
//     console.log()//same goes for console.log
// //method = a funciton that exists within an object. getElementByID is a method 
// //key:value paries are properties 

//Part 6: Array & Object examples

let results = [];

for (let i = 0; i < 3; i++) {
    let num1 = getRandomNumber(1, 10);
    let num2 = getRandomNumber(1, 10);
    let start = Date.now();
    let response = prompt(`What is ${num1} + ${num2} ?`);
    let end = Date.now();
    let time = (end - start) / 1000; // Calculate response time in seconds
    let answer = num1 + num2;
    if (response == answer) {
        feedback = 'correct';
    } else {
        feedback = 'incorrect';
    }

    results.push({
        answer: answer,
        feedback: feedback,
        time: time,
    });

    alert(`You answered ${response} (${feedback}) in ${time} seconds.`);
}

console.log(results);

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber;
} //min and max are parameters, randomNumber is a local variable
