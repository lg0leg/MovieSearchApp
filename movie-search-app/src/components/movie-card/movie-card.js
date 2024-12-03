import React, { useState } from 'react';
import './movie-card.scss';
import star from '../../assets/svg/star.svg';
import { Space } from '@mantine/core';
import Star from '../star/star';

export default function MovieCard({ info, genres }) {
  const [favorite, setFavorite] = useState(false);
  // console.log(info.id);

  const favoriteHandler = () => {
    // console.log('click');
    setFavorite(!favorite);
  };

  //получение названий жанров из списка id отдельного фильма
  let genreTitles = info.genre_ids
    .map((genID) => genres.find((obj) => obj.id === genID))
    .map((val) => val?.name || '')
    .join(', ');

  return (
    <div className="movie-card">
      <img className="movie-image" src={`https://image.tmdb.org/t/p/original/${info.poster_path}`} alt={`${info.original_title} poster`} />
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
