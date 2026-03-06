import type { Technology, WorkMode, ExperienceLevel } from './types.ts'
import type { Job } from './objects.ts'
import {
  searchJobs,
  filterByExperience,
  filterByTechnology,
  filterByMinSalary,
} from './functions.ts'

// Función de búsqueda avanzada con opcionales
export function advancedSearch(jobs: Job[], options:
  {
    text?: string
    level?: ExperienceLevel
    technology?: Technology
    workMode?: WorkMode
    minSalary?: number
  }
): Job[] {
  let results = jobs

  if (options.text) {
    results = searchJobs(results, options.text)
  }

  if (options.level) {
    results = filterByExperience(results, options.level)
  }

  if (options.technology) {
    results = filterByTechnology(results, options.technology)
  }

  if (options.minSalary) {
    results = filterByMinSalary(results, options.minSalary)
  }

  if (options.workMode) {
    results = results.filter((job: Job) => job.workMode === options.workMode)
  }

  return results
}

// Función con valores por defecto
export function getRecentJobs(jobs: Job[], days?: number): Job[] {
  if (!days) days = 30

  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  return jobs.filter((job) => job.postedDate >= cutoffDate)
}
