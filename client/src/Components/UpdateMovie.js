import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UpdateMovie = props => {
  const { id } = useParams();
  const { push } = useHistory();

  const initialMovieState = {
    title: "",
    director: "",
    metascore: "",
    stars: [""]
  };

  const [movie, setMovie] = useState(initialMovieState);

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    console.log(props.movieList);
    const movieToUpdate = props.movieList.find(e => `${e.id}` === id);
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movieList, id]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`Shttp://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        // console.log(res.data);
        props.setMovieList(res.data);
        push("/movies");
      })
      .catch(err => console.log("you messed up the axios put", err));
  };

  return (
    <div>
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={movie.title}
        />

        <label>Director</label>
        <input
          type="text"
          name="director"
          onChange={handleChange}
          value={movie.director}
        />

        <label>MetaScore</label>
        <input
          type="number"
          name="metascore"
          onChange={handleChange}
          value={movie.metascore}
        />

        <label>Stars</label>
        <input
          type="text"
          name="stars"
          onChange={handleChange}
          value={movie.stars}
        />
        <button>Submit Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
