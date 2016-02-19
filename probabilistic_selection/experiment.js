/* ***************************************** */
/*          Define helper functions          */
/* ***************************************** */
function getDisplayElement() {
	$('<div class = display_stage_background></div>').appendTo('body')
	return $('<div class = display_stage></div>').appendTo('body')
}

function evalAttentionChecks() {
	var check_percent = 1
	if (run_attention_checks) {
		var attention_check_trials = jsPsych.data.getTrialsOfType('attention-check')
		var checks_passed = 0
		for (var i = 0; i < attention_check_trials.length; i++) {
			if (attention_check_trials[i].correct === true) {
				checks_passed += 1
			}
		}
		check_percent = checks_passed / attention_check_trials.length
	}
	return check_percent
}

var getInstructFeedback = function() {
	return '<div class = centerbox><p class = center-block-text>' + feedback_instruct_text +
		'</p></div>'
}

function addID() {
	jsPsych.data.addDataToLastTrial({
		'exp_id': 'probabilistic_selection'
	})
}

var getStim = function() {
	stim = firstPhaseStimsComplete.image.pop()
	curr_data = firstPhaseStimsComplete.data.pop()
	return stim;
}

var getData = function() {
	return curr_data
}

var getSecondPhaseStim = function() {
	stim = secondPhaseStimsComplete.image.pop()
	curr_data = secondPhaseStimsComplete.data.pop()
	return stim;
}

var getResponse = function() {
	return answers.pop()
}
var genResponses = function(stimuli) {
	var answers_80_20 = jsPsych.randomization.repeat([37, 37, 37, 37, 37, 37, 37, 37, 39, 39],
		eachComboNum / 10);
	var answers_20_80 = jsPsych.randomization.repeat([39, 39, 39, 39, 39, 39, 39, 39, 37, 37],
		eachComboNum / 10);
	var answers_70_30 = jsPsych.randomization.repeat([37, 37, 37, 37, 37, 37, 37, 39, 39, 39],
		eachComboNum / 10);
	var answers_30_70 = jsPsych.randomization.repeat([39, 39, 39, 39, 39, 39, 39, 37, 37, 37],
		eachComboNum / 10);
	var answers_60_40 = jsPsych.randomization.repeat([37, 37, 37, 37, 37, 37, 39, 39, 39, 39],
		eachComboNum / 10);
	var answers_40_60 = jsPsych.randomization.repeat([39, 39, 39, 39, 39, 39, 37, 37, 37, 37],
		eachComboNum / 10);

	var count1 = 0;
	var count2 = 0;
	var count3 = 0;
	var count4 = 0;
	var count5 = 0;
	var count6 = 0;

	var answers = [];
	for (var i = 0; i < FP_trials; i++) {

		if (stimuli.data[i].condition === '80_20') {
			answers.push(answers_80_20[count1]);
			count1 = count1 + 1;
		} else if (stimuli.data[i].condition === '20_80') {
			answers.push(answers_20_80[count2]);
			count2 = count2 + 1;
		} else if (stimuli.data[i].condition === '70_30') {
			answers.push(answers_70_30[count3]);
			count3 = count3 + 1;
		} else if (stimuli.data[i].condition === '30_70') {
			answers.push(answers_30_70[count4]);
			count4 = count4 + 1;
		} else if (stimuli.data[i].condition === '60_40') {
			answers.push(answers_60_40[count5]);
			count5 = count5 + 1;
		} else {
			answers.push(answers_40_60[count6]);
			count6 = count6 + 1;
		}
	}
	return answers;
};



/*************************************************************************/
/*                 DEFINE EXPERIMENTAL VARIABLES                         */
/*************************************************************************/
// generic task variables
var run_attention_checks = false
var attention_check_thresh = 0.45
var sumInstructTime = 0 //ms
var instructTimeThresh = 0 ///in seconds

// task specific variables

/* SPECIFY HOW MANY TRIALS YOU WANT FOR FIRST PHASE, and SECOND PHASE.  FP=first(must be divisible by 60), SP=second(must be divisible by 22) */
var FP_trials = 6;
var SP_trials = 22;
var eachComboNum = FP_trials / 6; /* don't change this line */
var eachComboNumSP = SP_trials / 22; /* don't change this line */


