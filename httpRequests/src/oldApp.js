import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);


  // or async / await could be used
  const  fetchMoviesHandler = useCallback(async () => {

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('https://swapi.dev/api/films/');

      // check this before parsing
      if (!response.ok) {
        throw new Error('Something went wrong :(')
      }

      const data = await response.json();

      const transfromedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(transfromedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);

    // fetch('https://swapi.dev/api/films/').then(response => {
    //   return response.json();
    // }).then(data => {
    //   const newMovies = data.results.map(movieData => {
    //     return {
    //       id: movieData.episode_id,
    //       title: movieData.title,
    //       openingText: movieData.opening_crawl,
    //       releaseDate: movieData.release_date,
    //     }
    //   })
    //   setMovies(newMovies);
    //   setIsLoading(false);
    // }).catch(

    // );
  }, [
    // no dependencies added here
  ]);
  useEffect(() => {
    fetchMoviesHandler();
  }, [
    fetchMoviesHandler, // it is good to list the function as dependency, if it uses external state
  ])

  let content = <p>Found no movies :( </p>;

  if (movies.length > 0) {
    content= <MoviesList movies={movies} />
  }

  if (error) {
    <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading data ...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies :( </p>}

        {isLoading && <p>Loading data ...</p>}
        {!isLoading && error && <p>{error}</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
