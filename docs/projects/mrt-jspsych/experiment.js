let jsPsych = initJsPsych();

let timeline = [];

// Welcome & General Instructions 
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1> <span class='name'>Welcome to the Math Response Time Task</span> </h1>
    <p>In this experiment, you will be shown a series of math questions.</p>
    <p>There are three parts to this experiment; the questions will increase in difficulty with each part.</p>
    <p>Please answer as quickly and as accurately as possible.</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' ']
};
timeline.push(welcomeTrial);

//Task Set week 6 likert survey addition

let likertLabels = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

let likertSurvey = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: "I enjoy solving math problems.", labels: likertLabels },
        { prompt: "I find math easy.", labels: likertLabels },
    ]
};

timeline.push(likertSurvey);


//Block 1

for (let block of conditions) {

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1>${block.title}</h1>
            <p>Press SPACE to begin.</p>
            `,
        choices: [' '],
    };

    timeline.push(blockIntroTrial);

    let blockConditions = block.questions;

    for (let condition of blockConditions) {
        let conditionTrial = {
            type: jsPsychSurveyHtmlForm,
            preamble: `<h1> <span class='equation'>What is <span class='number'>${condition.num1}</span> + <span class='number'>${condition.num2}</span></span></h1>`,
            html: `<p><input type='text' name='response' id='response'></p>`,
            autofocus: 'response',
            button_label: 'Submit Answer',
            data: {
                collect: true,
                answer: condition.answer,
                num1: condition.num1,
                num2: condition.num2,
                block: block.title,
            },
            on_finish: function (data) {
                data.response = data.response.response;
                if (data.response == condition.answer) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        }
        timeline.push(conditionTrial);
    }
}

//Week 6 Task set: collecting results 
let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: function () {
        return `
                <h1>Please wait...</h1>
                <span class='loader'></span>
                <p>We are saving the results of your inputs.</p>
            `;
    },
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'MRT';
        let dataPipeExperimentId = 'yup6Re9EDZDb';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        console.log(results);

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);


// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1>Thank you!</h1>
        <p>You can now close this tab.</p>
    `,
    choices: ['NO KEYS'],
}
timeline.push(debriefTrial);

jsPsych.run(timeline);