const mockChunkedApi = () => {
	const chunks = [
		'Thinking and analyzing',
		'the given data while processing',
		'and calculating every possible outcome.',
		'Loading data and fetching resources',
		'to compile accurate results and evaluate key insights.',
		'Interpreting data by running algorithms and simulating scenarios for better optimization.',
		'Retrieving information, decoding inputs, and scanning for patterns and trends.',
		'Querying databases, mapping inputs, and sorting values to construct meaningful insights.',
		'Parsing responses, constructing ideas, and finalizing logical conclusions.',
		'Rendering outputs, estimating solutions, and assessing variables in real-time.',
		'Validating conditions, formulating strategies, and deriving effective answers.',
		'Refining outputs by inspecting key elements and synchronizing dynamic data.',
		'Checking accuracy, recalculating possibilities, and determining the most efficient routes.',
		'Updating models, breaking down complexities, and clarifying crucial points.',
		'Collecting samples, reviewing details, and balancing equations for stable solutions.',
		'Weighing options, assessing impacts, and modeling future scenarios.',
		'Projecting outcomes, stabilizing responses, and aligning processes for maximum efficiency.',
		'Cleaning data, consolidating facts, and extracting hidden patterns.',
		'Highlighting trends, building components, and filtering unnecessary options.',
		'Calculating averages, assessing likelihoods, and structuring clear responses.',
		'Compiling summaries, focusing insights, and interpreting meaningful clues.',
		'Visualizing outputs, capturing relevant moments, and finalizing comprehensive reports.',
		'Deploying changes, launching processes, and executing well-defined plans.',
		'Testing limits, comparing datasets, and sequencing planned actions.',
		'Adjusting models, shaping adaptive solutions, and forming innovative ideas.',
		'Confirming steps, completing critical tasks, and delivering accurate answers.',
		'Highlighting core results, programming flexible responses, and refining logic.',
		'Calculating speeds, structuring concepts, and combining effective methods.',
		'Optimizing paths, concluding well-researched thoughts, and locking insights.',
		'Solidifying strategies, emphasizing key points, and executing commands.',
		'Integrating data, summing up insights, and polishing final details.',
		'Breaking ground, highlighting priorities, and merging concrete results.',
		'Crafting unique solutions, pinpointing errors, and clarifying complex objectives.',
		'Forecasting potential outcomes, revising calculated outputs, and strengthening reliable models.',
		'Targeting variables, refocusing creative strategies, and compiling actionable lists.',
		'Summarizing critical actions, finalizing outputs, and producing successful outcomes.',
	];

	return new ReadableStream({
		start: (controller) => {
			let i = 0;
			const interval = setInterval(() => {
				if (i < chunks.length) {
					controller.enqueue(chunks[i]);
					i++;
				} else {
					controller.close();
					clearInterval(interval);
				}
			}, 10);
		},
	});
};

export default mockChunkedApi;
