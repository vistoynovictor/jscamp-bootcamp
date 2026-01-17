import { useId } from "react"
import { useContactForm } from "../hooks/useContactForm"

export function ContactPage(){
    const nameId = useId()
    const emailId = useId()
    const messageId = useId()
    const submitId = useId()

    const { handleSubmit, sending, confirmMessage } = useContactForm({nameId, emailId, messageId, submitId})

    return(
            <>
                <h1>Contacto</h1>
                <h2>Cuentenos lo que necesite</h2>
                {confirmMessage}
                <form onSubmit={handleSubmit}>
                    <input type="text" name={nameId} id={nameId} placeholder="Nombre" required autoComplete="name" autoCorrect="on"/>
                    <input type="email" name={emailId} id={emailId} placeholder="Correo electrónico" required autoComplete="email"/>
                    <textarea name={messageId} id={messageId} placeholder="Mensaje" required/>
                    <button type="submit" disabled={sending}>{ sending ? 'Enviando' : 'Enviar' }</button>
                </form>
            </>
    )
}
