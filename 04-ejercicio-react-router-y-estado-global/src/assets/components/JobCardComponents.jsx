import { useState } from "react";
import { useFavoritesStore } from "../../store/favoritesStore.js";
import { useAuthStore } from "../../store/authStore.js";

import styles from './JobCard.module.css'

export function JobCardFavoriteButton({jobId}){

    const { toggleFavorite, isFavorite} = useFavoritesStore()
    const { isLoggedIn } = useAuthStore()

    const btnFav = isFavorite(jobId) ? styles.btnFavorite : ''

    return(
        <button 
            disabled={!isLoggedIn}
            className={`btn-std ${btnFav}`}
            onClick={() => toggleFavorite(jobId)}>
            {
                isFavorite(jobId) ? '💙' : '🤍'
            }
        </button>
    )
}

export function JobCardApplyButton(){

    const [isApplied,setIsApplied] = useState(false)
    const { isLoggedIn } = useAuthStore()

    const btnText= isApplied ? 'Aplicado' : 'Aplicar';
    const btnClass = isApplied ? styles.btnApplied : '';

    function handleClick() {
        setIsApplied(!isApplied);
    }

    return (
        <button
            disabled={!isLoggedIn}
            className={`btn-std ${btnClass}`}
            onClick={handleClick}>
            {btnText}
        </button>

    )
}
