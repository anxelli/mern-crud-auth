import { z } from 'zod'

export const createTaskSchema = z.object ({
	titulo: z.string({
		required_error: 'El título es requerido 🙄'
	}),
	descripcion: z.string({
		required_error: 'La descripción es requerida 😒'
	}),
	fecha: z.string({
		required_error: 'La fecha es requerida 🤔'
	}).datetime('La fecha no es valida 🤥').optional(),
	autor: z.string({
		required_error: 'El autor es requerido 🥸'
	}).optional()
})