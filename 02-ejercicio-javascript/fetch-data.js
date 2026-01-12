/* 
No hace falta usar esta función cada vez que se hace un filtrado o actualización de la DATA que se verá. Recordemos que, aunque trabajemos con archivos locales (nuestro JSON), un fetch es una función asíncrona, y si por cada filtrado o actualización de la DATA que se verá, ejecutáramos una petición fetch, la UX se volvería muy lenta.

Lo que hacemos es:
- Ejecutar el fetch con toda la DATA resultante una sola vez
- Una vez tengamos la DATA, usarla para filtrar y mostrar elementos en la pantalla, no volver a hacer un fetch
*/


function createJobList() {

    // Es mejor acceder a un elemento desde su id o su identificador excacto, sin tener que recorrer el DOM para encontrarlo. Esto nos evita muchos problemas a la hora de modificar el HTML y hace que el código sea más legible.
    const container = document.querySelector('.jobs-listings');
    // no hace falta limpiar el contenido ya que esto lo ejecutaremos solo al inicio de la aplicación
    // container.innerHTML = '';
    const pagination = document.querySelector('.pg-num');
    pagination.innerHTML = '';

    const RESULTS_PER_PAGE = 4;
    let pageNum = 0;
    let resultsCount = 0;

    // siempre es bueno apuntar a la ruta relativa del archivo aunque estemos en el mismo directorio
    fetch('./data.json')
        .then(response => {
            const jsonData = response.json();

            return jsonData
        })
        .then(jobs => {
            /* 
                Creamos un DocumentFragment para mejorar el rendimiento.
                En lugar de agregar cada trabajo directamente al DOM (lo que haría que el navegador redibuje la página múltiples veces), guardamos todos los elementos en memoria primero. Al final, agregamos todo de una sola vez.
                
                Es como preparar todos los platos en la cocina antes de llevarlos a la mesa, en vez de hacer un viaje por cada plato, llevamos todos juntos, y es mejor :)

                Esto viene muy bien cuando tenemos muchos elementos que agregar al DOM.
            */
            const fragment = document.createDocumentFragment();
            
            jobs.forEach(job => {

                /* const checkTech = (queryTech) => job.data.tech.includes(queryTech);
                const someTech = filter.tech.length == 0 || filter.tech.every(checkTech);

                const isLocation = filter.location === '' || job.data.location === filter.location;
                const isExpLevel = filter.expLevel === '' || job.data.expLevel === filter.expLevel;
                const hasSearch = filter.searchBar === '' || job.titulo.toLowerCase().includes(filter.searchBar); */

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
                fragment.appendChild(article);
            })

            container.appendChild(fragment);

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

            for (let i = 0; i < pageNum; i++) {
                const page = document.createElement('a');
                page.ariaLabel = `Page ${i + 1}`;
                page.title = `Page ${i + 1}`;
                if (i === 0) {
                    page.classList.add('is-active');
                }

                page.innerHTML = `${i + 1}`;
                pagination.append(page);
            }

            pagination.append(nextPage);
        });
}

createJobList();
