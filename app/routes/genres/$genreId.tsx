import React from 'react'
import { LoaderFunction } from 'remix';

export const loader: LoaderFunction = ({params}) => {
    throw new Response('Redirect', {status: 301, headers: {'Location': `/genres?genreId=${params.genreId}`}})
};

const GenreDetail = () => {
  return (
    <div>Genre....</div>
  )
}

export default GenreDetail