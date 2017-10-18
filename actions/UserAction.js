import UserApi from '../API/UserApi';
import * as types from './Types';

export function textChangeSuccess(data){
  return {
    type: types.TEXT_CHANGED, data
  }
}

export function textChange(obj) {
  return dispatch => {
    return UserApi.textChange(obj).then( data => {
      dispatch(textChangeSuccess(data))
    }).catch( err=> {
      throw(err);
    })
  }
}
