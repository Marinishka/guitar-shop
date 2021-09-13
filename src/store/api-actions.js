import {loadValuteLastDay, loadSomeLastDay} from './action';

export const fetchValuteLastDay = () => (dispatch: any, _getState: any, api: any) => (
  api.get(`/daily_json.js`)
    .then(({
    data
  }: any) => {
      dispatch(loadValuteLastDay(data));
    })
);

export const fetchLastDays = (urlDateYYYYMMDD: any) => (dispatch: any, _getState: any, api: any) => (
  api.get(`/archive/${urlDateYYYYMMDD}/daily_json.js`)
    .then(({
    data
  }: any) => {
      dispatch(loadSomeLastDay(data));
    })
);
