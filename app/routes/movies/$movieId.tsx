import React from "react";
import { LoaderFunction, useLoaderData } from "remix";
import MovieDetailCast from "~/components/MovieDetailCast";
import MovieDetailOverview from "~/components/MovieDetailOverview";
import { Cast, Movie } from "~/types";
import { createApiUrl, createImageUrl } from "~/utils";

type LoaderData = {
  movie: Movie;
  cast: Cast[];
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const promises = [
    fetch(createApiUrl(`/movie/${params.movieId}`)).then((res) => res.json()),
    fetch(createApiUrl(`/movie/${params.movieId}/credits`)).then((res) =>
      res.json()
    ),
  ];

  const [movie, credits] = await Promise.all(promises);

  return { movie, cast: (credits.cast as Cast[]).slice(0, 8) };
};

const MovieDetail = () => {
  const { movie, cast } = useLoaderData<LoaderData>();

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <MovieDetailOverview movie={movie} />
          <MovieDetailCast cast={cast} />
        </div>
        <figure>
          <img
            className="border-4 border-primary"
            alt={movie.title}
            src={createImageUrl(movie.poster_path, "w400")}
          />
        </figure>
      </div>
    </div>
  );
};

export default MovieDetail;
