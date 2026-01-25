export function RegisterPageFormTextField({label = '', type = 'text', placeholder = 'Escriba aquí', required = true, autoComplete = 'on'}){
    return(
        <label>{label}
            <input 
                type={type}
                placeholder={placeholder}
                required={required ? 'required' : false}
                autoComplete={autoComplete}/>
        </label>

    )
}
