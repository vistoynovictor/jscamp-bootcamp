import { useFavoritesStore } from "../../store/favoritesStore.js"
import { useAuthStore } from "../../store/authStore.js"
import snarkdown from 'snarkdown'

import { Link } from './Link.jsx'

import styles from '../../pages/Detail.module.css'

export function DetailPageBreadcrum({job}){
    return(
        <nav className={styles.empleosRoute} aria-label="Ruta de navegación">
            <Link href='/search'>Empleos</Link>
            <span> / </span>
            <span aria-current='page'>{job.titulo}</span>
        </nav>
    )
}

export function DetailApplyButton(){

    const {isLoggedIn} = useAuthStore()

    return <button
            disabled={!isLoggedIn}
            className="btn-std">
                {isLoggedIn ? 'Aplicar ahora' : 'Inicia sesión para aplicar'}
        </button>
}

export function DetailFavoritesButton({id}){
    /* Vamos a habilitar o deshabilitar el botón de favoritos dependiendo si el usuario está autenticado o no */
    const {isLoggedIn} = useAuthStore()
    const {isFavorite, toggleFavorite} = useFavoritesStore()
    const btnFav = isFavorite(id) ? styles.btnFavorite : ''

    return(
        <button 
            disabled={!isLoggedIn}
            className={`btn-std ${btnFav}`}
            onClick={() => toggleFavorite(id)}>
            {
                isFavorite(id) ? '💙' : '🤍'
            }
        </button>
    )
}

export function DetailPageHeader({job}){

    return(
        <header>
            <section>
                <h1>{job.titulo}</h1>
                <section>
                    <small>{job.empresa}</small>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7l5 5l-5 5" /><path d="M13 7l5 5l-5 5" /></svg>
                    <small>{job.ubicacion}</small>
                </section>
            </section>

            <DetailApplyButton/> 
            <DetailFavoritesButton id={job.id}/>

        </header>
    )
}

export function JobdDetailCard({title, content}){
    const html = snarkdown(content)

    return(
        <section>
            <h2>{title}</h2>
            <div dangerouslySetInnerHTML={{__html:html}}/>
        </section>
    )
}
