import { createStore, compose, applyMiddleware } from ‘redux’;
import thunk from ‘redux-thunk’;
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const middleWare = [];

middleWare.push(thunk)

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});
middleWare.push(loggerMiddleware)

const store = createStore({
    reducers,
    {}, // default state of the application
    compose(
        applyMiddleware(...middleWare)
    )
})
export default store;
