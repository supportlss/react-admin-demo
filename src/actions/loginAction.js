import store from '../store'
import * as ActionEvent from '../constants/actionsEvent'

export const setLoginRedirectUrl = (toPath) => {
	return  store.dispatch({
			 	type: ActionEvent.Login_Redirect_Event,
				toPath: toPath
			 })
}

