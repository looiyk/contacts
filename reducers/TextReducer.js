import {
  TEXT_CHANGED
} from '../actions/Types';



const INITIAL_STATE = {
  text: ''
};


export default ( state=INITIAL_STATE , action ) => {
  /* We always have the exact same format for every reducer we write, we always
  have a switch statement and depending on the action it will decide what to
  do with it.

  we can never return undefined from a reducer, every time our reducers are call
  we should have a default state.
  */
  switch (action.type) {
    case TEXT_CHANGED:
       // in step 11

    default:
      // Return the initial state when no action types match.
      return state
  }
}
