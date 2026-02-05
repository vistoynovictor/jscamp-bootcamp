He probado con un catch en el await json(req) del POST, pero parece que no me ha funcionado. ¿Cómo podría manejar una mala sintaxis en la petición sin que crashee el servidor?

---

**Respuesta:**

Puedes poner un catch de esta manera:

```js 
let body
try {
  body = await json(req)
} catch (error) {
  return sendJson(res, 400, { message: 'Invalid JSON syntax' })
}
```

Esto hará que si el usuario manda algo que no sea un JSON válido, el servidor no crashee y en su lugar devuelva un error 400.