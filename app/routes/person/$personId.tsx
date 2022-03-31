import React from "react";
import { Link, LoaderFunction, useLoaderData } from "remix";
import { MovieCast, Person } from "~/types";
import { createApiUrl, createImageUrl } from "~/utils";

type LoaderData = {
  person: Person;
  movies: MovieCast[];
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const promises = [
    fetch(createApiUrl(`/person/${params.personId}`)).then((res) => res.json()),
    fetch(createApiUrl(`/person/${params.personId}/movie_credits`)).then(
      (res) => res.json()
    ),
  ];

  const [person, movieCredits] = await Promise.all(promises);

  return {
    person,
    movies: movieCredits.cast.slice(0, 8),
  };
};

const PersonDetail = () => {
  const { person, movies } = useLoaderData<LoaderData>();

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl">{person.name}</h1>
          <h3 className="mt-4 text-lg leading-7">{person.biography}</h3>
          <div>
            <h2 className="text-3xl my-4">Movies</h2>
            <div className="grid gap-4 grid-cols-4">
              {movies.map((movie) => (
                <div key={movie.id} className="border-4 border-primary p-2">
                  <figure>
                    <img
                      className="w-4/5 mx-auto"
                      alt={movie.title}
                      src={createImageUrl(movie.poster_path)}
                    />
                  </figure>
                  <Link
                    to={`/movies/${movie.id}`}
                    className="font-bold my-1 text-center block hover:underline"
                  >
                    {movie.title}{" "}
                    {movie.release_date
                      ? `(${new Date(movie.release_date).getFullYear()})`
                      : null}
                  </Link>
                  <p className="text-sm text-gray-400 text-center">
                    {movie.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <figure>
            <img
              className="border-4 border-primary"
              alt={person.name}
              src={createImageUrl(person.profile_path, "w400")}
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
