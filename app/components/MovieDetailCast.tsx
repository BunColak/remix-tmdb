import React from "react";
import { Link } from "remix";
import { Cast } from "~/types";
import { createImageUrl } from "~/utils";

type MovieDetailCastProps = {
  cast: Cast[];
};

const MovieDetailCast: React.FC<MovieDetailCastProps> = ({ cast }) => {  
  return (
    <div>
      <h2 className="text-3xl my-4">Cast</h2>
      <div className="grid gap-4 grid-cols-4">
        {cast.map((person) => (
          <div key={person.id} className="border-4 border-primary p-2">
            <figure>
              <img
                className="w-4/5 mx-auto"
                alt={person.name}
                src={createImageUrl(person.profile_path)}
              />
            </figure>
            <Link
              to={`/person/${person.id}`}
              className="font-bold my-1 text-center block hover:underline"
            >
              {person.name}
            </Link>
            <h6 className="text-sm text-gray-400 text-center">
              {person.character}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailCast;
