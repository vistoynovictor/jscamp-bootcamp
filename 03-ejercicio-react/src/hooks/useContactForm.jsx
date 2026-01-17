import { useState, useEffect } from "react"

export function useContactForm({nameId, emailId, messageId}){
    const [fieldContent, setFieldContent] = useState(
        {
                name: '',
                email: '',
                message: ''
        }) 

    const [confirmMessage, setConfirmMessage] = useState('')

    const [sending, setSending] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        const param = new URLSearchParams()
        
        setSending(false)

        const formData = new FormData(e.currentTarget)

        const formValues = {
            name: formData.get(nameId),
            email: formData.get(emailId),
            message: formData.get(messageId)
        }

        setFieldContent(formValues)

        setSending(true)

        e.target.reset()
    }
    
    useEffect(() => {
        if(!sending) return

        const timer = setTimeout(() => {
            setSending(false)
        }, 2000)

        setConfirmMessage(<h3>Mensaje enviado con exito</h3>)

        const message = setTimeout(() =>{
            setConfirmMessage('')
        }, 6000)

        return () => clearTimeout(timer, message)
 
    }, [sending, fieldContent])

    

    return { handleSubmit, sending, confirmMessage}
}             
