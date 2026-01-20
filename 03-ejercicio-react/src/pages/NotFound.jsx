import styles from './NotFound.module.css'

export function NotFoundPage (){
    return(
        <>
        <h1 className={styles.notFound}>404 - Page Not Found</h1>
        <h2 className={styles.notFound}>-- This page doesn't exist --</h2>
        </>
    )
} 
