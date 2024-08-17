'use client';

import { useSignInMutation } from '@/redux/api/auth';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import './auth.scss';
import { toast } from 'react-toastify';

const SignInPage = () => {
	const {
		formState: { errors },
		register,
		handleSubmit
	} = useForm<AUTH.SignIn.FormData>();
	const router = useRouter();

	const [sigInSubmit, { isLoading }] = useSignInMutation();

	const onSubmit: SubmitHandler<AUTH.SignIn.FormData> = async (data) => {
		const result = await sigInSubmit(data);
		if (result.error) {
			toast.error((result.error as ApiError).data.message);
			return;
		}
		if (result.data) {
			toast.success('Успешный вход');
			setTimeout(() => {
				router.push('/');
			}, 800);
		}
	};

	return (
		<div className="auth-container">
			<section>
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="email"
						id="email"
						placeholder="Электронная почта"
						{...register('email', {
							required: true,
							pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
						})}
					/>
					{errors.email && (
						<p className="error">Неверный адрес электронной почты</p>
					)}
					<input
						className="isLast"
						type="password"
						id="password"
						placeholder="Пароль"
						{...register('password', { required: true })}
					/>
					{errors.password && <p className="error last">Пароль обязателен</p>}
					<p className="forgot-password-container">
						<button
							onClick={() => router.push('/auth/forgot')}
							type="button"
							className="forgot-password"
						>
							Забыли пароль?
						</button>
					</p>
					<button type="submit" disabled={isLoading}>
						{isLoading ? 'Загрузка...' : 'Войти'}
					</button>
					<p className="options wrap">
						<span>У вас нет учетной записи?</span>
						<button
							onClick={() => router.push('/auth/sign-up')}
							type="button"
							className="redirect-btn"
						>
							Зарегестрироватся
						</button>
					</p>
				</form>
			</section>
		</div>
	);
};

export default SignInPage;
