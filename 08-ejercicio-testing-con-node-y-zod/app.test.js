import { test, describe, before, after } from 'node:test'
import assert from 'node:assert'
import app from './app.js'

let server

const PORT = 5678
const BASE_URL = `http://localhost:${PORT}`

before(async () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => resolve())
    server.on('error', reject)
  })
})

after(async () => {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) return reject(err)
      resolve()
    })
  })
})

describe('GET /jobs', () => {
  test('Debe responder con 200 y un array de trabajos', async () => {
    const response = await fetch(`${BASE_URL}/jobs`)
    assert.strictEqual(response.status, 200)
    const json = await response.json()
    assert.ok(Array.isArray(json.data), 'La respuesta debe ser un array')
  })

  test('Debe filtar trabajos por tecnología', async () => {
    const tech = 'react'
    const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`)
    assert.strictEqual(response.status, 200)

    const json = await response.json()
    assert.ok(
      json.data.every(job => job.data.technology.includes(tech)),
      `Todos los trabajos deben incluir la tecnologia ${tech}`
    )
  })

  test('Debe devolver solo 2 trabajos', async () => {
    const limit = 2
    const response = await fetch(`${BASE_URL}/jobs?limit=${limit}`)
    assert.strictEqual(response.status, 200)

    const json = await response.json()
    assert.ok(
      json.limit === limit &&
      json.total === limit &&
      json.data.length === limit
    )
  })

  test('El resultado #1 debe ser la oferta #2 ', async () => {
    const offset = 1
    const response = await fetch(`${BASE_URL}/jobs?offset=${offset}`)
    assert.strictEqual(response.status, 200)

    const json = await response.json()
    assert.ok(
      json.offset === offset &&
      json.data[0].id === 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57'
    )
  })
})

describe('POST /jobs', () => {
  test('El nuevo trabajo se añade correctamente con buen formato', async () => {

    const newJob = {
      titulo: 'xxxx',
      empresa: 'aaa',
      ubicacion: 'bbb',
      descripcion: 'ccc',
      data: {
        technology: ['1', '2', '3'],
        modalidad: 'remoto',
        nivel: 'mid'
      }
    }

    const response = await fetch(`${BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    })

    assert.strictEqual(response.status, 201)

    const json = await response.json()
    assert.ok(
      json.titulo === newJob.titulo &&
      json.id
    )
  })

  test('La petición es validada con exito', async () => {
    let response
    const newJob = {
      titulo: 'x',
      empresa: 'aaa',
      ubicacion: 'bbb',
      descripcion: 'ccc',
      data: {
        technology: ['1', '2', '3'],
        modalidad: 'remoto',
        nivel: 'mid'
      }
    }

    function post() {
      return fetch(`${BASE_URL}/jobs`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newJob)
        })
    }

    response = await post()
    assert.strictEqual(response.status, 400)

    newJob.titulo = 'x'.repeat(3)
    delete newJob.descripcion
    response = await post()
    assert.strictEqual(response.status, 201)

    newJob.titulo = 'x'.repeat(101)
    response = await post()
    assert.strictEqual(response.status, 400)

    newJob.titulo = 1000
    response = await post()
    assert.strictEqual(response.status, 400)

    newJob.titulo = null
    response = await post()
    assert.strictEqual(response.status, 400)

    delete newJob.titulo
    response = await post()
    assert.strictEqual(response.status, 400)
  })
})

describe('GET /jobs/:id', () => {
  test('Debe devolver el trabajo con id especificado', async () => {
    const id = 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57'

    const response = await fetch(`${BASE_URL}/jobs/${id}`)
    assert.strictEqual(response.status, 200)

    const json = await response.json()

    assert.ok(
      json.id === id
    )
  })

  test('Debe enviar 404 cuando la id no pertenece a ninguna oferta', async () => {
    const id = 'esto-no-es-una-id'

    const response = await fetch(`${BASE_URL}/jobs/:${id}`)
    assert.strictEqual(response.status, 404)

    const json = await response.json()
    assert.ok(json.error)
  })
})

describe('PUT /jobs/:id', () => {
  test('Debe recibir un 204 y actualizar el trabajo', async () => {
    const id = 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57'

    const newJob = {
      titulo: 'xxxx',
      empresa: 'aaa',
      ubicacion: 'bbb',
      descripcion: 'ccc',
      data: {
        technology: ['1', '2', '3'],
        modalidad: 'remoto',
        nivel: 'mid'
      }
    }

    const response1 = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    })

    assert.strictEqual(response1.status, 204)

    const response2 = await fetch(`${BASE_URL}/jobs/${id}`)

    const json = await response2.json()

    assert.ok(
      json.titulo = newJob.titulo
    )
  })

  test('Debe devolver 404 cuando la id no pertenece a ningun trabajo', async () => {
    const id = 'Not-a-valid-id'

    const newJob = {
      titulo: 'xxxx',
      empresa: 'aaa',
      ubicacion: 'bbb',
      descripcion: 'ccc',
      data: {
        technology: ['1', '2', '3'],
        modalidad: 'remoto',
        nivel: 'mid'
      }
    }

    const response1 = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    })

    assert.strictEqual(response1.status, 404)
  })
})

describe('PATCH /jobs/:id', () => {
  test('Debe recibir 204 y actualizar ubicacion y la empresa del trabajo', async () => {
    const id = 'f62d8a34-923a-4ac2-9b0b-14e0ac2f5405'

    const patch = {
      titulo: 'title',
      ubicacion: 'location'
    }

    const response1 = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch)
    })

    assert.strictEqual(response1.status, 204)

    const response2 = await fetch(`${BASE_URL}/jobs/${id}`)

    const json = await response2.json()

    assert.ok(
      json.titulo === patch.titulo &&
      json.ubicacion === patch.ubicacion
    )
  })

  test('Debe devolver 404 cuando la id no pertenece a ningun trabajo', async () => {
    const id = 'Not-a-valid-id'

    const newJob = {
      titulo: 'xxxx',
      ubicacion: 'bbb',
    }

    const response1 = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    })

    assert.strictEqual(response1.status, 404)
  })
})

describe('DELETE /jobs/:id', () => {
  test('Debe recibir un 204 y eliminar el trabajo', async () => {
    const id = 'f62d8a34-923a-4ac2-9b0b-14e0ac2f5405'

    const response1 = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })

    assert.strictEqual(response1.status, 204)

    const response2 = await fetch(`${BASE_URL}/jobs/${id}`)

    assert.strictEqual(response2.status, 404)
  })

  test('Debe devolver 404 cuando la id no pertenece a ningun trabajo', async () => {
    const id = 'Not-a-valid-id'

    const response1 = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })

    assert.strictEqual(response1.status, 404)
  })
})
