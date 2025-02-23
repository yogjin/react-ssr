import React from 'react';
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TMDB_BANNER_URL } from '../../client/constant';
import { renderToString } from 'react-dom/server';
import App from '../../client/App';
import Header from '../../client/components/Header';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
  },
};

// 1. 루트 경로로 route 호출
router.get('/', async (_, res) => {
  // 2. index.html 파일 가져오기
  const templatePath = path.join(__dirname, '../../../views', 'index.html');
  const template = fs.readFileSync(templatePath, 'utf-8');

  // 3. 인기 영화 데이터 가져오기
  const movies = await fetch(
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
    options
  ).then((res) => res.json());
  const bestMovie = movies.results[0];

  // 4. App 컴포넌트를 리엑트에서 쓸 수 있는 형태의 string으로 변환
  const renderedHeader = renderToString(
    <Header
      imageUrl={TMDB_BANNER_URL + bestMovie.backdrop_path}
      rate={bestMovie.vote_average}
      title={bestMovie.title}
    />
  );
  const renderedApp = renderToString(<App movies={movies} />);

  const renderedHTML = template
    .replace('<!--${HEADER_PLACEHOLDER}-->', renderedHeader)
    .replace('<!--${MOVIE_ITEMS_PLACEHOLDER}-->', renderedApp);

  res.send(renderedHTML);
});

export default router;
