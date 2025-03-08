import { useState, useEffect } from 'react';
import mockChunkedApi from './helper/mockChunkedApi';

const App = () => {
	const [input, setInput] = useState('');
	const [displayText, setDisplayText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [chunks, setChunks] = useState([]);
	const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);

	useEffect(() => {
		if (chunks.length === 0 || currentChunkIndex >= chunks.length) return;

		const currentChunk = chunks[currentChunkIndex];

		if (charIndex < currentChunk.length) {
			const timer = setTimeout(() => {
				setDisplayText((prev) => prev + currentChunk[charIndex]);
				setCharIndex((prev) => prev + 1);
			}, 30);

			return () => clearTimeout(timer);
		} else {
			setCurrentChunkIndex((prev) => prev + 1);
			setCharIndex(0);
		}
	}, [chunks, currentChunkIndex, charIndex]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setDisplayText('');
		setIsLoading(true);
		setChunks([]);
		setCurrentChunkIndex(0);
		setCharIndex(0);

		try {
			const stream = mockChunkedApi();
			const reader = stream.getReader();

			while (true) {
				const { done, value } = await reader.read();

				if (done) break;

				if (value) {
					setChunks((prev) => [...prev, value]);
				}
			}
		} catch (error) {
			console.error('Error reading stream:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder='Enter something...'
					disabled={isLoading}
				/>
				<button type='submit' disabled={isLoading}>
					{'Submit'}
				</button>
			</form>
			<div>{displayText}</div>
		</div>
	);
};

export default App;
