import React, { useContext, useEffect, useState } from 'react';
import './movie-card.scss';
import star from '../../assets/svg/star.svg';
import noPoster from '../../assets/png/noPoster.png';
import { Button, Modal, Rating, Space } from '@mantine/core';
import Star from '../star/star';
import { FavContext } from '../../state/state';
import { useDisclosure } from '@mantine/hooks';

export default function MovieCard({ info, genres }) {
  const favContext = useContext(FavContext);

  const [favorite, setFavorite] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [rating, setRating] = useState(0);

  const checkFavorites = () => {
    if (favContext.favState.favoritesId.includes(info.id)) {
      setFavorite(true);
    }
  };

  useEffect(checkFavorites, []);

  //добавление/удаление файлов в избранное. обновление localStorage происходит в App
  const favoriteHandler = () => {
    if (favContext.favState.favoritesId.includes(info.id)) {
      setFavorite(false);
      favContext.favDispatch({ type: 'REMOVE_ID_FROM_FAVORITES', payload: info.id });
      favContext.favDispatch({ type: 'REMOVE_ITEM_FROM_FAVORITES', payload: info.id });
    } else {
      setFavorite(true);
      favContext.favDispatch({ type: 'ADD_ID_TO_FAVORITES', payload: info.id });
      favContext.favDispatch({ type: 'ADD_ITEM_TO_FAVORITES', payload: info });
    }
  };

  //получение названий жанров из списка id отдельного фильма
  let genreTitles = genres
    ? info.genre_ids
        .map((genID) => genres.find((obj) => obj.id === genID))
        .map((val) => val?.name || '')
        .join(', ')
    : '';

  return (
    <>
      <Modal opened={opened} onClose={close} title="Your rating" radius="md" size="md" centered>
        <hr color="#eaebed" />
        <h3>{info.original_title}</h3>
        <Rating className="movie-star-gap" value={rating} onChange={setRating} count="10" size="xl" />
        <Space h={20} />
        <Button variant="filled" color="#9854f6">
          Save
        </Button>
        <Button variant="transparent" color="#9854f6">
          Remove rating
        </Button>
      </Modal>
      <div className="movie-card">
        {/* <img className="movie-image" src={`https://image.tmdb.org/t/p/original/${info.poster_path}`} alt={`${info.original_title} poster`} /> */}
        <img className="movie-image" src={noPoster} alt="noPoster" />
        <div className="movie-card-inner">
          <h2 className="movie-card-title">{info.original_title}</h2>
          <p>{info.release_date.slice(0, 4)}</p>
          <div className="movie-rating" onClick={open}>
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
    </>
  );
}
