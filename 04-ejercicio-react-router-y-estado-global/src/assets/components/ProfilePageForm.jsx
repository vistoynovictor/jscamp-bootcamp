import styles from './Profile.module.css'

export function Form(){
    const skillsList = ['javascript', 'react', 'node.js', 'html', 'css']

    return(
            <form>

            <article>

                <h3>Información personal</h3>

                <ProfilePageFormTextField label='Nombre' autoComplete='name' placeholder='Nombre Apellidos' />
                <ProfilePageFormTextField label='Correo electrónico' type='email' placeholder='Email'/>
                <ProfilePageFormTextField label='Ubicación' placeholder='Ciudad' />

                <label className={styles.textareaLabel}>Sobre mí
                    <textarea 
                        placeholder='¿Que pude resultarle a otros interesante sobre tí? Haz que puedan conocerte un poco'
                        rows='8'
                        required/>
                </label>

            </article>
            

            <article>

                <h3>Experiencia</h3>

                <ProfilePageFormTextField label='Cargo' autoComplete='organization-title' placeholder='¿Cual es tu puesto?' />
                <ProfilePageFormTextField label='Empresa' autoComplete='organization'  placeholder='¿Donde trabajas?'/>
                <ProfilePageFormTextField label='Años de experiencia' type='number' placeholder='nº años' />

            </article>            
            
            <article>
                
                <h3>Habilidades</h3>
                <ProfilePageFormSkills skillsList={skillsList} /> 

            </article>
            
            <article>
                <h3>CV</h3>

                <div className={styles.dropFile}>

                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cloud-upload">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                        <path d="M9 15l3 -3l3 3" />
                        <path d="M12 12l0 9" />
                    </svg> 

                    <p><strong>Sube tu CV</strong> o arrastra y suelta</p>
                    <small>PDF, DOC, DOCX (MAX 5MB)</small>
                </div>

            </article>
                        
            <button className={`btn-std ${styles.saveChangesButton}`} >Guardar cambios</button>

        </form> 
    )
}

function ProfilePageFormTextField({label = '', type = 'text', placeholder = 'Escriba aquí', required = true, autoComplete = 'on'}){
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

function ProfilePageFormSkills({skillsList}){
    const capitalizationExceptions = {
        'html': 'HTML',
        'css': 'CSS'
    }

    return (
        <section className={styles.skillsList}>
            {
                skillsList.map(skill => {
                    return (
                        <button key={skill} onClick={e => e.preventDefault()}>
                            {
                                capitalizationExceptions[skill]
                                    ? capitalizationExceptions[skill]
                                    : skill.charAt(0).toUpperCase() + skill.slice(1)
                            }
                        </button>
                    )
                })
            } 
        </section>
    )
}
