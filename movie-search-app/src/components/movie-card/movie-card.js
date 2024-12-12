import React, { useContext, useEffect, useState } from 'react';
import './movie-card.scss';
import star from '../../assets/svg/star.svg';
import noPoster from '../../assets/png/noPoster.png';
import { Button, Modal, Rating, Space } from '@mantine/core';
import Star from '../star/star';
import { FavContext } from '../../state/state';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ info, genres }) {
  const favContext = useContext(FavContext);
  const navigate = useNavigate();
  const moviePath = `/movies/:${info.id}`;

  const [favorite, setFavorite] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [rating, setRating] = useState(0);

  const checkFavorites = () => {
    if (favContext.favState.favoritesId.includes(info.id)) {
      setFavorite(true);
      setRating(favContext.favState.favoritesRating.find((el) => el.itemId === info.id).itemRating);
    }
  };
  useEffect(checkFavorites, []);

  const addItemToFavorites = () => {
    const rt = { itemId: info.id, itemRating: rating };
    if (!favContext.favState.favoritesId.includes(info.id)) {
      setFavorite(true);
      favContext.favDispatch({ type: 'ADD_ID_TO_FAVORITES', payload: info.id });
      favContext.favDispatch({ type: 'ADD_ITEM_TO_FAVORITES', payload: info });
      favContext.favDispatch({ type: 'SET_RATING_FOR_ITEM', payload: rt });
    } else {
      //обновление уже существующей оценки
      favContext.favDispatch({ type: 'REMOVE_RATING_FROM_ITEM', payload: info.id });
      favContext.favDispatch({ type: 'SET_RATING_FOR_ITEM', payload: rt });
    }
  };

  const removeItemFromFavorites = () => {
    setFavorite(false);
    setRating(0);
    favContext.favDispatch({ type: 'REMOVE_ID_FROM_FAVORITES', payload: info.id });
    favContext.favDispatch({ type: 'REMOVE_ITEM_FROM_FAVORITES', payload: info.id });
    favContext.favDispatch({ type: 'REMOVE_RATING_FROM_ITEM', payload: info.id });
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
        <Button variant="filled" color="#9854f6" onClick={addItemToFavorites}>
          Save
        </Button>
        <Button variant="transparent" color="#9854f6" onClick={removeItemFromFavorites}>
          Remove rating
        </Button>
      </Modal>
      <div
        className="movie-card"
        onClick={() => {
          navigate(moviePath);
        }}
      >
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
        <div
          className="movie-star"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
        >
          <Star favorite={favorite} />
        </div>
      </div>
    </>
  );
}
