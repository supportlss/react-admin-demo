import * as ActionEvent from '../constants/actionsEvent'

const initialState = {
	toPath: ''
}

const loginRedirectPath = (state = initialState, action) => {
	if(action.type === ActionEvent.Login_Redirect_Event) {
		return Object.assign({}, state, {
			toPath: action.toPath
		})
	}
	return state;
}

export default loginRedirectPath