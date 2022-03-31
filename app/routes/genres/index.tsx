import React from "react";
import { LoaderFunction, useLoaderData } from "remix";
import GenreFilter from "~/components/GenreFilter";
import MovieGridItem from "~/components/MovieGridItem";
import { Genre, GenreOverviewResult, PaginatedResult } from "~/types";
import { createApiUrl } from "~/utils";

type LoaderData = {
  movies: PaginatedResult<GenreOverviewResult>;
  genres: Genre[];
};

export const handle = { hydrate: true };

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const url = new URL(request.url);

  let genreId = Number(url.searchParams.get("genreId"));

  if (!genreId) {
    throw new Response("No Genre Id provided", {
      status: 302,
      headers: { Location: `/genres?genreId=12` },
    });
  }

  const promises = [
    fetch(
      createApiUrl("/discover/movie", {
        sort_by: "popularity.desc",
        with_genres: genreId,
      })
    ).then((res) => res.json()),
    fetch(createApiUrl("/genre/movie/list")).then((res) => res.json()),
  ];
  const [movies, genresResponse] = await Promise.all(promises);

  return { movies, genres: genresResponse.genres };
};

const GenresIndex = () => {
  const { movies, genres } = useLoaderData<LoaderData>();  

  return (
    <div className="p-4">
      <GenreFilter genres={genres} />
      <div className="mt-4 grid gap-4 grid-cols-5 my-4">
        {movies.results.map((movie) => (
          <MovieGridItem movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default GenresIndex;
