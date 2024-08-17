namespace AUTH {
	type GetResponse = User;
	type GetRequest = void;

	namespace Refresh {
		interface Data {
			refreshToken: string;
		}
		type Resposne = SignIn.Response;
		type Request = SignIn.Request;
	}

	namespace ResetPassword {
		interface Data {
			token: string;
			newPassword: string;
		}
		type Resposne = {
			message: string;
		};
		type Request = SignIn.Request;
	}

	namespace ForgotPassword {
		interface Data {
			email: string;
			frontEndUrl: string;
		}
		type Resposne = {
			message: string;
		};
		type Request = SignIn.Request;
	}
	namespace SignIn {
		interface FormData {
			email: string;
			password: string;
		}
		interface Response {
			accessToken: string;
			accessTokenExpiration: number;
			refreshToken: string;
		}
		type Request = void;
	}
	namespace SignUp {
		interface FormData {
			email: string;
			password: string;
			username: string;
			photo: string;
		}
		type Response = SignIn.Response;
		type Request = void;
	}
}
