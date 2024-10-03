// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    // Collect the response
    let name = form.elements['name'].value;

    let over18 = form.elements['age'].checked;


    let resultsMessage = '';
    if (over18) {
        resultsMessage = 'Hello ' + name + '!';
    } else {
        resultsMessage = 'Thank you for your interest but this experiment is for pariticpants over 18 only';
    }

    // Report the results
    results.innerHTML = resultsMessage;
});

let a = 5;
let b = 10;
console.log(a > 3 && b < 15);

let over18 = false;
let hasGuardianApproval = true;
console.log(over18 || hasGuardianApproval);

let count = 8;
console.log(count % 2 == 0);
