import filterStatus from './filters.js';

export default function createJobList (filter){

    const container = document.querySelector('.job-list-component section');
    container.innerHTML = '';
    const pagination = document.querySelector('.pg-num');
    pagination.innerHTML = '';

    const RESULTS_PER_PAGE = 4;
    let pageNum = 0;
    let resultsCount = 0;

    fetch('data.json')
        .then(response => {
            const jsonData = response.json();

            return jsonData
        })
        .then(jobs => {
            jobs.forEach(job => {

                const checkTech = (queryTech) => job.data.tech.includes(queryTech);
                const someTech = filter.tech.length == 0 || filter.tech.every(checkTech);

                const isLocation = filter.location === '' || job.data.location === filter.location;
                const isExpLevel = filter.expLevel === '' || job.data.expLevel === filter.expLevel;
                const hasSearch = filter.searchBar === '' || job.titulo.toLowerCase().includes(filter.searchBar);

                if(someTech && isLocation && isExpLevel && hasSearch){

                    const article = document.createElement('article');
        
                    article.className = 'job-list-card';
                    article.dataset.tech = job.data.tech;
                    article.dataset.location = job.data.location;
                    article.dataset.expLevel = job.data.expLevel;
                        
                    article.innerHTML = `<a href="${job.id}.html">
                            <header>
                                <h3>${job.titulo}</h3>
                                <small>
                                    <span class="company-name">${job.empresa}</span> |
                                    <span class="company-location">${job.ubicacion}</span>
                                </small>
                            </header>
        
                            <p>${job.descripcion}</p>
                        </a>
        
                        <button class="btn-std">Aplicar</button>`
                    
                    resultsCount++;
                    container.appendChild(article);
                }
            })

            pageNum = Math.ceil(resultsCount / RESULTS_PER_PAGE);

            const prevPage = document.createElement('a');
            prevPage.href = "#"
            prevPage.ariaLabel = "Previous";
            prevPage.title = "Previous Page";
            prevPage.innerHTML = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>`;

            const nextPage = document.createElement('a');
            nextPage.href = "#";
            nextPage.ariaLabel = "Next";
            nextPage.title = "Next Page";
            nextPage.innerHTML = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>`;
            
            pagination.append(prevPage);

            for(let i = 0; i < pageNum; i++){
                const page = document.createElement('a');
                page.ariaLabel = `Page ${i + 1}`;
                page.title = `Page ${i + 1}`;
                if(i === 0){
                    page.classList.add('is-active');
                }

                page.innerHTML = `${i + 1}`;
                pagination.append(page);
            }

            pagination.append(nextPage);
        });
}

createJobList(filterStatus);
