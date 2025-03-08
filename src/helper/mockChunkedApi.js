const mockChunkedApi = () => {
	const chunks = ['Thinking...', 'Analyzing...', `Result...`, 'Nice...'];

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
			}, 1000);
		},
	});
};

export default mockChunkedApi;
