console.log('Hi from app.js in Errors & AI directory');

//console.log(hello); //uncaught reference error bc Java thinks hello is a var --error messages are just a starting point
//app.js:2 Uncaught ReferenceError: hello is not defined


//alert(welcome to our experiment); // PARCING CONFUSION-- Uncaught SyntaxError: missing ) after argument list
//alert(welcome, to, our, experiment); //produces Uncaught ReferenceError: welcome is not defined

//alert([your code here]);//Uncaught SyntaxError: Unexpected identifier 'code' -- java thinks [your code here] is an array
// chat gpt actually undeerstands the placeholder issue
// see an array below
let scores = [99, 100, 75, 62];

/* console.log(5 == 5 && 10 > 1);
console.log('red' == 'blue' || 1 < 10);
console.log(20 > 15 < 15); //simplifies to true < 15, true is coded as a 1 apparently
console.log(12 % 2 == 0);
console.log('red' != 'green' || 'orange' == 'purple');
console.log((10 >= 10) && (false == false) && (20 !== 19));
console.log(true && true || false); */


