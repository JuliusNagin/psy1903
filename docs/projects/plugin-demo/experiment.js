let jsPsych = initJsPsych();

let timeline = [];

//Qualtrics integration
let participantId = getCurrentTimestamp();

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1> Welcome </h1>
    <p>This is a demo of the JsPsych free-sort plugin
    <p> Press <span class= 'key'>SPACE</span> to begin.</p>`
    ,
    choices: [' '],
}
timeline.push(welcomeTrial);

let sortingStimuli = [
    "images/dog1.png",
    "images/dog2.png",
    "images/dog3.png",
    "images/dog4.png",
]


let pluginDemo = {
    type: jsPsychFreeSort,
    stimuli: sortingStimuli,
    stim_width: 80,
    stim_height: 60,
    sort_area_width: 500,
    sort_area_height: 500,
    prompt: "<p>Click and drag the images below to sort them so that similar items are close together.</p>"
};

timeline.push(pluginDemo);

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
        let prefix = 'plugin-demo';
        let dataPipeExperimentId = 'yup6Re9EDZDb';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .csv();

        console.log(results);

        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);

//New debrief trial with Qualtrics integration
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function (data) {

        let linkToQualtricsSurvey = `https://harvard.az1.qualtrics.com/jfe/form/SV_6im5hjj1TQ2VCZ0?experimentParticipantId=${participantId}`
        return `
        <h1>Thank you!</h1>
        <p>
            To complete your response, 
            please follow <a href='${linkToQualtricsSurvey}'>this link</a> 
            and complete the survey you see there.
        </p>
    `},
    choices: ['NO KEYS']
}
timeline.push(debriefTrial);

jsPsych.run(timeline);