
import * as types from '../actions/Types';

const initialState = {
  name: []
}

export default function userReducer(state = initialState, action){

  switch(action.type) {
    case types.TEXT_CHANGED:
      return {...state, name: action.data}

      default:
        return state;
  }
}
