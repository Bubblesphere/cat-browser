import fs from 'fs';

export type Breed = {
  id: string;
  name: string;
  description: string;
  temperament: string;
  lifeSpan: string;
  origin: string;
  weightImperial: string;
  weightMetric: string;
  imagesId: string[];
};

export type BreedLandingPage = {
  id: string;
  name: string;
  imageId: string;
};

export const getLandingPageBreedData = (): BreedLandingPage[] => {
  return getBreedsData().map((x) => ({
    id: x.id,
    name: x.name,
    imageId: x.imagesId[0]
  }));
};

export const getDetailPageBreedData = (id: string): Breed => {
  return getBreedsData().filter((x) => x.id === id)[0];
};

export const getBreedIds = (): string[] => {
  return getBreedsData().map((x) => x.id);
};

const getBreedsData = (): Breed[] => {
  const rawBreeds = fs.readFileSync('./pages/api/breeds.json', 'utf-8');
  return JSON.parse(rawBreeds) as Breed[];
};
