// buscamos por la lista de empleos, no todo el section. Esto nos permite limitar la búsqueda y evitar errores por si algo más fuera del section tuviera la misma clase
const jobList = document.querySelector('.jobs-listings');

jobList.addEventListener('click', function(e){
    // no es buena práctica usar nodeName, es mejor usar className para limitar la búsqueda y evitar errores
    const button = e.target;
    
    if (button.classList.contains('btn-std')){
        button.textContent = '!Aplicado!';
        button.classList.add('btn-applied');
        button.disabled = true;
    }
});