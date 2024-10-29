let jsPsych = initJsPsych();

let timeline = [];

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

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1> Thank you </h1>
    <p> You may now close this window. <p>`,
}
timeline.push(debriefTrial);

jsPsych.run(timeline);