import React from "react";
import { Form, useSearchParams, useSubmit } from "remix";
import { Genre } from "~/types";

type GenreFilterProps = {
  genres: Genre[];
};

const GenreFilter: React.FC<GenreFilterProps> = ({ genres }) => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();

  return (
    <div>
      <Form
        action="/genres"
        method="get"
        onChange={(e) => submit(e.currentTarget)}
      >
        <select className="p-2 border-primary border-2 bg-transparent" name="genreId" defaultValue={searchParams.get("genreId")!}>
          {genres.map((genre) => (
            <option className="bg-slate-800" key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </Form>
    </div>
  );
};

export default GenreFilter;
