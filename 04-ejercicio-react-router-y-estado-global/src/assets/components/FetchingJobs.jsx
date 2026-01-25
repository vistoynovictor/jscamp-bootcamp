import { useState, useEffect } from "react"

import {JobCard } from './JobCard.jsx'
import { Spinner } from './Spinner.jsx'

export function FetchingJobs({error, total, jobs, loading}){
    const [online, setOnline] = useState(navigator.onLine)
        
    useEffect(()=>{
        const isOnline = () => setOnline(true)
        const isOffline = () => setOnline(false)

        window.addEventListener('online', isOnline)
        window.addEventListener('offline', isOffline)

        return () => {
            window.removeEventListener('online', isOnline)
            window.removeEventListener('offline', isOffline)
        }
    },[])

    const activeInternetError = online && error 

    const noResults = !error && total === 0

    const someError = !online || error

    const noError = online && !error

    const handleRetry = () => {
        window.location.reload()
    }

    return(
        <>
            {loading ? <Spinner/> : noError ? <p>Monstrando {total} resultados</p> : <p>Mostrando 0 resultados</p>}
            {
                !loading && <section>
                    {!online && (<p style={{color:'red'}}>No tiene conexión a internet</p>)}
                    {activeInternetError && (
                        <p style={{color:'red'}}>
                            {error.message}
                        </p>)}
                    {noResults && (<p>No se han encontrado resultados para esta búsqueda</p>)}
                    {noError && jobs.map(job => <JobCard key={job.id} job={job}/>)}
                    {someError && <button className='btn-std' onClick={handleRetry}>Reintentar</button>}
                </section>
            }
        </>
    ) 
}
