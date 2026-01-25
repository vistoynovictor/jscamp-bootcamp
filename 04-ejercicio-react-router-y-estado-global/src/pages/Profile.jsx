import { Form } from '../assets/components/ProfilePageForm.jsx'
import styles from './Profile.module.css'

export default function ProfilePage(){
    
    return(
        <article className={styles.container}>

            <h1>Mi perfil</h1>
            <h2>Actualiza tu información personal y profesional</h2>

            <Form/>

        </article>    
    )
}