/* THIS IS TO RANDOMIZE STIMS */
var stimArray = ["/static/experiments/probabilistic_selection/images/1.png",
	"/static/experiments/probabilistic_selection/images/2.png",
	"/static/experiments/probabilistic_selection/images/3.png",
	"/static/experiments/probabilistic_selection/images/4.png",
	"/static/experiments/probabilistic_selection/images/5.png",
	"/static/experiments/probabilistic_selection/images/6.png"
];
var randomStimArray = jsPsych.randomization.repeat(stimArray, 1);
var prob80 = randomStimArray[0];
var prob20 = randomStimArray[1];
var prob70 = randomStimArray[2];
var prob30 = randomStimArray[3];
var prob60 = randomStimArray[4];
var prob40 = randomStimArray[5];


/* THIS IS FOR FIRST PHASE STIMS,  randomized and counterbalanced*/
firstPhaseStims = [{
	image: "<div class = decision-left><img src='" + prob80 +
		"'></img></div><div class = decision-right><img src='" + prob20 + "'></img></div>",
	data: {
		condition: '80_20',
		trial_id: "stim",
		exp_stage: "practice"
	}
}, {
	image: "<div class = decision-left><img src='" + prob20 +
		"'></img></div><div class = decision-right><img src='" + prob80 + "'></img></div>",
	data: {
		condition: '20_80',
		trial_id: "stim",
		exp_stage: "practice"
	}
}, {
	image: "<div class = decision-left><img src='" + prob70 +
		"'></img></div><div class = decision-right><img src='" + prob30 + "'></img></div>",
	data: {
		condition: '70_30',
		trial_id: "stim",
		exp_stage: "practice"
	}
}, {
	image: "<div class = decision-left><img src='" + prob30 +
		"'></img></div><div class = decision-right><img src='" + prob70 + "'></img></div>",
	data: {
		condition: '30_70',
		trial_id: "stim",
		exp_stage: "practice"
	}
}, {
	image: "<div class = decision-left><img src='" + prob60 +
		"'></img></div><div class = decision-right><img src='" + prob40 + "'></img></div>",
	data: {
		condition: '60_40',
		trial_id: "stim",
		exp_stage: "practice"
	}
}, {
	image: "<div class = decision-left><img src='" + prob40 +
		"'></img></div><div class = decision-right><img src='" + prob60 + "'></img></div>",
	data: {
		condition: '40_60',
		trial_id: "stim",
		exp_stage: "practice"
	}
}]

var firstPhaseStimsComplete = jsPsych.randomization.repeat(firstPhaseStims, eachComboNum, true);
var answers = genResponses(firstPhaseStimsComplete)
var curr_data = ''

/*THIS IS FOR SECOND PHASE STIMS, randomized and counterbalanced*/

