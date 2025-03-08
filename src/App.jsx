import { useState, useEffect, useRef } from 'react';
import mockChunkedApi from './helper/mockChunkedApi';
import './App.css';

const App = () => {
	const [input, setInput] = useState('');
	const [displayText, setDisplayText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [chunks, setChunks] = useState([]);
	const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState([]);
	const displayTextRef = useRef('');

	useEffect(() => {
		if (chunks.length === 0 || currentChunkIndex >= chunks.length) return;

		const currentChunk = chunks[currentChunkIndex];

		if (charIndex < currentChunk.length) {
			const timer = setTimeout(() => {
				setDisplayText((prev) => prev + currentChunk[charIndex]);
				setCharIndex((prev) => prev + 1);
			}, 5);

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
		setQuestions([...questions, input]);
		setInput('');

		try {
			const stream = mockChunkedApi();
			const reader = stream.getReader();

			while (true) {
				const { done, value } = await reader.read();

				if (done) {
					setAnswers([...answers, displayTextRef.current]);
					displayTextRef.current = '';
					break;
				}

				if (value) {
					displayTextRef.current = displayTextRef.current + value;
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
		<div className='container'>
			<div className='content'>
				{questions.length > 0 &&
					questions.map((question, index) => {
						if (index === questions.length - 1) {
							return (
								<>
									<div className='question'>Q: {question}</div>
									<div className='answer'>A: {displayText}</div>
								</>
							);
						}
						return (
							<>
								<div className='question'>Q: {question}</div>
								<div className='answer'>A: {answers[index]}</div>
							</>
						);
					})}
			</div>
			<form onSubmit={handleSubmit} className='input-form'>
				<input
					type='text'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder='Ask a question...'
					disabled={isLoading}
					className='input-field'
				/>
				<button type='submit' disabled={isLoading} className='submit-button'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default App;
