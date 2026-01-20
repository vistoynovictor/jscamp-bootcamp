import { useEffect, useState } from 'react'
import { useRouter } from './useRouter'

const RESULTS_PER_PAGE = 4;

export function useFilters(){
    const { navigateTo } = useRouter()

    const [filters, setFilters] = useState(() =>{ 
        const retrievedStorage = JSON.parse(localStorage.getItem('jobFilters')) || 'null'

        const params = new URLSearchParams(window.location.search)
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
            return retrievedStorage.filters || 
                {
                    tech: '',
                    location: '',
                    expLevel: '',
                    txtSearch: ''
                }
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

        const params = new URLSearchParams(window.location.search)
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
2
    const clearFilters = (e, techRef, locationRef, expLevelRef, txtSearchRef ) => {
        e.preventDefault()

        localStorage.removeItem('jobFilters')

        setFilters({
            tech: '',
            location: '',
            expLevel: '',
            txtSearch: ''
        })

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

    useEffect(()=>{
        const params = new URLSearchParams()

        if (filters.tech) params.append('technology', filters.tech)
        if (filters.location) params.append('type', filters.location)
        if (filters.expLevel) params.append('level', filters.expLevel)
        if (filters.txtSearch) params.append('text', filters.txtSearch)
        if (currentPage > 1) params.append('page', currentPage)
        
        const newUrl = params
            ? `${window.location.pathname}?${params.toString()}`
            : `${window.location.pathname}`

        navigateTo(newUrl)
    },[filters, currentPage, navigateTo])

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

    return {jobs, loading, filters, currentPage, handleFilters, handlePageChange, filterActive, total, totalPages, clearFilters, error}
}
