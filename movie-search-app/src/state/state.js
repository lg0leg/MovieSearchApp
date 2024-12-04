import { createContext } from 'react';

export const initialFavState = {
  favorites: [],
};

export const favReducer = (favState, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return { ...favState, ...favState.favorites.push(action.payload) };
    case 'REMOVE_FROM_FAVORITES':
      return { ...favState, favorites: favState.favorites.filter((movie) => movie !== action.payload) };
    default:
      return favState;
  }
};

export const FavContext = createContext({ initialFavState, favDispatch: () => null });
