import {combineReducers} from 'redux';
import {localState} from './local/local';
import {data} from './data/data';

export const NameSpace = {
  LOCAL: `LOCAL`,
  DATA: `DATA`
};

export default combineReducers({
  [NameSpace.LOCAL]: localState,
  [NameSpace.DATA]: data
});
