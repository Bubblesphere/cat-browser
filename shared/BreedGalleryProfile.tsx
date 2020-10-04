import { Breed } from "../pages/api/breeds";


export default function BreedGalleryProfile({breed} : { breed: Breed}) {
    return <div>
      <h1>{breed.name}</h1>
      
  </div>
}