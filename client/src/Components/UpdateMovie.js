import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const initialMovieState = {
  title: "",
  director: "",
  metascore: "",
  stars: [""]
};

const UpdateMovie = props => {
  const { id } = useParams();
  const { push } = useHistory();
  const [movie, setMovie] = useState(initialMovieState);

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    console.log(props.savedList);
    const movieToUpdate = props.savedList.find(e => {
      `${e.id}===id`;
    });
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.savedList, id]);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <p>wow</p>
    </div>
  );
};

export default UpdateMovie;
