import useSWR, { responseInterface } from "swr";

type Breed = {
  id: string,
  name: string,
  temperament: string,
  life_span: string,
  alt_names: string,
  wikipedia_url: string,
  origin: string,
  weight_imperial: string,
  experimental: number,
  hairless: number,
  natural: number,
  rare: number,
  rex: number,
  suppress_tail: number,
  short_legs: number,
  hypoallergenic: number,
  adaptability: number,
  affection_level: number,
  country_code: string,
  child_friendly: number,
  dog_friendly: number,
  grooming: number,
  health_issues: number,
  intelligence: number,
  shedding_level: number,
  social_needs: number,
  stranger_friendly: number,
  vocalisation: number
}

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

    const allBreeds = (limit: number, page: number) => useSWR(
      allBreedsSchema.url(limit, page), 
      allBreedsSchema.fetcher
    ) as responseInterface<Breed[], any> 

    return {
      allBreeds
    }
}