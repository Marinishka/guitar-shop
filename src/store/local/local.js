import {addOneGuitar, deleteOneGuitar, deleteModelGuitar, changeFilteredGuitars, addGuitars} from '../action';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  guitarsInBasket: [],
  filteredGuitars: []
};

const localState = createReducer(initialState, (builder) => {
  builder.addCase(addOneGuitar, (state, action) => {
    if (state.guitarsInBasket.find((item) => item.art === action.payload)) {
      state.guitarsInBasket = state.guitarsInBasket.map((item) => {
        if (item.art === action.payload) {
          item.quantity++;
        }
        return {art: item.art, quantity: item.quantity};
      });
    } else {
      state.guitarsInBasket.push({art: action.payload, quantity: 1});
    }
  });
  builder.addCase(addGuitars, (state, action) => {
    state.guitarsInBasket = state.guitarsInBasket.map((item) => {
      if (item.art === action.payload.art) {
        item.quantity = action.payload.quantity;
      }
      return {art: item.art, quantity: item.quantity};
    });
  });
  builder.addCase(deleteOneGuitar, (state, action) => {
    state.guitarsInBasket = state.guitarsInBasket.map((item) => {
      if (item.art === action.payload) {
        item.quantity--;
      }
      return {art: item.art, quantity: item.quantity};
    });
  });
  builder.addCase(deleteModelGuitar, (state, action) => {
    state.guitarsInBasket.splice(state.guitarsInBasket.indexOf(state.guitarsInBasket.find((item) => item.art === action.payload)), 1);
  });
  builder.addCase(changeFilteredGuitars, (state, action) => {
    state.filteredGuitars = action.payload;
  });
});

export {localState};
