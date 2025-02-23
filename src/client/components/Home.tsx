import React from 'react';
import { TMDB_THUMBNAIL_URL } from '../constant';

export interface Movies {
  dates: Dates;
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Dates {
  maximum: string;
  minimum: string;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface HomeProps {
  movies: Movies;
}

const Home = ({ movies }: HomeProps) => {
  return (
    <>
      {movies.results.map((movie) => (
        <li key={movie.id} className="item">
          <img
            src={`${TMDB_THUMBNAIL_URL}${movie.poster_path}`}
            alt={movie.title}
            className="thumbnail"
          />
          <div className="item-desc">
            <div>{movie.title}</div>
            <p className="rate">
              <img src="../assets/images/star_empty.png" className="star" alt="rating" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </p>
          </div>
        </li>
      ))}
    </>
  );
};

export default Home;
