import { useId, useRef } from 'react';
import { useState } from 'react';

import { useSearch } from '../../hooks/useSearch';
import styles from './Filters.module.css';

export function Filters ({initialValues, filterActive, OnSearch, handleClearFilters}) {

    const techId = useId();
    const locationId = useId();
    const expLevelId = useId();
    const txtSearchId = useId();
    
    const techRef = useRef()
    const locationRef = useRef()
    const expLevelRef = useRef()
    const txtSearchRef = useRef()

    const [focusedField, setFocusField] = useState(null);

    const { handleSubmit } = useSearch({ techId, locationId, expLevelId, txtSearchId, OnSearch })

    return(
        <form role="search" className={styles.employmentSearch} onChange={handleSubmit} >
            <div onFocus={() => setFocusField('search')} onBlur={() => setFocusField(null)} className={focusedField === 'search' ? styles.onFocus : ''}>
                <svg aria-hidden="True" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /> <path d="M21 21l-6 -6" /></svg>
                <input 
                    ref={txtSearchRef}
                    defaultValue={initialValues.txtSearch} 
                    name={txtSearchId} 
                    type="text" 
                    placeholder="Buscar empleo por titulo, habilidad o empresa"
                    onKeyDown={e => {
                        if (e.key === 'Enter'){
                            e.preventDefault()
                            techRef.current.focus()
                        }
                    }}
                />
            </div>

            <article className={styles.filterBar}>
                <select ref={techRef} defaultValue={initialValues.tech} name={techId} id={techId}>
                    <option value="">Tecnologías</option>
                    <option value="html">HTML</option>
                    <option value="node">Node.js</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                    <option value="react">React</option>
                    <option value="python">Python</option>
                    <option value="r">R</option>
                    <option value="c">C</option>
                    <option value="sql">SQL</option>
                    <option value="aws">AWS</option>
                    <option value="azure">Azure</option>
                    <option value="gcp">GCP</option>
                    <option value="swift">Swift</option>
                    <option value="kotlin">Kotlin</option>
                </select>

                <select ref={locationRef} defaultValue={initialValues.location} name={locationId} id={locationId}>
                    <option value="">Ubicación</option>
                    <option value="cdmx">Ciudad de México</option>
                    <option value="guadalajara">Guadalajara</option>
                    <option value="madrid">Madrid</option>
                    <option value="remoto">Remoto</option>
                </select>

                <select ref={expLevelRef} defaultValue={initialValues.expLevel} name={expLevelId} id={expLevelId}>
                    <option value="">Nivel de Experiencia</option>
                    <option value="junior">Junior</option>
                    <option value="mid-level">Mid</option>
                    <option value="senior">Senior</option>
                </select>

                {filterActive && <button className='btn-std' onClick={ e => handleClearFilters(e, techRef, locationRef, expLevelRef, txtSearchRef)}>Limpiar filtros</button>}

                {/*
                <div className={styles.msgContainer}>
                    {focusedField === 'search' ? <label htmlFor={salaryId} className={styles.inputHint}>Divisa: EUR €</label>: null}
                    <input type='number' name={salaryId} id={salaryId} placeholder='Salario mínimo' min='0' step={1000} onFocus={() => setFocusField('search')} onBlur={() => setFocusField(null)} className={focusedField === 'search' ? styles.onFocus : ''}/> 
                </div>

                <select name={contractId} id={contractId}>
                    <option value=''>Tipo de contrato</option>
                    <option value='full-time'>Full Time</option>
                    <option value='part-time'>Part Time</option>
                    <option value='freelance'>Freelance</option>
                    <option value='internship'>Prácticas</option>
                </select>
                */}
            </article>
        </form>
    );
}
