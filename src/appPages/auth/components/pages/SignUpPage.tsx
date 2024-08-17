'use client';

import { useSignUpMutation } from '@/redux/api/auth';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import './auth.scss';

const SignUpPage = () => {
	const {
		formState: { errors },
		register,
		handleSubmit
	} = useForm<AUTH.SignUp.FormData>();
	const router = useRouter();
	const [sigUpSubmit, { isLoading }] = useSignUpMutation();

	const onSubmit: SubmitHandler<AUTH.SignUp.FormData> = async (data) => {
		const result = await sigUpSubmit(data);
		if (result.error) {
			const errorMessage =
				(result.error as ApiError)?.data?.message || 'Произошла ошибка';
			toast.error(errorMessage);
			return;
		}
		if (result.data) {
			toast.success('Успешная регистрация');
			setTimeout(() => {
				router.push('/');
			}, 800);
		}
	};

	return (
		<div className="auth-container">
			<section>
				<h1>Sign Up</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						id="username"
						placeholder="Имя ползователья"
						{...register('username', {
							required: true
						})}
					/>
					{errors.username && (
						<p className="error last">{errors.username.message}</p>
					)}

					<input
						type="email"
						id="email"
						placeholder="Электронная почта"
						{...register('email', {
							required: true,
							pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
						})}
					/>
					<input
						type="password"
						id="password"
						placeholder="Пароль"
						{...register('password', { required: true })}
					/>
					<input
						type="url"
						id="photo"
						placeholder="URL фотографии"
						{...register('photo', {
							required: true
						})}
					/>
					<button type="submit">
						{isLoading ? 'Загрузка...' : 'Зарегестрироватся'}
					</button>
					<p className="options">
						<span>Уже есть аккаунт?</span>
						<button
							onClick={() => router.push('/auth/sign-in')}
							type="button"
							className="redirect-btn"
						>
							Войти
						</button>
					</p>
				</form>
			</section>
		</div>
	);
};

export default SignUpPage;
