alert("In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.");

let start1 = Date.now();
let response1 = prompt('What is 5+5?');
let end1 = Date.now();
let responseTime1 = (end1 - start1) / 1000;
alert('You answered: ' + response1 + ' in ' + responseTime1 + ' seconds ');

let start2 = Date.now();
let response2 = prompt('What is 1+1?');
let end2 = Date.now();
let responseTime2 = (end2 - start2) / 1000;
alert('You answered: ' + response2 + ' in ' + responseTime2 + ' seconds ');

let start3 = Date.now();
let response3 = prompt('What is 2+4?');
let end3 = Date.now();
let responseTime3 = (end3 - start3) / 1000;
alert('You answered: ' + response3 + ' in ' + responseTime3 + ' seconds ');

alert("Thank you for your participation!");


