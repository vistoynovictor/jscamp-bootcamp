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

/* Una cosa que podemos hacer cuando tenemos mucho código repetido, es crear funciones helper para reutilizarla. Si vemos en nuestros tests, lo que hacemos siempre es una petición, testear el status y devolver la respuesta en formato JSON. Así que podemos hacer eso: */
const handleGetRequestAndAssertStatus = async (path, expectedStatus = 200) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  assert.strictEqual(response.status, expectedStatus)
  return response.json()
}

const handlePostRequestAndAssertStatus = async (path, expectedStatus = 201,  body = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  
  assert.strictEqual(response.status, expectedStatus)
  return response.json()
}

const handlePutRequestAndAssertStatus = async (path, expectedStatus = 204,  body = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  
  assert.strictEqual(response.status, expectedStatus) 
  return response.json()

}

const handlePatchRequestAndAssertStatus = async (path, expectedStatus = 204,  body = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  
  assert.strictEqual(response.status, expectedStatus)
}

const handleDeleteRequestAndAssertStatus = async (path, expectedStatus = 204) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  assert.strictEqual(response.status, expectedStatus)
}


describe('GET /jobs', () => {
  test('Debe responder con 200 y un array de trabajos', async () => {
    // Usamos el helper
    const json = await handleGetRequestAndAssertStatus('/jobs', 200)
    assert.ok(Array.isArray(json.data), 'La respuesta debe ser un array')
  })

  test('Debe filtar trabajos por tecnología', async () => {
    const tech = 'react'
    const json = await handleGetRequestAndAssertStatus(`/jobs?technology=${tech}`, 200)

    assert.ok(
      json.data.every(job => job.data.technology.includes(tech)),
      `Todos los trabajos deben incluir la tecnologia ${tech}`
    )
  })

  test('Debe devolver solo 2 trabajos', async () => {
    const limit = 2
    const json = await handleGetRequestAndAssertStatus(`/jobs?limit=${limit}`, 200)

    assert.ok(
      json.limit === limit &&
      json.total === limit &&
      json.data.length === limit
    )
  })

  test('El resultado #1 debe ser la oferta #2 ', async () => {
    const offset = 1
    const json = await handleGetRequestAndAssertStatus(`/jobs?offset=${offset}`, 200)

    assert.ok(
      json.offset === offset &&
      json.data[0].id === 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57'
    )

    /*
      Alternativa: En vez de usar un ID escrito a mano, podemos obtener el ID de la base de datos.
      En caso de que la BBDD cambie, el test seguiría funcionando.
    */

    // 1. Obtener todos los jobs
    const allJobs = await handleGetRequestAndAssertStatus('/jobs', 200)
    
    // 2. Obtener el job en la posición offset
    const jobAtOffset = allJobs.data[offset]
    
    // 3. Verificar que el job en la posición offset es el que esperamos
    assert.ok(
      jobAtOffset.id === json.data[0].id,
      'El job en la posición offset debe ser el mismo que el job en la posición 0 del response'
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

    const jobs = await handlePostRequestAndAssertStatus('/jobs', 201, newJob)

    assert.ok(
      jobs.titulo === newJob.titulo &&
      jobs.id
    )
  })

  test('La petición es validada con exito', async () => {
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

    /* Voy a hacer unos cambios con los helpers que creamos y agregando comentarios en el código */

    // Validamos con titulo menor a 3 caracteres
    await handlePostRequestAndAssertStatus('/jobs', 400, newJob)

    // Validamos con titulo entre 3 y 100 caracteres
    newJob.titulo = 'x'.repeat(3)
    delete newJob.descripcion
    await handlePostRequestAndAssertStatus('/jobs', 201, newJob)

    // Validamos con titulo mayor a 100 caracteres
    newJob.titulo = 'x'.repeat(101)
    await handlePostRequestAndAssertStatus('/jobs', 400, newJob)

    // Validamos con titulo no string
    newJob.titulo = 1000
    await handlePostRequestAndAssertStatus('/jobs', 400, newJob)

    // Validamos con titulo null
    newJob.titulo = null
    await handlePostRequestAndAssertStatus('/jobs', 400, newJob)

    // Validamos sin titulo
    delete newJob.titulo
    await handlePostRequestAndAssertStatus('/jobs', 400, newJob)
  })
})

describe('GET /jobs/:id', () => {
  test('Debe devolver el trabajo con id especificado', async () => {
    const id = 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57'

    const job = await handleGetRequestAndAssertStatus(`/jobs/${id}`, 200)

    assert.ok(
      job.id === id
    )
  })

  test('Debe enviar 404 cuando la id no pertenece a ninguna oferta', async () => {
    const id = 'esto-no-es-una-id'

    await handleGetRequestAndAssertStatus(`/jobs/${id}`, 404)
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

   await handlePatchRequestAndAssertStatus(`/jobs/${id}`, 204, patch)

    const json = await handleGetRequestAndAssertStatus(`/jobs/${id}`, 200)

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

    await handlePatchRequestAndAssertStatus(`/jobs/${id}`, 404, newJob)
  })
})

describe('DELETE /jobs/:id', () => {
  test('Debe recibir un 204 y eliminar el trabajo', async () => {
    const id = 'f62d8a34-923a-4ac2-9b0b-14e0ac2f5405'

    // Tambien podemos evaluar que antes existía
    await handleGetRequestAndAssertStatus(`/jobs/${id}`, 200)

    await handleDeleteRequestAndAssertStatus(`/jobs/${id}`, 204)
    await handleGetRequestAndAssertStatus(`/jobs/${id}`, 404)
  })

  test('Debe devolver 404 cuando la id no pertenece a ningun trabajo', async () => {
    const id = 'Not-a-valid-id'

    await handleDeleteRequestAndAssertStatus(`/jobs/${id}`, 404)
  })
})
