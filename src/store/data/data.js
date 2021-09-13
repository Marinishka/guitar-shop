import {fetchGuitars} from '../action';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  guitars: []
};

const data = createReducer(initialState, (builder) => {
  builder.addCase(fetchGuitars, (state, action) => {
    state.guitars = action.payload;
  });
});

export {data};
