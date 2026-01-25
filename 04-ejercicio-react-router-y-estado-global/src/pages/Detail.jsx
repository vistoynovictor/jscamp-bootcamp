import { useState,useEffect } from 'react'
import { useParams, useNavigate } from "react-router"

import { DetailApplyButton, DetailFavoritesButton, DetailPageBreadcrum, DetailPageHeader, JobdDetailCard } from '../assets/components/DetailPageComponents.jsx'
import { Spinner } from '../assets/components/Spinner.jsx'

import styles from './Detail.module.css'

export default function JobDetail(){

    const navigate = useNavigate()
    const handleBack = () => {navigate('/search')}

    const { jobId } = useParams()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
            .then(response => {
                if (!response.ok) throw new Error('Trabajo no encontrado')
                return response.json()
            })
            .then(json => {
                setJob(json)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    },[jobId])

    if (loading) return <Spinner loadTarget='oferta de trabajo'/>

    if (error || !job){
        return(
            <>
                <h1>Trabajo no encontrado</h1>
                <button className={styles.back + ' btn-std'} onClick={handleBack}>Inicio</button>
            </>
        )
    }

    return(
        <>
            <DetailPageBreadcrum job={job} />

            <article className={styles.jobOfferCard}>

                <DetailPageHeader job={job} />

                <article>

                    <JobdDetailCard title='Descripción del puesto' content={job.content.description}/>
                    <JobdDetailCard title='Responsabilidades' content={job.content.responsibilities}/>
                    <JobdDetailCard title='Requisitos' content={job.content.requirements}/>
                    <JobdDetailCard title='Acerca de la empresa' content={job.content.about}/>
                    
                </article>

                <DetailApplyButton/>

            </article>
        </>
    )
}
