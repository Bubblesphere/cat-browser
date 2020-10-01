import { useState } from 'react';
import useSWR from 'swr';

const fetcher = url => fetch(url, {
    headers: {
        'x-api-key': process.env.CAT_API_KEY
    }
}).then(r => r.json())

export default function Playlists() {
    const [page, setPage] = useState(1);
    const breeds = (limit, page) => `https://api.thecatapi.com/v1/breeds?limit=${limit}&page=${page}`;
    const { data, error } = useSWR(breeds(1, page), fetcher);

    if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log(data);
  return <ul>
      {data.map(x => 
          <li>{x.name}</li>
      )}
      <button onClick={() => setPage(page+1)}>Next</button>
  </ul>
}