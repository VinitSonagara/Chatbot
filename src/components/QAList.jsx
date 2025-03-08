import React from 'react';
import QACard from './QACard';

const QAList = (props) => {
	const { questions, answers, displayText } = props;

	return (
		<div className='content'>
			{questions.length > 0 &&
				questions.map((question, index) => {
					return (
						<QACard
							key={question}
							question={question}
							answer={
								index === questions.length - 1 ? displayText : answers[index]
							}
						/>
					);
				})}
		</div>
	);
};

export default React.memo(QAList);
