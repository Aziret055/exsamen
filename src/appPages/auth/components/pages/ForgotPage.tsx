'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForgotPasswordMutation } from '@/redux/api/auth';
import './auth.scss';
import { toast } from 'react-toastify'

const ForgotPage: React.FC = () => {
	const [email, setEmail] = useState('');
	const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email) {
			toast.warning('Please enter your email address.');
			return;
		}

		const result = await forgotPassword({
			email,
			frontEndUrl: window.location.href
		});

		if (result.error && (result.error as ApiError).data.message) {
			toast.error((result.error as ApiError).data.message);
		}
		if (result.data) {
			toast.success(result.data.message);
			setTimeout(() => {
				router.push('/auth/sign-in');
			}, 1000);
		}
	};

	return (
		<div className="auth-container">
			<section>
				<h1>Forgot Password</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						id="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button type="submit" disabled={isLoading}>
						{isLoading ? 'Sending...' : 'Send Reset Link'}
					</button>
					<p className="options">
						<span>Remember your password?</span>
						<button
							onClick={() => router.push('/auth/sign-in')}
							type="button"
							className="redirect-btn"
						>
							Sign In
						</button>
					</p>
				</form>
			</section>
		</div>
	);
};

export default ForgotPage;
