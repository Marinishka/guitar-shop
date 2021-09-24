import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  FETCH_GUITARS: `data/fetchGuitars`,
  ADD_ONE_GUITAR: `local/addOneGuitar`,
  ADD_GUITARS: `local/addGuitars`,
  DELETE_ONE_GUITAR: `local/deleteOneGuitar`,
  DELETE_MODEL_GUITAR: `local/deleteMoledGuitar`,
  CHANGE_FILTERED_GUTARS: `local/changeFilteredGuitars`
};

export const fetchGuitars = createAction(ActionType.FETCH_GUITARS, (data) => {
  return {
    payload: data
  };
});

export const addOneGuitar = createAction(ActionType.ADD_ONE_GUITAR, (guitar) => {
  return {
    payload: guitar
  };
});

export const addGuitars = createAction(ActionType.ADD_GUITARS, (art) => {
  return {
    payload: art
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

export const changeFilteredGuitars = createAction(ActionType.CHANGE_FILTERED_GUTARS, (guitars) => {
  return {
    payload: guitars
  };
});
