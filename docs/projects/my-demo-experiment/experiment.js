let jsPsych = initJsPsych();

let timeline = [];

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
//timeline.push(broadIntroTrial);

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
} //needs work with bullet spacing
//timeline.push(specificIntroTrial);

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

} //needs button focus refining 
//timeline.push(videoTrial);

let counter = 1;

for (let block of conditions) {

    // Setting left and right category variables
    let leftCategory = block.categories[0];
    let rightCategory = block.categories[1];

    // Screen with instructions, indicating the two categories

    let blockintroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <h1><span class = 'title'>Part ${counter++} of 4</span></h1> 
        <p> In this part, the two categories will be: <span class = 'bold'>${leftCategory}</span> and <span class = 'bold'>${rightCategory}</span></p>
        <p>If the word you see in the middle of the screen should be sorted into the <span class = 'bold'>${leftCategory}</span> category, press the <span class = 'key'>F</span> key.</p>
        <p>If thee word you see in the middle of the screen should be sorted into the  <span class = 'bold'>${rightCategory}</span> category, press the <span class = 'key'>J</span> key.</p>
        <p> press the <span class = 'key'>SPACE</span> to begin.</p>  
        `,
        choices: [' '],
    }

    timeline.push(blockintroTrial);



    for (let trial of block.trials) {
        // Screen that displays trial.word in the center
        // as well as the left/right categories
        // listening for key response (f,j)
        // on_finish: process the response, store the appropriate data


        let example = {
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
                    example.data.correct = true;
                } else {
                    example.data.correct = false;
                }//not finished yet 
            }

        }
        timeline.push(example);


        let fixationTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `+ `,
            trial_duration: 250,
            choices: ['NO KEY']
        }
        timeline.push(fixationTrial);
    }
}

jsPsych.run(timeline);





