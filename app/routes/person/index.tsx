import React from "react";
import { LoaderFunction, useLoaderData } from "remix";
import PersonGridItem from "~/components/PersonGridItem";
import { PaginatedResult, PersonOverview } from "~/types";
import { createApiUrl } from "~/utils";

type LoaderData = {
  people: PaginatedResult<PersonOverview>;
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const people = await fetch(createApiUrl("/person/popular")).then((res) =>
    res.json()
  );

  return { people };
};

const PeopleIndex = () => {
  const { people } = useLoaderData<LoaderData>();

  return (
    <div className="grid gap-4 grid-cols-5 p-4">
      {people.results.map((person) => (
        <PersonGridItem key={person.id} person={person} />
      ))}
    </div>
  );
};

export default PeopleIndex;
