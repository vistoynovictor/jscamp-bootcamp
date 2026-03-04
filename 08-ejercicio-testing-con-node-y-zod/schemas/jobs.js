import * as z from 'zod'

const jobSchema = z.object({
  titulo: z.string(
    { error: 'El titulo es obligatorio' }
  ).min(
    3, 'El titulo debe tener al menos 3 caracteres'
  ).max(
    100, 'El titulo no puede exceder los 100 caracteres'
  ),

  empresa: z.string(),
  ubicacion: z.string(),
  descripcion: z.string().optional(),

  data: z.object({
    technology: z.array(
      z.string().toLowerCase()
    ),

    modalidad: z.string().optional(),
    nivel: z.string().optional()
  }),

  content: z.object({
    description: z.string().optional(),
    responsibilities: z.string(),
    requirements: z.string().optional(),
    about: z.string().optional()
  }).optional()
})

export function validateJob(input) {
  return jobSchema.safeParse(input)
}

export function validatePartialJob(input) {
  return jobSchema.partial().safeParse(input)
}
