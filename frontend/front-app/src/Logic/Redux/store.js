import {createStore, combineReducers} from 'redux'

//In case state is more complex and needs more than just basic useState
const reducer = combineReducers({

})

const store = createStore(reducer)

export default store