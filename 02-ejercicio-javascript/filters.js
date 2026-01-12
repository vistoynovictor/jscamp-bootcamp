let filterStatus = {
    tech: [],
    location: '',
    expLevel: '',
    searchBar: ''
};

export default filterStatus;

// subimos todas las referencias de los filtros para tenerlo centralizado en un mismo lugar
const filterTech = document.getElementById('filter-tech');
const filterLocation = document.getElementById('filter-location');
const filterExpLevel = document.getElementById('filter-expLevel');
const filterSearchBar = document.getElementById('filter-searchBar');

/* const jobsListings = document.querySelector('.jobs-listings'); */

// más que un click, es mejor usar el evento `change`. `Change` detecta cuando hay un cambio en el valor del filtro independientemente de como el usuario interactúe (por clicks, teclado, etc.)
/* filterTech.addEventListener('change', (e) => {


    if (e.target.nodeName === 'OPTION' && e.target.value !== '')
    {
        e.target.classList.toggle('selected');
        
        updateTechSelected();
        createJobList(filterStatus);

    } else if(e.target.nodeName === 'OPTION' && e.target.value === ''){
        
        optionsTech.forEach(option => {
            if (option.classList.contains('selected')){
                option.classList.remove('selected');
            }
        });

        updateTechSelected();
        createJobList(filterStatus);
    }
}); */

/* function updateTechSelected(){
    filterStatus.tech = [];
    optionsTech.forEach(option => {

        if (option.classList.contains('selected')){

            filterStatus.tech.push(option.value);
        }
    });
} */

/* filterLocation.addEventListener('change', function(){
    const selectedValue = filterLocation.value;
    
    filterStatus.location = selectedValue;
    // console.log(filterStatus);
    createJobList(filterStatus);
}); */

/* filterExpLevel.addEventListener('change', function(){
    const selectedValue = filterExpLevel.value;
    
    filterStatus.expLevel = selectedValue;
    createJobList(filterStatus);
}); */

/* const filterSearchBar = document.querySelector('.employment-search-bar input')
filterSearchBar.addEventListener('input', () => {
    const inputText = filterSearchBar.value.toLowerCase();

    filterStatus.searchBar = inputText;
    createJobList(filterStatus);
}); */

/* const searchForm = document.querySelector('.employment-search');
searchForm.addEventListener('submit', function(e){
    e.preventDefault();
}); */

filterTech.addEventListener('change', filterJobs);
filterLocation.addEventListener('change', filterJobs);
filterExpLevel.addEventListener('change', filterJobs);
filterSearchBar.addEventListener('input', filterJobs);

function filterJobs() {
    // seleccionamos los valores de los filtros que seleccionamos
    const selectedLocation = filterLocation.value;
    const selectedExperience = filterExpLevel.value;
    const selectedTechnology = filterTech.value;

    const selectedSearchText = filterSearchBar.value.toLowerCase().trim();

    // obtenemos la lista de todos los empleos, sin tener que ejecutar nuevamente la función `createJobList`
    const jobs = document.querySelectorAll('.job-list-card');

    jobs.forEach(job => {
        // obtenemos las propiedades de cada empleo para luego, compararlas con los valores seleccionados por el usuario
        const jobTitle = job.querySelector('h3').textContent.toLowerCase();
        const jobLocation = job.getAttribute('data-location');
        const jobExperience = job.getAttribute('data-exp-level');
        const jobTech = job.getAttribute('data-tech');

        const listOfTechs = jobTech.split(',');

        const hasSearch = selectedSearchText === '' || jobTitle.includes(selectedSearchText);
        const isLocation = selectedLocation === '' || jobLocation === selectedLocation;
        const isExperience = selectedExperience === '' || jobExperience === selectedExperience;
        const isTech = selectedTechnology === '' || listOfTechs.includes(selectedTechnology);

        const showJob = hasSearch && isLocation && isExperience && isTech;

        // usamos toggle para poder agregar o quitar la clase `is-hidden` dependiendo de si el trabajo cumple con los filtros o no
        job.classList.toggle('is-hidden', !showJob);
    });
}
