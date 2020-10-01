import { useState } from 'react';
import useSWR from 'swr';
import useCatService from '../hooks/useCatService';

export default function Cats() {
  const catService = useCatService();
  const [page, setPage] = useState(1);
  
  const { data, error } = catService.allBreeds(1, page);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return <ul>
    {data.map(x =>
      <li>{x.name}</li>
    )}
    <button onClick={() => setPage(page + 1)}>Next</button>
  </ul>
}