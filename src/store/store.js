import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunkMiddleware]

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store