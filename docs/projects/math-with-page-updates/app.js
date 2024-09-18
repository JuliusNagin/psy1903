//Starting the timer 
let startTime = Date.now();

// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');

let num1Output = document.getElementById('num1');
let num2Output = document.getElementById('num2');

//Generating random numbers
let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

//Connecting random numbers to the html elements in our eqeuation 
num1Output.innerHTML = num1;
num2Output.innerHTML = num2;

// Listening for the form to be submitted
form.addEventListener('submit', function (event) {

    // Preventing default form submission 
    event.preventDefault();

    //Stopping the timer immediately after submission, calc response time 
    let endTime = Date.now()
    let responseTime = (endTime - startTime) / 1000;

    // Collecting the response, hiding the form
    let response = form.elements['response'].value;
    form.style.display = 'none'; //hiding the form

    //Determining the response
    if (response == (num1 + num2)) {
        resultsMessage = ('You are correct. You answered: ' + response + ' in ' + responseTime + ' seconds ');
    } else {
        resultsMessage = ('You are incorrect. You answered: ' + response + ' in ' + responseTime + ' seconds ');
    }

    //Reporting results
    results.innerHTML = resultsMessage;

}); 
