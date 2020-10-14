import {combineReducers} from 'redux'
import authorsReducer from './authors'
import booksReducer from './books'


const rootReducer = combineReducers({
    authorsState: authorsReducer,
    booksState: booksReducer,

})

export default rootReducer;