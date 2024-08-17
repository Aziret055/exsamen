'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useResetPasswordMutation } from '@/redux/api/auth';
import './auth.scss';
import { toast } from 'react-toastify'

const ResetPasswordPage: React.FC<PageProps<[], ['token']>> = ({
	searchParams
}) => {
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [resetPassword, { isLoading }] = useResetPasswordMutation();
	const router = useRouter();
	const token = searchParams.token;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newPassword !== confirmPassword) {
			toast.warn('Passwords do not match.');
			return;
		}

		if (newPassword.length < 8) {
			toast.warn('Password must be at least 8 characters long.');
			return;
		}

		const result = await resetPassword({ token, newPassword });
		if (result.error && (result.error as ApiError).data.message) {
			toast.error((result.error as ApiError).data.message);
		}
		if (result.data) {
			toast.success(result.data.message);
			setTimeout(() => router.push('/auth/sign-in'), 1000);
		}
	};

	return (
		<div className="auth-container">
			<section>
				<h1>Reset Password</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="password"
						id="new-password"
						placeholder="New Password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<input
						type="password"
						id="confirm-password"
						placeholder="Confirm New Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<button type="submit" disabled={isLoading}>
						{isLoading ? 'Resetting...' : 'Reset Password'}
					</button>
				</form>
			</section>
		</div>
	);
};

export default ResetPasswordPage;
