import React from "react";
import { LoaderFunction, useLoaderData } from "remix";
import MovieGridItem from "~/components/MovieGridItem";
import { Movie, PaginatedResult } from "~/types";
import { createApiUrl } from "~/utils";

type LoaderData = {
  movies: PaginatedResult<Movie>;
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const url = createApiUrl("/movie/popular")
  const movies = await fetch(url).then((res) =>
    res.json()
  );
  return {
    movies,
  };
};

const Index = () => {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="p-4">
      <div className="grid gap-4 grid-cols-5">
        {data.movies.results.map((movie) => (
          <MovieGridItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Index;
