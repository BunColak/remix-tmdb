import React from "react";
import { Link } from "remix";
import { Movie } from "~/types";

type MovieDetailOverviewProps = {
  movie: Movie;
};

const MovieDetailOverview: React.FC<MovieDetailOverviewProps> = ({ movie }) => {
  return (
    <div>
      <h1 className="text-4xl">
        {movie.title} ({new Date(movie.release_date).getFullYear()})
      </h1>
      <div className="flex">
        {movie.genres?.map((genre) => (
          <Link
            to={`/genres/${genre.id}`}
            key={genre.id}
            className="rounded-full bg-gray-500 mr-2 my-2 px-2 hover:bg-gray-600"
          >
            {genre.name}
          </Link>
        ))}
      </div>
      <h2 className="my-2 text-lg text-gray-400">{movie.tagline}</h2>
      <div>
        <h3 className="text-xl">
          {[...Array(Math.floor(movie.vote_average / 2))].map((_, i) => (
            <p className="inline" key={i}>
              &#9733;
            </p>
          ))}{" "}
          {movie.vote_average}{" "}
          <span className="text-sm text-gray-500">({movie.vote_count})</span>
        </h3>
      </div>
      <h4 className="mt-4">{movie.overview}</h4>
    </div>
  );
};

export default MovieDetailOverview;
