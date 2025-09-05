import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('драма');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [filterGenre, setFilterGenre] = useState('все');
  const [sortOrder, setSortOrder] = useState('по убыванию');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const newMovie = {
      id: Date.now(),
      title,
      genre,
      rating,
      review,
      date: new Date().toLocaleDateString('ru-RU')
    };
    
    setMovies([...movies, newMovie]);
    setTitle('');
    setGenre('драма');
    setRating(5);
    setReview('');
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const filteredMovies = movies.filter(movie => 
    filterGenre === 'все' || movie.genre === filterGenre
  );

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    return sortOrder === 'по убыванию' ? b.rating - a.rating : a.rating - b.rating;
  });

  return (
    <div className="app">
      <header>
        <h1>КиноОТВладосика</h1>
        <p>Отслеживайте просмотренные фильмы</p>
      </header>

      <div className="container">
        <div className="form-section">
          <h2>Добавить фильм</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Название: </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Название фильма"
              />
            </div>

            <div>
              <label>Жанр: </label>
              <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="драма">Драма</option>
                <option value="комедия">Комедия</option>
                <option value="боевик">Боевик</option>
                <option value="триллер">Триллер</option>
                <option value="фантастика">Фантастика</option>
                <option value="ужасы">Ужасы</option>
                <option value="документальный">Документальный</option>
                <option value="другое">Другое</option>
              </select>
            </div>

            <div>
              <label>Оценка: {rating}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label>Обзор</label>
              <br />
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="5"
                maxLength="500"
                placeholder="Ваши впечатления (до 500 символов)"
              />
              <div>{review.length}/500</div>
            </div>

            <button type="submit">Добавить</button>
          </form>
        </div>
 <br /> <br />
        <div className="movies-section">
          <div className="controls">
            <div>
              <label>Фильтр:</label>
              <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
                <option value="все">Все</option>
                <option value="драма">Драма</option>
                <option value="комедия">Комедия</option>
                <option value="боевик">Боевик</option>
                <option value="триллер">Триллер</option>
                <option value="фантастика">Фантастика</option>
                <option value="ужасы">Ужасы</option>
                <option value="документальный">Документальный</option>
                <option value="другое">Другое</option>
              </select>
            </div>

            <div>
              <label>Сортировка:</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="по убыванию">Высокие > Низкие</option>
                <option value="по возрастанию">Низкие > Высокие</option>
              </select>
            </div>
          </div>

          <h2>Мои фильмы ({sortedMovies.length})</h2>

          {sortedMovies.length === 0 ? (
            <p>Фильмов пока нет.</p>
          ) : (
            <div className="movies-grid">
              {sortedMovies.map(movie => (
                <div key={movie.id} className="movie-card">
                  <button onClick={() => deleteMovie(movie.id)}>×</button>
                  <h3>{movie.title}</h3>
                  <div>{movie.genre}</div>
                  <div className={`rating rating-${movie.rating}`}>{movie.rating}</div>
                  <div>{movie.date}</div>
                  <p>
                    {movie.review.length > 100 
                      ? `${movie.review.substring(0, 100)}...` 
                      : movie.review || <span>Обзора нет</span>}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;