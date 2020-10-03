import useCatService from "../hooks/useCatService";
import styles from '../styles/CatGallery.module.css'

export function CatGallery(props) {
    const catService = useCatService();
    const { data, error } = catService.getBreed(props.breedId, 4, 1);
  
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
  
    return <ul>{data.map(x => <li><img src={x.url} className={styles.image}/></li>)}</ul>
  }