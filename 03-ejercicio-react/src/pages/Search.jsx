import { Filters } from '../assets/components/Filters.jsx';
import { FetchingJobs } from '../assets/components/FetchingJobs.jsx';
import { Pagination } from '../assets/components/Pagination';

import { useFilters } from '../hooks/useFilters.jsx'

export function SearchPage(){
    
    const {jobs, loading, currentPage, handleFilters, handlePageChange, total, totalPages, filterActive, clearFilters, error} = useFilters()

    const title = `Ofertas: ${total}, Página: ${currentPage} - DevJobs`

    return (
        <main>
            <title>{loading ? 'Cargando... - DevJobs' : title}</title>
            <section className="upper-employment">
                <h1>Encuentra tu próximo trabajo</h1>
                <p>Explora miles de oportunidades en el sector tecnológico.</p>
                <Filters OnSearch={handleFilters} filterActive={filterActive} handleClearFilters={clearFilters}/>
            </section>
            <section className="job-list-component">
                <h2>Resultados de búsqueda</h2>
                <FetchingJobs total={total} error={error} jobs={jobs} loading={loading}/>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
            </section>
        </main>
    );
}
