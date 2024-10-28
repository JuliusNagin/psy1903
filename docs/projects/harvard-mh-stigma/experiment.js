let jsPsych = initJsPsych();

let timeline = [];

//Various intros, priming video, likert trial
let broadIntroTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: ` <h1> <span class = 'title'>Welcome to the Harvard Mental Health Stigma IAT!</span></h1>
    <p> In this study, you will complete an implicit association test (IAT). </p> 
    <p> You will be asked to categorize mental and physical health conditions as well as words associated with humanizing and stigmatizing language.</p> 
    <p> In addition to the IAT, you will be asked to watch a short video and answer some questions about your attitudes, beliefs, and demographics.</p>
    <p> There are three parts to this experiment.</p>
    <p> press the <span class = 'key'>SPACE</span> to begin.</p> 
    `,
    choices: [' '],
}
timeline.push(broadIntroTrial);


let specificIntroTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        `<h1> <span class = 'title'>Welcome to the Harvard Mental Health Stigma IAT!</span></h1>
    <p>In this experiment, you will be asked to complete the following three tasks:</p>
    <span class = 'box'>
    <ul>
        <li>In Task 1, you will answer a brief series of questions.</li>
        <li>In Task 2, you will be asked to categorize a series of words.</li>
    </ul>
    </span>
    <p> press the <span class = 'key'>SPACE</span> to begin.</p> 
    `,
    choices: [' '],
} //needs work with bullet spacing
timeline.push(specificIntroTrial);


//Randomizing the priming trial by participant 
let showTrial = Math.random() < 0.5;

let videoTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: ` 
    <p> Before you being the first task, please watch the following video:</p>
    <iframe width="560" height="315" 
        src="https://www.youtube.com/embed/AYAHkql75qM?si=OVFCmPnPwVTmPB3K" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
        tabindex="-1">
        </iframe>
    <p> Press the <span class = 'key'>SPACE</span> key when you have completed the video and are ready to move on to the next task. </p>
    `,
    choices: [' '],

} //needs button focus refining 
if (showTrial) {
    timeline.push(videoTrial);
    //jsPsych.data.whichPrime = true; 
}

// Survey Trial //
// Define likert scale
let likertScale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];
// Survey questions...need labels and to finish some of the questions. 
let survey = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: "I feel comfortable expressing my feelings.", labels: likertScale },
        { prompt: "I feel that my mental health is valued at Harvard.", labels: likertScale },
        { prompt: "At Harvard, I feel like I belong.", labels: likertScale },
        { prompt: "Mental health is something that should be taken seriously.", labels: likertScale },
        { prompt: "It is normal to have issues with mental health.", labels: likertScale },
        { prompt: "Physical health issues", labels: likertScale },
    ],
    randomize_question_order: true
};
timeline.push(survey);

//Beginning the outer loop
//Establishing counter for the four-part block seperation screens
let counter = 1;

for (let block of conditions) {

    // Setting left and right category variables
    let leftCategory = block.categories[0];
    let rightCategory = block.categories[1];

    // Screen with instructions, indicating the two categories
    let blockintroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h1><span class = 'title'>Task 2: Part ${counter++} of 4</span></h1> 
        <p> In this part, the two categories will be: <span class = 'bold'>${leftCategory}</span> and <span class = 'bold'>${rightCategory}</span></p>
        <p>If the word you see in the middle of the screen should be sorted into the <span class = 'bold'>${leftCategory}</span> category, press the <span class = 'key'>F</span> key.</p>
        <p>If thee word you see in the middle of the screen should be sorted into the  <span class = 'bold'>${rightCategory}</span> category, press the <span class = 'key'>J</span> key.</p>
        <p> press the <span class = 'key'>SPACE</span> to begin.</p>  
        `,
        choices: [' '],
    }
    timeline.push(blockintroTrial);

    //Trial inner loop
    for (let trial of block.trials) {
        let iatTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `
            <span class= 'category1' > <strong>${leftCategory}</strong> (press F)</span>
            <span class='category2'> <strong>${rightCategory}</strong> (press J)</span>
            <p class='word'>${trial.word}</p>`,
            choices: ['f', 'j'],
            data: {
                collect: true,
                trialType: 'iat',
                word: trial.word,
                expectedCategory: trial.expectedCategory,
                expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed,
                leftCategory: leftCategory,
                rightCategory: rightCategory,
            },
            on_finish: function (data) {
                if (data.response == trial.expectedResponse) {
                    iatTrial.data.correct = true;
                } else {
                    iatTrial.data.correct = false;
                }//not finished yet 
            }

        }
        timeline.push(iatTrial);

        //Adding the fixation trial inbetween iaTrials
        let fixationTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `+ `,
            trial_duration: 250,
            choices: ['NO KEY']
        }
        timeline.push(fixationTrial);
    }
}


//Saving results 
let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <span class='loader'></span>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        let prefix = 'iat';
        let dataPipeExperimentId = 'yup6Re9EDZDb';
        let forceOSFSave = false;
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');
        let isLocalHost = window.location.href.includes('localhost');
        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }
        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);


//Running the experiment 
jsPsych.run(timeline);





