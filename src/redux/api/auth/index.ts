import { addToken } from '@/helpers/addToken';
import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getMe: build.query<AUTH.GetResponse, AUTH.GetRequest>({
			query: () => ({
				url: 'auth/user',
				method: 'GET'
			}),
			providesTags: ['auth']
		}),
		signUp: build.mutation<AUTH.SignUp.Response, AUTH.SignUp.FormData>({
			query: (data) => ({
				url: 'auth/sign-up',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['auth'],
			transformResponse(response: AUTH.SignIn.Response) {
				if (response.accessToken && response.refreshToken) {
					addToken(response);
					localStorage.removeItem('isRetry');
				}
				return response;
			}
		}),
		signIn: build.mutation<AUTH.SignIn.Response, AUTH.SignIn.FormData>({
			query: (data) => ({
				url: 'auth/sign-in',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['auth'],
			transformResponse(response: AUTH.SignIn.Response) {
				if (response.accessToken && response.refreshToken) {
					addToken(response);
					localStorage.removeItem('isRetry');
				}
				return response;
			}
		}),
		refresh: build.mutation<AUTH.Refresh.Resposne, AUTH.Refresh.Request>({
			query: () => {
				let token = JSON.parse(localStorage.getItem('refreshToken')!);
				if (!token) {
					token = JSON.parse(sessionStorage.getItem('refreshToken')!);
				}
				return {
					url: 'auth/refresh',
					method: 'PATCH',
					body: {
						refreshToken: token
					}
				};
			},
			invalidatesTags: ['auth'],
			transformResponse(response: AUTH.Refresh.Resposne) {
				if (response.accessToken && response.refreshToken) {
					addToken(response);
					localStorage.removeItem('isRetry');
				}
				return response;
			},
			transformErrorResponse(response) {
				localStorage.setItem('isRetry', 'true');
				return response;
			}
		}),
		forgotPassword: build.mutation<
			AUTH.ForgotPassword.Resposne,
			AUTH.ForgotPassword.Data
		>({
			query: (data) => {
				return {
					url: 'auth/forgot',
					method: 'POST',
					body: data
				};
			}
		}),
		resetPassword: build.mutation<
			AUTH.ResetPassword.Resposne,
			AUTH.ResetPassword.Data
		>({
			query: (data) => {
				return {
					url: 'auth/reset-password',
					method: 'PATCH',
					body: data
				};
			}
		}),
		logout: build.mutation<{ message: string }, void>({
			query: () => {
				return {
					url: 'auth/logout',
					method: 'POST'
				};
			},
			invalidatesTags: ['auth'],
			transformResponse(response: { message: string }) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('accessTokenExpiration');
				localStorage.removeItem('refreshToken');
				return response;
			}
		})
	})
});
export const {
	useGetMeQuery,
	useSignInMutation,
	useRefreshMutation,
	useSignUpMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useLogoutMutation
} = api;
