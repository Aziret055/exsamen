import React from 'react';
import scss from './Welcome.module.scss';

const Welcome = () => {
	return (
		<section className={scss.Welcome}>
			<div className="container">
				<div className={scss.content}>
					<h1>Welcome</h1>
				</div>
			</div>
		</section>
	);
};

export default Welcome;
