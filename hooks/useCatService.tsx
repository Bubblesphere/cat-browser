import useSWR from "swr";

export default function useCatService()  {
    const fetcher = url => fetch(url, {
      headers: {
        'x-api-key': process.env.CAT_API_KEY
      }
    }).then(r => r.json())
  
    const allBreedsSchema = {
      url: (limit, page) => `https://api.thecatapi.com/v1/breeds?limit=${limit}&page=${page}`,
      fetcher: fetcher
    };

    const allBreeds = (limit, page) => useSWR(
      allBreedsSchema.url(limit, page), 
      allBreedsSchema.fetcher
    );

    return {
      allBreeds
    }
}