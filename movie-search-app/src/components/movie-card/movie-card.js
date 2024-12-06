import React, { useContext, useEffect, useState } from 'react';
import './movie-card.scss';
import star from '../../assets/svg/star.svg';
import noPoster from '../../assets/png/noPoster.png';
import { Space } from '@mantine/core';
import Star from '../star/star';
import { FavContext } from '../../state/state';

export default function MovieCard({ info, genres }) {
  // console.log(info.id);
  // console.log(info);

  const favContext = useContext(FavContext);

  const [favorite, setFavorite] = useState(false);

  const checkFavorites = () => {
    if (favContext.favState.favoritesId.includes(info.id)) {
      setFavorite(true);
    }
  };

  useEffect(checkFavorites, []);

  const favoriteHandler = () => {
    if (favContext.favState.favoritesId.includes(info.id)) {
      setFavorite(false);
      favContext.favDispatch({ type: 'REMOVE_ID_FROM_FAVORITES', payload: info.id });
      // console.log('del ' + info.id);
    } else {
      setFavorite(true);
      favContext.favDispatch({ type: 'ADD_ID_TO_FAVORITES', payload: info.id });
      // console.log('add ' + info.id);
    }
  };

  //получение названий жанров из списка id отдельного фильма
  let genreTitles = info.genre_ids
    .map((genID) => genres.find((obj) => obj.id === genID))
    .map((val) => val?.name || '')
    .join(', ');

  return (
    <div className="movie-card">
      {/* <img className="movie-image" src={`https://image.tmdb.org/t/p/original/${info.poster_path}`} alt={`${info.original_title} poster`} /> */}
      <img className="movie-image" src={noPoster} alt="noPoster" />
      <div className="movie-card-inner">
        <h2 className="movie-card-title">{info.original_title}</h2>
        <p>{info.release_date.slice(0, 4)}</p>
        <div className="movie-rating">
          <img src={star} alt="star" width={22} />
          <span>{info.vote_average.toFixed(1)}</span>
          <span>({info.vote_count})</span>
        </div>
        <Space h={40} />
        <p>{genreTitles}</p>
      </div>
      <div className="movie-star" onClick={favoriteHandler}>
        <Star favorite={favorite} />
      </div>
    </div>
  );
}
