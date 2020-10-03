import React, { useState } from 'react'
import useCatService from '../hooks/useCatService';
import Link from 'next/link'

export default function Home() {
  const catService = useCatService();  
  const [page, setPage] = useState(1);

  const { data, error } = catService.allBreeds(10, page);
    
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>      
      {data.map(x => {
        return <Link href={`breed/${encodeURIComponent(x.id)}`}>{x.name}</Link>
      })}
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  ) 
}

