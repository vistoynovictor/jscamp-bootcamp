import { RegisterPageFormTextField } from '../assets/components/RegisterPageFormTextField.jsx'
import styles from './Register.module.css'

export default function RegisterPage(){
    return(
        <article className={styles.container}>
            <h1 className={styles.registerTitles}>Bienvenido a DevJobs</h1>
            <h2 className={styles.registerTitles}>Estás a un paso de descubrir miles de oportunidades</h2>

            <form>

                <article>

                    <RegisterPageFormTextField label='Nombre' autoComplete='name' placeholder='Nombre Apellidos' />
                    <RegisterPageFormTextField label='Correo electrónico' type='email' placeholder='Email'/>
                    <RegisterPageFormTextField label='Ubicación' placeholder='Ciudad' />
                    <RegisterPageFormTextField label='Contraseña' type='password' placeholder='Nueva contraseña' />
                    <RegisterPageFormTextField label='Contraseña' type='password' placeholder='Repetir contraseña' />

                </article>

                <button className={`btn-std ${styles.saveChangesButton}`} >Guardar cambios</button>

            </form>
        </article>
    )
}
