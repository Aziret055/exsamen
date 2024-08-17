import { FC } from 'react';
import scss from './Footer.module.scss';

const Footer: FC = () => {
	return (
		<>
			<footer className={scss.Footer}>
				<div className="container">
					<div className={scss.content}>
						<p>Copyright © 2024. All rights are reserved</p>
						<p>By Elcho911 (ElchoCrud)</p>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
