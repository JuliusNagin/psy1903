let jsPsych = initJsPsych();

let timeline = [];

// Welcome 
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1>Welcome to the Math Response Time Task </h1>
    <p>In this experiment, you will be shown a series of math questions.</p>
    <p>Please answer as quickly and as accurately as possible</p>
    <p>Press SPACE to begin</p>
    `,
    choices: [' ']
};
timeline.push(welcomeTrial);

//Trial

for (let condition of conditions) {
    let conditionTrial = {
        type: jsPsychSurveyHtmlForm,
        preamble: `<h1> What is ${condition.num1} + ${condition.num2}</h1>`,
        html: `<p><input type='text' name='response' id='response'></p>`,
        autofocus: 'response',
        button_label: 'Submit Answer',
        data: {
            collect: true,
            answer: condition.answer,
            num1: condition.num1,
            num2: condition.num2,
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