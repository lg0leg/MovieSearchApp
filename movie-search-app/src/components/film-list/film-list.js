import React from 'react';
import './film-list.scss';
import MovieCard from '../movie-card/movie-card';

export default function FilmList({ moviesInfo, genresList }) {
  // console.log(moviesInfo);

  return (
    <div className="movies-container">
      {moviesInfo.map((item, idx) => (
        <MovieCard key={idx} info={item} genres={genresList}></MovieCard>
      ))}
    </div>
  );
}
