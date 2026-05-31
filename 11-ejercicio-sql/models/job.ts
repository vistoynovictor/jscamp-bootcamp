import crypto from 'node:crypto'
import { db } from '../db/database.js'
import type { Job, CreateJobDTO, UpdateJobDTO, JobFilters, dbOutput, RawJobRow } from '../types'


const dbOutputParse = (result: dbOutput) => {
  if (Array.isArray(result)) {
    return result.map((row) => ({
      id: row.id,
      title: row.title,
      company: row.company,
      location: row.location,
      description: row.description,
      data: {
        technology: row.technologies.split(',') ?? [],
        modality: row.modality,
        level: row.level
      }
    })) as Job[]
  } else {
    const output: Job[] = [{
      id: result.id,
      title: result.title,
      company: result.company,
      location: result.location,
      description: result.description,
      data: {
        technology: result.technologies.split(',') ?? [],
        modality: result.modality,
        level: result.level
      }
    }]

    return output
  }
}

export class JobModel {
  // Obtener todos los jobs con filtros opcionales
  static async getAll(filters?: JobFilters): Promise<Job[]> {
    let query = `
      SELECT j.*, GROUP_CONCAT(jt.technology) AS technologies
      FROM jobs j
      LEFT JOIN job_technologies jt ON j.id = jt.job_id
    `
    const conditions: string[] = []
    const params: unknown[] = []

    if (filters?.technology) {

      conditions.push(` j.id IN (
        SELECT job_id FROM job_technologies
        WHERE technology = ?
      )`)
      params.push(filters.technology)
    }

    if (filters?.modality) {
      conditions.push(`j.modality = ?`)
      params.push(filters.modality)
    }

    if (filters?.level) {
      conditions.push(`j.level = ?`)
      params.push(filters.level)
    }

    if (filters?.location) {
      conditions.push(`j.location LIKE ?`)
      params.push(`%${filters.location}%`)
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    query += ' GROUP BY j.id '

    if (filters?.limit) {
      query += ' LIMIT ?'
      params.push(Number(filters.limit))
    }
    if (filters?.offset) {
      query += ' OFFSET ?'
      params.push(Number(filters.offset))
    }

    const rows = db.prepare(query).all(...params) as RawJobRow[]
    return dbOutputParse(rows)
  }

  // Obtener un job por ID
  static async getById(id: string): Promise<Job | undefined> {
    const query = `
      SELECT j.*, GROUP_CONCAT(jt.technology) AS technologies
      FROM jobs j
      LEFT JOIN job_technologies jt ON j.id = jt.job_id
      WHERE j.id = ?
      GROUP BY j.id
    `
    const result = db.prepare(query).get(id) as dbOutput | undefined
    if (!result) return undefined
    return dbOutputParse(result)[0]
  }

  // Crear un nuevo job
  static async create(input: CreateJobDTO): Promise<Job> {
    const newJob: Job = {
      id: crypto.randomUUID(),
      ...input,
    }

    const insertJob = db.prepare(`
      INSERT INTO jobs (id, title, company, location, description, modality, level)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    const insertTech = db.prepare(`
      INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)
    `)

    const createTransaction = db.transaction(() => {
      insertJob.run(newJob.id, newJob.title, newJob.company, newJob.location, newJob.description, newJob.data.modality, newJob.data.level)

      for (const tech of newJob.data.technology) {
        insertTech.run(newJob.id, tech)
      }
    })

    createTransaction()
    return newJob
  }

  // Eliminar un job
  static async delete(id: string): Promise<boolean> {
    const query = `
      DELETE FROM jobs
      WHERE id = ?
    `
    const result = db.prepare(query).run(id)

    return result.changes > 0
  }

  // Actualizar un job
  static async update(id: string, input: UpdateJobDTO): Promise<Job | null> {
    const setClauses: string[] = []
    const params: unknown[] = []

    if (input?.title) {
      setClauses.push('title = ?')
      params.push(input.title)
    }
    if (input?.company) {
      setClauses.push('company = ?')
      params.push(input.company)
    }
    if (input?.location) {
      setClauses.push('location = ?')
      params.push(input.location)
    }
    if (input?.description) {
      setClauses.push('description = ?')
      params.push(input.description)
    }
    if (input?.data?.modality) {
      setClauses.push('modality = ?')
      params.push(input.data.modality)
    }
    if (input?.data?.level) {
      setClauses.push('level = ?')
      params.push(input.data.level)
    }

    const hasTechnologies = input?.data?.technology && input.data.technology.length > 0

    const updateTransaction = db.transaction(() => {
      if (setClauses.length > 0) {
        const updateStatement = db.prepare(`UPDATE jobs SET ${setClauses.join(', ')} WHERE id = ?`)
        updateStatement.run(...params, id)
      }

      if (hasTechnologies) {
        db.prepare('DELETE FROM job_technologies WHERE job_id = ?').run(id)
        const insertTech = db.prepare('INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)')
        for (const tech of input.data!.technology) {
          insertTech.run(id, tech)
        }
      }
    })

    updateTransaction()

    const result = db.prepare(`
      SELECT j.*, GROUP_CONCAT(jt.technology) AS technologies
      FROM jobs j
      LEFT JOIN job_technologies jt ON j.id = jt.job_id
      WHERE j.id = ?
      GROUP BY j.id
    `).get(id) as dbOutput | undefined

    if (!result) return null
    return dbOutputParse(result)[0]
  }
}
