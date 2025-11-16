const button = document.querySelector('.btnNavbar');
const dropdown = document.querySelector('.dropdownNavbar');

button.addEventListener('click', () => {
    button.toggleAttribute('expanded');
    dropdown.toggleAttribute('open');     
})
