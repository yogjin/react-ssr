import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import Header from './components/Header';
console.log('로드 ~!!');

hydrateRoot(
  document.getElementById('header'),
  <Header imageUrl="" rate={0} title="하이하이 from client main.jsx" />
);

hydrateRoot(
  document.getElementById('movie-items'),
  <App
    movies={{
      dates: {
        maximum: '',
        minimum: '',
      },
      page: 0,
      results: [
        {
          id: 1,
          title: '하이하이',
          vote_average: 10,
          poster_path: 'https://image.tmdb.org/t/p/w500/1234567890',
        },
      ],
      total_pages: 0,
      total_results: 0,
    }}
  />
);
