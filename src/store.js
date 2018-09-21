import { createStore, combineReducers } from 'redux'
import loginReducer from './reducer/loginReducer'

const reducers = combineReducers({
	loginState: loginReducer
})

const store = createStore(reducers)

export default store