import styles from './Spinner.module.css' 

export function Spinner({loadTarget = 'resultados'}){
    return (
        <>
            <div className={styles.spinner}></div>
            <p className={styles.message}>Cargando {loadTarget}</p>
        </>
    )
}
