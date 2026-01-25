import { useId } from 'react'
import { Link } from '../assets/components/Link.jsx'
import styles from './Login.module.css'

export default function LoginPage(){
    const checkboxId = useId()

    return(
        <>
            <h1 className={styles.loginTitles}>Bienvenido de nuevo</h1>
            <h2 className={styles.loginTitles}>Inicia sesión para encontrar tu próxima oportunidad</h2>
            <article className={styles.loginBox}>
                <div className={styles.textInput}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                        <path d="M3 7l9 6l9 -6" />
                    </svg>

                    <input type="email" placeholder='Email' required/>
                </div>                

                <div className={styles.textInput}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lock">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" />
                        <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                        <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                    </svg>

                    <input type="password" placeholder='Contraseña' required/>
                </div> 

                <section className={styles.lowerOptions}>
                    <label>
                        <input type='checkbox' id={checkboxId}/>
                        <span></span>
                        Recuérdame
                    </label>

                    <Link href='/'>¿Has olvidado tu contraseña?</Link>
                </section>

                <section className={styles.noAccount}>

                    <small>¿Aún no tienes cuenta?</small>

                    <div>
                        <Link href='/register'>
                            <button className='btn-std'>Registrate como desarrollador</button>
                        </Link>

                        <Link href='/register'>
                            <button className='btn-std'>Registrate como empresa</button>
                        </Link>
                    </div>
                    
                </section>
            </article>
        </>
    )
}
