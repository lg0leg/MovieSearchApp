import React from 'react';
import './movie.scss';
import { useParams } from 'react-router-dom';

export default function Movie() {
  const { id } = useParams();
  return <div>movie id: {id}</div>;
}
