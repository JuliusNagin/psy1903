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

// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <h1>Thank you!</h1>
        <p>You can now close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['collect', 'trial_type', 'trial_index', 'plugin_version',])
            .csv();
        console.log(data);
    }
}
timeline.push(debriefTrial);

jsPsych.run(timeline);