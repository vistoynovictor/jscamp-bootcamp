Hola Victor! Como estas?
Excelente trabajo! No solo te desafiaste con los puntos de la tarea sino que expandiste aún más, increíble :)

Hicimos unos cuantos cambios a nivel de archivos JS, en cada uno comentamos el por qué de cada decisión, pero usaremos este archivo para que quede más claro:

## fetch-data.js

Está genial que hayas hecho una función para crear la lista de empleos, y la iniciativa de reutilizarla en cada uno de los filtros está muy bien, pero hay que tener algunas consideraciones:

Cuando hacemos un filtrado de elementos ya existentes en el DOM, lo mejor es manipular esos elementos para no tener que volver a hacer una llamada fetch cada vez que se hace un filtrado o búsqueda.

Esto ahorra muchos recursos y hace que la UX sea mucho más fluida. De hecho, antes de los cambios se podía ver que entre cada búsqueda, había un salto en la pantalla.

**Divide y vencerás**

En este caso, separar el propósito de cada función es muy importante para que el código sea más legible y fácil de mantener. Usamos `fetch-data.js` para obtener los datos y mostrarlos en la pantalla, y `filters.js` para filtrar los datos y mostrarlos en la pantalla (dos responsabilidades diferentes).

## filters.js

En este archivo, lo ideal es poder manejar el filtrado de los elementos que ya tenemos en el DOM, ya que al hacer el fetch inicial, los obtuvimos todos.

Lo que hicimos fue crear una función que su único propósito sea filtrar los elementos, y que sea reutilizable para cualquier tipo de filtrado que necesitemos hacer. De esta manera, cada `addEventListener` solo se encarga de llamar a la función `filterJobs` y no de preocuparse por cómo se filtran los elementos.

También hicimos una reorganización en el código para que quede más claro. En la parte superior colocamos las variables de referencia a los filtros en el DOM, luego los `addEventListeners` y por último la función `filterJobs` que se encarga de todo. Esto hace que el código sea más declarativo:

- tenemos las variables arriba, nos da un indicio de qué se va a usar
- tenemos las invocaciones a los eventos, lo que nos dice que se hará y cuando se hará
- por último, tenemos la función con toda su lógica dentro, al final para que el usuario al leer el archivo, entienda que se quiere hacer y luego si lo desea, pueda leer más a detalle cómo se hace.

## apply-button.js

Hicimos un pequeño cambio para que, en vez de detectar el click de cada botón que esté dentro de un `section` grande, podamos ser más específicos y detectar el click de cada botón individualmente que contenga la clase `btn-std`