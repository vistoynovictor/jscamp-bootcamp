## 🧩 ¿Desestructuración?

`utilities.ts`

```typescript
export function updateJob(job: Job, updates: Partial<Job>): Job {
	return { ...job, ...updates }
  }
```

He entendido que aquí estamos haciendo una **desestructuración** del objeto (*cosa que no estoy seguro de que sea posible*), para **sobreescibir** con las propiedades de **updates** aquellas que están siendo *actualizadas*. Igual me estoy equivocando completamente.



## ✂ ¿Especificación de tipo necesaria?

`tuples.ts`

``` typescript
const salaries = jobs.filter((job) => job.salary !== undefined).map((job) => job.salary as number)

```

¿Es necesario especificar `job.salary as number` ? Parece *inferirlo* sin problemas, pues entiendo que `job.salary !== undefined` es **type narrowing**, ¿no?.



## 🧑‍💻 Uso en proyectos

1. ¿A la hora de usar **Typescript** en un proyecto, sería recomendable hacer **todo el proyecto** en typescript, o solo en *partes específicas*?
2. ¿Existe algún **standard** de industria sobre *donde* y/o *cuando* usar **Ts**? (*ex. Frontend ⇁ js, Backend ⇁ ts*)
3. ¿Es **buena práctica** hacer los *componentes* de react con **Tsx**?
4. ¿Se **diferencian** mucho *Ts* y *Tsx*?
5. En cuanto a **unit tests** y **e2e**, ¿es mejor ceñirse a *Js* o desarrollarlos con *Ts*?
6. En caso de que la respuesta a todo sea Typescript, *hoy en día*, ¿cual es el **caso de uso de *Javascript***?



Como ves tengo muchas dudas sobre donde y cuando usar qué cosa. 😅
