## 🧩 ¿Desestructuración?

`utilities.ts`

```typescript
export function updateJob(job: Job, updates: Partial<Job>): Job {
	return { ...job, ...updates }
  }
```

He entendido que aquí estamos haciendo una **desestructuración** del objeto (*cosa que no estoy seguro de que sea posible*), para **sobreescibir** con las propiedades de **updates** aquellas que están siendo *actualizadas*. Igual me estoy equivocando completamente.

**Respuesta:**
Hola! Sii, es correcto. Estamos haciendo una **desestructuración** del objeto `job` y luego sobrescribiendo las propiedades que vienen en `updates`. Es una forma común de actualizar objetos en JavaScript/TypeScript.

Lo que se hace es:

```typescript
{ ...job, ...updates }
```

Esto crea un nuevo objeto que combina:
- Todos los campos de `job` (desestructuración con `...job`)
- Todos los campos de `updates` (desestructuración con `...updates`)
- Si `updates` tiene una propiedad que también existe en `job`, la del `updates` sobrescribe la del `job` por la posición en el objeto.

## ✂ ¿Especificación de tipo necesaria?

`tuples.ts`

``` typescript
const salaries = jobs.filter((job) => job.salary !== undefined).map((job) => job.salary as number)

```

¿Es necesario especificar `job.salary as number` ? Parece *inferirlo* sin problemas, pues entiendo que `job.salary !== undefined` es **type narrowing**, ¿no?.

**Respuesta:**
Sí, es necesario el `as number`. Aunque `job.salary !== undefined` es efectivamente **type narrowing**, TypeScript **no propaga** este narrowing a través del método `filter`. 

El narrowing funciona **dentro** de la función del `filter`, pero no se "transfiere" al array resultante. TypeScript no entiende que después del `filter`, todos los elementos tienen `salary` definido :/

## 🧑‍💻 Uso en proyectos

1. ¿A la hora de usar **Typescript** en un proyecto, sería recomendable hacer **todo el proyecto** en typescript, o solo en *partes específicas*?
2. ¿Existe algún **standard** de industria sobre *donde* y/o *cuando* usar **Ts**? (*ex. Frontend ⇁ js, Backend ⇁ ts*)
3. ¿Es **buena práctica** hacer los *componentes* de react con **Tsx**?
4. ¿Se **diferencian** mucho *Ts* y *Tsx*?
5. En cuanto a **unit tests** y **e2e**, ¿es mejor ceñirse a *Js* o desarrollarlos con *Ts*?
6. En caso de que la respuesta a todo sea Typescript, *hoy en día*, ¿cual es el **caso de uso de *Javascript***?

**Respuestas:**

1. Depende si el proyecto ya existe en JavaScript, o si es un proyecto desde cero.
   - Si es desde cero, te recomiendo usar Typescript.
   - Si ya existe en JavaScript, te recomiendo ir migrando poco a poco.
2. No hay un standard como tal, pero si te puedo decir que en general se usa Typescript en proyectos grandes y complejos, y JavaScript en proyectos pequeños y simples.
3. Si, si estas usando Typescript, es buena práctica usar Tsx para los componentes de React.No hace falta typar todo, podes tenes el componente con TSX y no los types definidos de entrada.
4. TS es para tipar JavaScript, TSX es un archivo de TypeScript que incluye JSX.
5. Eso depende de lo que quieras hacer, la única diferencia va a ser que tendrás que tipar los archivos de test, pero podes tener todo tu proyecto en TS y los tests en JS.
6. JavaScript sigue siendo usado en proyectos pequeños, en scripts, en navegadores, etc. Proyectos grandes es bueno usar Typescript.

Como ves tengo muchas dudas sobre donde y cuando usar qué cosa. 😅

