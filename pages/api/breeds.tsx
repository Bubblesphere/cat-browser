// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fetcher = url => fetch(url, {
    headers: {
      'x-api-key': process.env.CAT_API_KEY
    }
  }).then(r => r.json())
  
  const allBreeds = {
    url: (limit, page) => `https://api.thecatapi.com/v1/breeds?limit=${limit}&page=${page}`,
    fetcher: fetcher
  };
  
  type ImageSize = "full" | "med" | "small" | "thumb";

  const searchImages = {
    url: (size: ImageSize, limit, page, breed_id) => 
      `https://api.thecatapi.com/v1/images/search?size=${size}&order=DESC&limit=${limit}&page=${page}&breed_id=${breed_id}`,
    fetcher: fetcher
  }

  export const GetBreedIds = async () => {
    const breeds: Breed[] = await allBreeds.fetcher(allBreeds.url(80, 0));

    return breeds.map(x => x.id);
  }

  export const GetBreed = async (breedId: string) => {
    const breed: SearchImage[] = await searchImages.fetcher(searchImages.url("thumb", 1,0, breedId));
    
    return breed[0].breeds[0];
  }
  
  export const GetBreedWithImages = async (breedId: string, imageSize: ImageSize, limit: number, page: number) => {
    const breed: SearchImage[] = await searchImages.fetcher(searchImages.url(imageSize, limit, page, breedId));

    const breedWithImages: BreedWithImages = {
        ...breed[0].breeds[0],
        images: breed.map(y => ({
          height: y.height,
          width: y.width,
          id: y.id,
          url: y.url
        }))
    }

    return breedWithImages;
  }

  /*export default async (req, res) => {
    const breeds: Breed[] = await allBreeds.fetcher(allBreeds.url(30, 1));
  
    res.statusCode = 200
    res.json(breeds.map(x => x.id)) 
  }*/

  export type BreedWithImages = Breed & {
    images: Array<Image>
  }

  export type Image = {
    height: number,
    id: string,
    url: string,
    width: number
  }
  
  export type SearchImage = {
    breeds: Breed[];
  } & Image

  export type Breed = {
    id: string,
    name: string,
    description: string,
    temperament: string,
    life_span: string,
    alt_names: string,
    wikipedia_url: string,
    origin: string,
    weight: {
      imperial: string,
      metric: string
    },
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