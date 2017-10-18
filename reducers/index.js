import { combineReducers } from 'redux';
import user from './UserReducer';

const rootReducers =  combineReducers({
  // the keys here are going to be the property of state that we are producing.
    user,
});

export default rootReducers;
