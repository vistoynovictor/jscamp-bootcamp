const jobList = document.querySelector('.job-list-component');

jobList.addEventListener('click', function(e){
    if (e.target.nodeName == 'BUTTON'){
        const button = e.target;
        button.textContent = '!Aplicado!';
        button.classList.add('btn-applied');
        button.disabled = true;
    }
});