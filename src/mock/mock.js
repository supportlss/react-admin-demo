import store from '../store'

export const login = (loginObject) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			sessionStorage.setItem('userName',loginObject.userName)
			resolve()
		}, 500)
	})
}

export const logout = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			store.dispatch({
				type: 'SET_LOGGED_USER',
				logged: false
			})
			resolve()
		}, 500)
	})
}