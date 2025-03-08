import React from 'react';

const QACard = (props) => {
	const { question, answer } = props;

	return (
		<div class='qa-card'>
			<div className='question'>{question}</div>
			<div className='answer'>{answer}</div>
		</div>
	);
};

export default React.memo(QACard);
