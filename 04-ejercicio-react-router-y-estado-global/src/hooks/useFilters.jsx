import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';

const RESULTS_PER_PAGE = 4;

const INITIAL_FILTERS_STATE = {
    tech: '',
    location: '',
    expLevel: '',
    txtSearch: ''
}

export function useFilters(){
    /* Para simplificar el uso de los search params, vamos a usar el hook de React Router */
    const [searchParams, setSearchParams] = useSearchParams()

    const [filters, setFilters] = useState(() =>{ 
        const retrievedStorage = JSON.parse(localStorage.getItem('jobFilters')) || 'null'

        const params = searchParams
        const hasParams = params.toString().length > 0

        if (hasParams){
            const paramsContent = 
            {
                'tech': params.get('technology') || '',
                'location': params.get('type') || '',
                'expLevel': params.get('level') || '',
                'txtSearch': params.get('text') || ''
            }

            return paramsContent
        }else{
            return retrievedStorage.filters || INITIAL_FILTERS_STATE
        }
    })
 
    const[error, setError] = useState(null)

    const filterActive = (
        filters.tech !== '' || 
        filters.location !== '' || 
        filters.expLevel !== '' || 
        filters.txtSearch !== ''
    )

    const [currentPage, setCurrentPage] = useState(()=>{
        const retrievedStorage = JSON.parse(localStorage.getItem('jobFilters')) || 'null'

        const params = searchParams
        const hasParams = params.toString().length > 0

        if (hasParams){
            const page = Number(params.get('page'))
            return page && !Number.isNaN(page) ? page : 1
        }else{
            return retrievedStorage.page || 1
        }
    });

    const handleFilters = (searchInput) => {
        setFilters(searchInput);
        setCurrentPage(1);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const clearFilters = (e, techRef, locationRef, expLevelRef, txtSearchRef ) => {
        e.preventDefault()

        localStorage.removeItem('jobFilters')

        setFilters(INITIAL_FILTERS_STATE)

        if(currentPage !== 1){
            setCurrentPage(1)
        }

        techRef.current.value = ''
        locationRef.current.value = ''
        expLevelRef.current.value = ''
        txtSearchRef.current.value = ''
    }
    
    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        async function fetchJobs(){
            try {
                setLoading(true)

                setError(null)

                const localData = JSON.stringify({'filters': filters, 'page': currentPage})

                if(filterActive) localStorage.setItem('jobFilters', localData)

                const params = new URLSearchParams()
                if (filters.tech) params.append('technology', filters.tech)
                if (filters.location) params.append('type', filters.location)
                if (filters.expLevel) params.append('level', filters.expLevel)
                if (filters.txtSearch) params.append('text', filters.txtSearch)

                const offset = (currentPage - 1) * RESULTS_PER_PAGE
                params.append('limit', RESULTS_PER_PAGE)
                params.append('offset', offset)
                
                const queryParams = params.toString()

                const response = await fetch(`http://localhost:1234/jobs?${queryParams}`)

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
    },[filters, currentPage, filterActive])

    useEffect(()=>{
        setSearchParams((params) => {
            if (filters.tech) params.set('technology', filters.tech)
            if (filters.location) params.set('type', filters.location)
            if (filters.expLevel) params.set('level', filters.expLevel)
            if (filters.txtSearch) params.set('text', filters.txtSearch)
            if (currentPage > 1) params.set('page', currentPage)
            
            return params 
        })
    },[filters, currentPage, setSearchParams])

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

    return {jobs, loading, filters, currentPage, handleFilters, handlePageChange, filterActive, total, totalPages, clearFilters, error}
}
