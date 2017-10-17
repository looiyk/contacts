import {
  TEXT_CHANGED
} from './Types';

export const textChanged = (text) => {
  return {
    type: TEXT_CHANGED,
    payload: text
  };
}
