import { useId } from "react"
import { useContactForm } from "../hooks/useContactForm"
import styles from './Contact.module.css'

export function ContactPage(){
    const nameId = useId()
    const emailId = useId()
    const messageId = useId()
    const submitId = useId()

    const { handleSubmit, sending, confirmMessage } = useContactForm({nameId, emailId, messageId, submitId})

    return(
            <>
            <h1>Contacto</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Cuentenos lo que necesite</h2>
                {confirmMessage}

                <input type="text" name={nameId} id={nameId} placeholder="Nombre" required autoComplete="name" autoCorrect="on"/>
                <input type="email" name={emailId} id={emailId} placeholder="Correo electrónico" required autoComplete="email"/>
                <textarea name={messageId} id={messageId} placeholder="Mensaje" required/>
                <button type="submit" className="btn-std" disabled={sending}>{ sending ? 'Enviando' : 'Enviar' }</button>
            </form>
            </>
    )
}
