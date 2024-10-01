// Initialize an empty array you will populate with your conditions
let conditions = [];

for (let i = 0; i < 3; i++) {
    let randomNumber1 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    let randomNumber2 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    let numbers = {
        num1: randomNumber1,
        num2: randomNumber2,
        answer: randomNumber1 + randomNumber2
    }
    conditions.push(numbers);
}


// Output the resulting conditions array to make sure it is set up correctly
console.log(conditions);