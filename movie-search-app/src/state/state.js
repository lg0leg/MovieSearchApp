import { createContext } from 'react';

export const initialFavState = {
  favoritesId: JSON.parse(localStorage.getItem('favoritesId')) || [],
  favoritesInfo: JSON.parse(localStorage.getItem('favoritesInfo')) || [],
  favoritesRating: JSON.parse(localStorage.getItem('favoritesRating')) || [],
};

export const favReducer = (favState, action) => {
  switch (action.type) {
    case 'ADD_ID_TO_FAVORITES':
      return { ...favState, ...favState.favoritesId.push(action.payload) };
    case 'REMOVE_ID_FROM_FAVORITES':
      return { ...favState, favoritesId: favState.favoritesId.filter((movie) => movie !== action.payload) };
    case 'ADD_ITEM_TO_FAVORITES':
      return { ...favState, ...favState.favoritesInfo.push(action.payload) };
    case 'REMOVE_ITEM_FROM_FAVORITES':
      return { ...favState, favoritesInfo: favState.favoritesInfo.filter((movie) => movie.id !== action.payload) };
    case 'SET_RATING_FOR_ITEM':
      return { ...favState, ...favState.favoritesRating.push(action.payload) };
    case 'REMOVE_RATING_FROM_ITEM':
      return { ...favState, favoritesRating: favState.favoritesRating.filter((rateObj) => rateObj.itemId !== action.payload) };
    default:
      return favState;
  }
};

export const FavContext = createContext({ initialFavState, favDispatch: () => null });
