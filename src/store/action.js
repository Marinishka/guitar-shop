import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  FETCH_GUITARS: `data/fetchGuitars`,
  ADD_GUITAR: `local/addGuitar`,
  DELETE_ONE_GUITAR: `local/deleteOneGuitar`,
  DELETE_MODEL_GUITAR: `local/deleteMoledGuitar`
};

export const fetchGuitars = createAction(ActionType.FETCH_GUITARS, (data) => {
  return {
    payload: data
  };
});

export const addGuitar = createAction(ActionType.ADD_GUITAR, (guitar) => {
  return {
    payload: guitar
  };
});

export const deleteOneGuitar = createAction(ActionType.DELETE_ONE_GUITAR, (guitar) => {
  return {
    payload: guitar
  };
});

export const deleteModelGuitar = createAction(ActionType.DELETE_MODEL_GUITAR, (guitar) => {
  return {
    payload: guitar
  };
});
