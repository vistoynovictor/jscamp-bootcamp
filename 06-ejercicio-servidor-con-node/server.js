import { createServer } from 'node:http'
import { json } from 'node:stream/consumers'
import { randomUUID } from 'node:crypto'

process.loadEnvFile()

const port = process.env.PORT ?? 3000

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

const server = createServer(async (req, res) => {
  const { method, url } = req

  const [pathname, queryString] = url.split('?')

  // Crack! Esto que hiciste está muy bien :) Lo voy a mover dentro de pathname === '/users' por el hecho de que se usa las query params solo en esa ruta. Es por un tema de agrupar la lógica en la ruta. Solo eso si?
  // const searchParams = new URLSearchParams(queryString)

  if (method === 'GET') {

    if (pathname === '/health') {
      return sendJson(res, 200, { status: 'ok', uptime: process.uptime() })
    }

    if (pathname === '/users') {
      const searchParams = new URLSearchParams(queryString)

      const name = searchParams.get('name')
      const minAge = Number(searchParams.get('minAge'))
      const maxAge = Number(searchParams.get('maxAge'))

      if (Number.isNaN(minAge) || Number.isNaN(maxAge)) {
        return sendJson(res, 400, { message: 'Bad request. Age range parameters must be a number' })
      }

      const limit = Number(searchParams.get('limit')) || users.length
      const offset = Number(searchParams.get('offset')) || 0


      // Creé un filtro distinto para que sea más legible y acepte parámetros opcionales
      const filteredUsersList = users.filter((user) => {
        const normalizedUserName = name ? name.toLowerCase() : ''

        const matchName = user.name.toLowerCase().includes(normalizedUserName)

        const matchMinAge = minAge ? user.age >= minAge : true
        const matchMaxAge = maxAge ? user.age <= maxAge : true

        return matchName && matchMinAge && matchMaxAge
      })

      const filteredUsers = users.filter(user =>
        name ? user.name.toLowerCase() === name.toLowerCase() : true &&
          minAge !== 0 ? user.age >= minAge : true &&
            maxAge !== 0 ? user.age <= maxAge : true
      )

      const paginatedUsers = filteredUsersList.slice(offset, offset + limit)

      return sendJson(res, 200, paginatedUsers)
    }

    /* 
     if (pathname === '/cookies') {
      res.setHeader('Set-Cookie', 'token=abc123; HttpOnly; Path=/; Max-Age=3600')
      return res.end('Cookie Set')
    }
    */
  }

  if (method === 'POST') {
    if (pathname === '/users') {
      // Con esto, el server no crashea si el usuario manda algo que no es un JSON válido
      let body
      try {
        body = await json(req)
      } catch (error) {
        return sendJson(res, 400, { message: 'Invalid JSON syntax' })
      }

      if (!body || !body.name) {
        return sendJson(res, 400, { message: 'Name is required' })
      }

      if (!body.age) {
        return sendJson(res, 400, { message: 'Age is required' })
      }

      const newUser = {
        id: randomUUID(),
        name: body.name,
        age: body.age,
      }

      users.push(newUser)

      // Siempre es bueno devolver el usuario creado o un link que permita ver el usuario creado
      return sendJson(res, 201, { message: 'Usuario creado', user: newUser })
    }
  }

  return sendJson(res, 404, { error: 'Not Found' })
})

server.listen(port, () => {
  const address = server.address()

  console.log(`Servidor escuchando en http://localhost:${address.port}`)
})

const users = [
  {
    id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    name: 'Miguel',
    age: 28,
  },
  {
    id: 'f6e5d4c3-b2a1-4f5e-6d7c-8b9a0e1f2a3b',
    name: 'Mateo',
    age: 34,
  },
  {
    id: '9a8b7c6d-5e4f-4a3b-2c1d-0e9f8a7b6c5d',
    name: 'Pablo',
    age: 22,
  },
  {
    id: '3c4d5e6f-7a8b-4c9d-0e1f-2a3b4c5d6e7f',
    name: 'Lucía',
    age: 31,
  },
  {
    id: '7b8c9d0e-1f2a-4b3c-4d5e-6f7a8b9c0d1e',
    name: 'Ana',
    age: 26,
  },
  {
    id: '5d6e7f8a-9b0c-4d1e-2f3a-4b5c6d7e8f9a',
    name: 'Juan',
    age: 29,
  },
  {
    id: '2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d',
    name: 'Sofía',
    age: 25,
  },
  {
    id: '8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c',
    name: 'Carlos',
    age: 37,
  },
  {
    id: '4c5d6e7f-8a9b-4c0d-1e2f-3a4b5c6d7e8f',
    name: 'Elena',
    age: 23,
  },
  {
    id: '0e1f2a3b-4c5d-4e6f-7a8b-9c0d1e2f3a4b',
    name: 'Diego',
    age: 30,
  },
]
