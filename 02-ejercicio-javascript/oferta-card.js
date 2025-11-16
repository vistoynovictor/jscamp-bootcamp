const offerDescription = document.querySelector('.job-offer-card');

offerDescription.addEventListener('click', (e) => {
    if (e.target.nodeName == 'BUTTON'){
        const buttons = document.querySelectorAll('.job-offer-card button');
        buttons.forEach((button) => {
            button.textContent = '!Aplicado!';
            button.classList.add('btn-applied');
            button.disabled = true;
        });   
    }
});