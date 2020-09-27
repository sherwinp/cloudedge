'use strict';
export default class Auth{
static isSignedIn(url = "authorize", bearer_code = "code") {
	var bearer = 'Bearer ' + bearer_code;
	fetch(url, {
		method: 'GET',
		withCredentials: true,
		credentials: 'include',
		headers: {
			'Authorization': bearer,
			'Content-Type': 'application/json'
		}
		}).then(responseJson => {
			console.log(responseJson);
		}).catch(error => {
			console.log(error);
		});
}
}
