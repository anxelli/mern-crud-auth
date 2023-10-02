import { z } from 'zod'


export const registerSchema = z.object ({
	nombre: z.string({
		required_error: 'El nombe es requerido 🙄'
	}).min(3, 'El nombre debe tener al menos 3 caracteres 🙄').max(50, 'El nombre no puede tener más de 50 caracteres 😤'),
	email: z.string({
		required_error: 'El email es requerido 😒'
	}).email('El email no es valido 🫥'),
	password: z.string({
		required_error: 'El passwod es requerido 🫣'
	}).min(8, 'El password debe tener al menos 8 caracteres 😩'),
	rol: z.string({
		required_error: 'El rol es requerido 😅'
	})
})


export const loginSchema = z.object ({
	email: z.string({
		required_error: 'El email es requerido 😒'
	}).email('El email no es valido 🫥'),
	password: z.string({
		required_error: 'El passwod es requerido 🫣'
	}).min(8, 'El password debe tener al menos 8 caracteres 😩'),
})