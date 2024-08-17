import type { Metadata } from 'next';
import './globals.scss';
import RootLayoutClient from './layout.client';

export const metadata: Metadata = {
	title: 'Instagram ProjectX',
	description: 'Generated by MotionWeb'
};

export default function RootLayout({ children }: Readonly<Children>) {
	return (
		<html lang="en">
			<body>
				<RootLayoutClient>{children}</RootLayoutClient>
			</body>
		</html>
	);
}
