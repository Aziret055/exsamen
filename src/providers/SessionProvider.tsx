/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { FC, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useGetMeQuery, useRefreshMutation } from '@/redux/api/auth';

interface SessionProviderProps {
	children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
	const { status, error, isError, isLoading } = useGetMeQuery();
	const pathname = usePathname();
	const router = useRouter();
	const [refresh, { isLoading: refreshLoading }] = useRefreshMutation();
	const isRetry = localStorage.getItem('isRetry');

	if (isError && error && (error as any).status === 403 && isRetry !== 'true') {
		localStorage.setItem('isRetry', 'true');

		refresh();
	}

	const handleNavigation = () => {
		switch (pathname) {
			case '/auth/sign-in':
			case '/auth/sign-up':
			case '/auth/reset-password':
			case '/auth/forgot':
				if (status === 'fulfilled' && !isLoading) {
					router.push('/');
				}
				break;
			case '/':
			case '/profile/my-posts':
			case '/create-post':
			case '/profile':
				if (status === 'rejected' && !isLoading && !refreshLoading) {
					router.push('/auth/sign-in');
				}
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		handleNavigation();
	}, [status, pathname, router]);

	return children;
};
