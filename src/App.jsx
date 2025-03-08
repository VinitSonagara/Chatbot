import { useState, useEffect, useRef } from 'react';
import mockChunkedApi from './helper/mockChunkedApi';
import './App.css';
import QAList from './components/QAList';
import InputField from './components/InputField';

const App = () => {
	const [displayText, setDisplayText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isThinking, setIsThinking] = useState(false);
	const [thinkingDots, setThinkingDots] = useState('');
	const [chunks, setChunks] = useState([]);
	const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState([]);
	const displayTextRef = useRef('');

	useEffect(() => {
		if (!isThinking) {
			setThinkingDots('');
			return;
		}

		const interval = setInterval(() => {
			setThinkingDots((prev) => (prev.length < 10 ? prev + '.' : ''));
		}, 500);

		return () => clearInterval(interval);
	}, [isThinking]);

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
		const input = e?.target[0].value || '';
		e.preventDefault();
		setDisplayText('');
		setIsLoading(true);
		setIsThinking(true);
		setChunks([]);
		setCurrentChunkIndex(0);
		setCharIndex(0);
		setQuestions([...questions, input]);

		try {
			const stream = mockChunkedApi();
			const reader = stream.getReader();
			let isFirstChunk = true;

			while (true) {
				const { done, value } = await reader.read();

				if (done) {
					setAnswers([...answers, displayTextRef.current]);
					displayTextRef.current = '';
					break;
				}

				if (value) {
					if (isFirstChunk) {
						setIsThinking(false);
						isFirstChunk = false;
					}
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
			<QAList
				questions={questions}
				answers={answers}
				displayText={
					isThinking ? (
						<span className='thinking'>{`Thinking${thinkingDots}`}</span>
					) : (
						displayText
					)
				}
			/>
			<InputField handleSubmit={handleSubmit} isLoading={isLoading} />
		</div>
	);
};

export default App;
