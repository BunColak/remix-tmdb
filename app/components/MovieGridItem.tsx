import React from "react";
import { Link } from "remix";
import { Movie } from "~/types";
import { createImageUrl } from "~/utils";

type MovieGridItemProps = {
  movie: Pick<Movie, 'id' | 'title' | 'poster_path' | 'release_date' | 'vote_average' | 'overview'>;
};

const MovieGridItem: React.FC<MovieGridItemProps> = ({ movie }) => {
  return (
    <div className="shadow bg-gray-700 rounded-sm p-4 border-4 border-primary">
      <Link className="block" to={`/movies/${movie.id}`}>
        <figure>
          <img
            className="w-4/5 mx-auto"
            src={createImageUrl(movie.poster_path)}
            alt={movie.title}
          />
        </figure>
      </Link>
      <Link
        to={`/movies/${movie.id}`}
        className="block text-center text-lg hover:underline mt-4"
      >
        {movie.title} ({new Date(movie.release_date).getFullYear()})
      </Link>
      <p className="text-center text-sm mt-2">{movie.vote_average}/10</p>
      <p className="text-sm text-gray-400 mt-4">{movie.overview}</p>
    </div>
  );
};

export default MovieGridItem;
