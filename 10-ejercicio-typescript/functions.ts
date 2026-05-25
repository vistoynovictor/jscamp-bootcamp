import type { ExperienceLevel, Technology } from './types.ts'
import type { JobSearchService } from './interfaces.ts'
import type { Job } from './objects.ts'

// Una cosa que podemos hacer es:
export const filterByExperience: JobSearchService['filterByExperience'] = (jobs, level) => {
  return jobs.filter((job: Job) => job.experienceLevel === level)
}

export function filterByExperience2(jobs: Job[], level: ExperienceLevel): Job[] {
  return jobs.filter((job: Job) => job.experienceLevel === level)
}

// Función para filtrar por tecnología
export function filterByTechnology(jobs: Job[], tech: Technology): Job[] {
  return jobs.filter((job: Job) => job.technologies.includes(tech))
}

// Función para filtrar por salario mínimo
export function filterByMinSalary(jobs: Job[], minSalary: number): Job[] {
  return jobs.filter((job: Job) => job.salary !== undefined && job.salary >= minSalary)
}

// Función para buscar por texto
export function searchJobs(jobs: Job[], searchTerm: string) {
  const term = searchTerm.toLowerCase()
  return jobs.filter(
    (job: Job) => job.title.toLowerCase().includes(term) || job.description.toLowerCase().includes(term)
  )
}
