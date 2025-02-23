import Home from './components/Home';
import { Movies } from './components/Home';

function App({ movies }: { movies: Movies }) {
  return (
    <ul className="thumbnail-list">
      <Home movies={movies} />
    </ul>
  );
}

export default App;
