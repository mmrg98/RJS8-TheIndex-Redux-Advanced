import {createStore, compose, applyMiddleware} from 'redux'; 
import thunk from 'redux-thunk'

import reducer from './reducers';
import { fetchAuthors,fetchBooks } from './actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
store.dispatch(fetchAuthors())
store.dispatch(fetchBooks())

export default store;