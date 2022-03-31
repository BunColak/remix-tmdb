import React from "react";
import { Link } from "remix";
import { PersonOverview } from "~/types";
import { createImageUrl } from "~/utils";

type PersonGridItemProps = {
  person: PersonOverview;
};

const PersonGridItem: React.FC<PersonGridItemProps> = ({ person }) => {
  return (
    <div className="shadow bg-gray-700 rounded-sm p-4 border-4 border-primary">
      <Link className="block" to={`/person/${person.id}`}>
        <figure>
          <img
            className="w-4/5 mx-auto"
            src={createImageUrl(person.profile_path)}
            alt={person.name}
          />
        </figure>
      </Link>
      <Link
        to={`/person/${person.id}`}
        className="block text-center text-lg hover:underline mt-4"
      >
        {person.name}
      </Link>
      <ul>
        {person.known_for.map((known) => (
          <li key={known.id} className="text-sm text-primary mt-2">
            <Link to={`/movies/${known.id}`}>{known.name || known.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonGridItem;