secondPhaseStims = [{
	image: "<div class = decision-left><img src='" + prob80 +
		"'></img></div><div class = decision-right><img src='" + prob70 + "'></img></div>",
	data: {
		condition: '80_70',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob70 +
		"'></img></div><div class = decision-right><img src='" + prob80 + "'></img></div>",
	data: {
		condition: '70_80',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob80 +
		"'></img></div><div class = decision-right><img src='" + prob30 + "'></img></div>",
	data: {
		condition: '80_30',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob30 +
		"'></img></div><div class = decision-right><img src='" + prob80 + "'></img></div>",
	data: {
		condition: '30_80',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob80 +
		"'></img></div><div class = decision-right><img src='" + prob60 + "'></img></div>",
	data: {
		condition: '80_60',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob60 +
		"'></img></div><div class = decision-right><img src='" + prob80 + "'></img></div>",
	data: {
		condition: '60_80',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob80 +
		"'></img></div><div class = decision-right><img src='" + prob40 + "'></img></div>",
	data: {
		condition: '80_40',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob40 +
		"'></img></div><div class = decision-right><img src='" + prob80 + "'></img></div>",
	data: {
		condition: '40_80',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob20 +
		"'></img></div><div class = decision-right><img src='" + prob70 + "'></img></div>",
	data: {
		condition: '20_70',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob70 +
		"'></img></div><div class = decision-right><img src='" + prob20 + "'></img></div>",
	data: {
		condition: '70_20',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob20 +
		"'></img></div><div class = decision-right><img src='" + prob30 + "'></img></div>",
	data: {
		condition: '20_30',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob30 +
		"'></img></div><div class = decision-right><img src='" + prob20 + "'></img></div>",
	data: {
		condition: '30_20',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob20 +
		"'></img></div><div class = decision-right><img src='" + prob60 + "'></img></div>",
	data: {
		condition: '20_60',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob60 +
		"'></img></div><div class = decision-right><img src='" + prob20 + "'></img></div>",
	data: {
		condition: '60_20',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob20 +
		"'></img></div><div class = decision-right><img src='" + prob40 + "'></img></div>",
	data: {
		condition: '20_40',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob40 +
		"'></img></div><div class = decision-right><img src='" + prob20 + "'></img></div>",
	data: {
		condition: '40_20',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob80 +
		"'></img></div><div class = decision-right><img src='" + prob20 + "'></img></div>",
	data: {
		condition: '80_20',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob20 +
		"'></img></div><div class = decision-right><img src='" + prob80 + "'></img></div>",
	data: {
		condition: '20_80',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob70 +
		"'></img></div><div class = decision-right><img src='" + prob30 + "'></img></div>",
	data: {
		condition: '70_30',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob30 +
		"'></img></div><div class = decision-right><img src='" + prob70 + "'></img></div>",
	data: {
		condition: '30_70',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob60 +
		"'></img></div><div class = decision-right><img src='" + prob40 + "'></img></div>",
	data: {
		condition: '60_40',
		trial_id: "stim",
		exp_stage: "test"
	}
}, {
	image: "<div class = decision-left><img src='" + prob40 +
		"'></img></div><div class = decision-right><img src='" + prob60 + "'></img></div>",
	data: {
		condition: '40_60',
		trial_id: "stim",
		exp_stage: "test"
	}
}]


var secondPhaseStimsComplete = jsPsych.randomization.repeat(secondPhaseStims, eachComboNumSP, true);



/* This is to end the training while loop, if the subject has reached 6 training blocks */
var training_count = 0;



/* ************************************ */
/*         Set up jsPsych blocks        */
/* ************************************ */
// Set up attention check node
var attention_check_block = {
	type: 'attention-check',
	data: {
		trial_id: "attention_check"
	},
	timing_response: 180000,
	response_ends_trial: true,
	timing_post_trial: 200
}

var attention_node = {
	timeline: [attention_check_block],
	conditional_function: function() {
		return run_attention_checks
	}
}

/* define static blocks */
var feedback_instruct_text =
	'Welcome to the experiment. Press <strong>enter</strong> to begin.'
var feedback_instruct_block = {
	type: 'poldrack-text',
	data: {
		trial_id: "instruction"
	},
	cont_key: [13],
	text: getInstructFeedback,
	timing_post_trial: 0,
	timing_response: 180000
};
/// This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var instruction_trials = []
var instructions_block = {
	type: 'poldrack-instructions',
	data: {
		trial_id: "instruction"
	},
	pages: [
		'<div class = centerbox><p class = block-text>This experiment is composed of two phases.  During the first phase, you will be presented with one of three pairs of abstract shapes.  For each pair, you must choose one of the shapes by pressing either the <strong>left</strong> or <strong>right arrow key</strong> to correspond with the left or right image respectively.</p></div>',
		'<div class = centerbox><p class = block-text>Your job is to pick the shape that is more correct.  These shapes will not always be rewarded deterministically, so try to do your best to pick the shape that is correct given the feedback for the shape.</p></div>',
	],
	allow_keys: false,
	show_clickable_nav: true,
	timing_post_trial: 1000
};
instruction_trials.push(feedback_instruct_block)
instruction_trials.push(instructions_block)

var instruction_node = {
	timeline: instruction_trials,
	/* This function defines stopping criteria */
	loop_function: function(data) {
		for (i = 0; i < data.length; i++) {
			if ((data[i].trial_type == 'poldrack-instructions') && (data[i].rt != -1)) {
				rt = data[i].rt
				sumInstructTime = sumInstructTime + rt
			}
		}
		if (sumInstructTime <= instructTimeThresh * 1000) {
			feedback_instruct_text =
				'Read through instructions too quickly.  Please take your time and make sure you understand the instructions.  Press <strong>enter</strong> to continue.'
			return true
		} else if (sumInstructTime > instructTimeThresh * 1000) {
			feedback_instruct_text = 'Done with instructions. Press <strong>enter</strong> to continue.'
			return false
		}
	}
}

var FP_block = {
	type: 'poldrack-text',
	data: {
		trial_id: "first_phase_intro"
	},
	timing_response: 180000,
	text: '<div class = centerbox><p class = center-block-text> We will now begin Phase 1.  Press <strong>enter</strong> to begin. </p></div>',
	cont_key: [13],
	timing_post_trial: 1000
};


training_trials = []
for (i = 0; i < 6; i++) {
	var training_block = {
		type: 'poldrack-categorize',
		stimulus: getStim,
		key_answer: getResponse,
		choices: [37, 39],
		correct_text: '<div class = bottombox><p style="color:blue"; style="color:green"; class = center-text>Correct!</p></div>',
		incorrect_text: '<div class = bottombox><p style="color:red"; style="color:red"; class = center-text>Incorrect</p></div>',
		timeout_message: '<div class = bottombox><p class = center-text>no response detected</p></div>',
		timing_stim: [4000],
		timing_response: [4000],
		timing_feedback_duration: [750],
		is_html: true,
		data: getData
	};
	training_trials.push(training_block)
}



var performance_criteria = {
	timeline: training_trials,
	loop_function: function(data) {
		var ab_total_correct = 0;
		var cd_total_correct = 0;
		var ef_total_correct = 0;
		var ab_cum_trials = 0;
		var cd_cum_trials = 0;
		var ef_cum_trials = 0;
		for (var i = 0; i < data.length; i++) {
			if (data[i].condition == "80_20" || data[i].condition == "20_80") {
				ab_cum_trials = ab_cum_trials + 1;
				if (data[i].correct === true) {
					ab_total_correct = ab_total_correct + 1;
				}
			} else if (data[i].condition == "70_30" || data[i].condition == "30_70") {
				cd_cum_trials = cd_cum_trials + 1;
				if (data[i].correct === true) {
					cd_total_correct = cd_total_correct + 1;
				}
			} else if (data[i].condition == "60_40" || data[i].condition == "40_60") {
				ef_cum_trials = ef_cum_trials + 1;
				if (data[i].correct === true) {
					ef_total_correct = ef_total_correct + 1;
				}
			}
		}
		var ab_percent = ab_total_correct / ab_cum_trials
		var cd_percent = cd_total_correct / cd_cum_trials
		var ef_percent = ef_total_correct / ef_cum_trials

		training_count = training_count + 1;

		if ((ab_percent > 0.7 && cd_percent > 0.65 && ef_percent > 0.5 && training_count > 3) || (
				training_count == 6)) {
			return false
		} else {
			firstPhaseStimsComplete = jsPsych.randomization.repeat(firstPhaseStims, eachComboNum, true);
			answers = genResponses(firstPhaseStimsComplete)
			return true
		}

	}
};



var SP_block = {
	type: 'poldrack-text',
	timing_response: 180000,
	data: {
		trial_id: "second_phase_intro"
	},
	text: '<div class = centerbox><p class = block-text>We will now begin Phase 2.</p><p class = block-text> For this phase, you must again choose between pairs of shapes. Press the <strong>right</strong> arrow key to choose the image on the right, and the <strong>left</strong> arrow key to choose the image on the left.</p><p class = block-text>These trials will not have feedback, so do your best to pick the shape that is correct given your experience with the shape.</p><p class = block-text> Press <strong> Enter </strong> when you are ready.</p></div>',
	cont_key: [13]
};


var second_phase_trials = {
	type: 'poldrack-single-stim',
	stimulus: getSecondPhaseStim,
	is_html: true,
	data: getData,
	choices: [37, 39],
	timing_stim: [1000, -1],
	timing_response: [1000],
};


var end_block = {
	type: 'poldrack-text',
	data: {
		trial_id: "end"
	},
	timing_response: 180000,
	text: '<div class = centerbox><p class = center-block-text>Finished with this task!</p><p class = center-block-text>Press <strong>enter</strong> to continue.</p></div>',
	cont_key: [13]
};



/* create experiment definition array */
var probabilistic_selection_experiment = [];
probabilistic_selection_experiment.push(instruction_node);
probabilistic_selection_experiment.push(FP_block);
//probabilistic_selection_experiment.push(performance_criteria);
probabilistic_selection_experiment.push(attention_node);
probabilistic_selection_experiment.push(SP_block);
for(var i = 0; i<SP_trials; i++){
probabilistic_selection_experiment.push(second_phase_trials);
}
probabilistic_selection_experiment.push(attention_node);
probabilistic_selection_experiment.push(end_block);