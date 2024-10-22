let jsPsych = initJsPsych();

let timeline = [];


for (let block of conditions) {

    //Various intros and priming video
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
            <li>In Task 1, you will be asked to watch a short video.</li>
            <li>In Task 2, you will answer a brief series of questions.</li>
            <li>In Task 3, you will be asked to categorize a series of words.</li>
        </ul>
        </span>
        <p> press the <span class = 'key'>SPACE</span> to begin.</p> 
        `,
        choices: [' '],
    }
    timeline.push(specificIntroTrial);

    let videoTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: ` 
        <h1> <span class = 'title'>Task 1 of 3</span></h1>
        <p> Please watch the following video </p>
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

    }

    timeline.push(videoTrial);

    // and the expected keys to be pressed
    let leftCategory = block.categories[0];
    let rightCategory = block.categories[1];

    // Screen with instructions, indicating the two categories



    for (let trial of block.trials) {
        // Screen that displays trial.word in the center
        // as well as the left/right categories
        // listening for key response (f,j)
        // on_finish: process the response, store the appropriate data

        let example = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `...`,
            data: {
                collect: true,
                trialType: 'iat',
                word: trial.word,
                expectedCategory: trial.expectedCategory,
                expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed,
                leftCategory: leftCategory,
                rightCategory: rightCategory
            },
            on_finish: function (data) {
                // if data.response == trial.expectedResponse
                // data.correct = true
                // else
                // data.correct = false
            }
        }
        timeline.push(example);
    }
}

jsPsych.run(timeline);





