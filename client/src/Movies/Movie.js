import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const Movie = props => {
  console.log(props);
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { push } = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const deleteMovie = (e, id) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        props.setMovieList(res.data);
        push("/movies");
      })
      .catch(err => console.log("delete messed up", err));
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button className="save-button" onClick={deleteMovie}>
        Delete
      </button>
      <Link to={`/update-movie/${match.params.id}`}>Update Movies</Link>
    </div>
  );
};

export default Movie;
