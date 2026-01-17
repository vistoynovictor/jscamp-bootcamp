import styles from './Spinner.module.css' 

export function Spinner(){
    return (
        <>
            <div className={styles.spinner}></div>
            <p className={styles.message}>Cargando resultados</p>
        </>
    )
}
