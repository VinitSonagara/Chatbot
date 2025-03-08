import React, { useEffect, useState } from 'react';

const InputField = (props) => {
	const { handleSubmit, isLoading } = props;
	const [input, setInput] = useState('');

	useEffect(() => {
		setInput('');
	}, [isLoading]);

	return (
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
	);
};

export default React.memo(InputField);
