import createJobList from './fetch-data.js'

let filterStatus = {
    tech: [],
    location: '',
    expLevel: '',
    searchBar: ''
};

export default filterStatus;

const filterTech = document.querySelector('#filter-tech');
const optionsTech = filterTech.querySelectorAll('option');

filterTech.addEventListener('click', (e) => {

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
});

function updateTechSelected(){
    filterStatus.tech = [];
    optionsTech.forEach(option => {

        if (option.classList.contains('selected')){

            filterStatus.tech.push(option.value);
        }
    });
}

const filterLocation = document.querySelector('#filter-location');

filterLocation.addEventListener('change', function(){
    const selectedValue = filterLocation.value;
    
    filterStatus.location = selectedValue;
    // console.log(filterStatus);
    createJobList(filterStatus);
});

const filterExpLevel = document.querySelector('#filter-expLevel');

filterExpLevel.addEventListener('change', function(){
    const selectedValue = filterExpLevel.value;
    
    filterStatus.expLevel = selectedValue;
    createJobList(filterStatus);
});

const filterSearchBar = document.querySelector('.employment-search-bar input')
filterSearchBar.addEventListener('input', () => {
    const inputText = filterSearchBar.value.toLowerCase();

    filterStatus.searchBar = inputText;
    createJobList(filterStatus);
});

const searchForm = document.querySelector('.employment-search');
searchForm.addEventListener('submit', function(e){
    e.preventDefault();
});

