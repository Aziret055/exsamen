type TokensKey = 'accessTokenExpiration' | 'accessToken' | 'refreshToken';

export async function addToken(tokens: Record<TokensKey, string | number>) {
	localStorage.setItem('accessToken', JSON.stringify(tokens.accessToken));
	localStorage.setItem(
		'accessTokenExpiration',
		JSON.stringify(tokens.accessTokenExpiration)
	);

	localStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken));
}
