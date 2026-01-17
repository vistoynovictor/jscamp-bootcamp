import { useEffect, useState } from 'react'

const RESULTS_PER_PAGE = 4;

export function useFilters(){

    const [filters, setFilters] = useState(() =>{ 
        return(
            JSON.parse(localStorage.getItem('jobFilters')) || 
                {
                    tech: '',
                    location: '',
                    expLevel: '',
                    txtSearch: ''
                }
        )
    })
 
    const[error, setError] = useState(null)

    const filterActive = (
        filters.tech !== '' || 
        filters.location !== '' || 
        filters.expLevel !== '' || 
        filters.txtSearch !== ''
    )

    const [currentPage, setCurrentPage] = useState(1);

    const handleFilters = (searchInput) => {
        setFilters(searchInput);
        setCurrentPage(1);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const clearFilters = (e) => {
        e.preventDefault()

        localStorage.removeItem('jobFilters')

        setFilters({
            tech: '',
            location: '',
            expLevel: '',
            txtSearch: ''
        })

        e.target.form.reset()

        if(currentPage !== 1){
            setCurrentPage(1)
        }
    }
    
    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        async function fetchJobs(){
            try {
                setLoading(true)

                setError(null)

                const filterValues = JSON.stringify(filters)

                if(filterActive) localStorage.setItem('jobFilters', filterValues)

                const params = new URLSearchParams()
                if (filters.tech) params.append('technology', filters.tech)
                if (filters.location) params.append('type', filters.location)
                if (filters.expLevel) params.append('level', filters.expLevel)
                if (filters.txtSearch) params.append('text', filters.txtSearch)

                const offset = (currentPage - 1) * RESULTS_PER_PAGE
                params.append('limit', RESULTS_PER_PAGE)
                params.append('offset', offset)
                
                const queryParams = params.toString()

                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)

                if(!response.ok){
                    throw new Error(`Error ${response.status}: ${response.statusText}.`)
                }

                const jobsData = await response.json()

                setJobs(jobsData.data)
                setTotal(jobsData.total)

            }catch (err) {
                setError(err)
            }finally{
                setLoading(false)
            }
        }

        fetchJobs()
    },[filters, currentPage])

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

    return {jobs, loading, currentPage, handleFilters, handlePageChange, filterActive, total, totalPages, clearFilters, error}
}
