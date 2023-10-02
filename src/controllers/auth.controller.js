import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

import { createAccessToken } from '../libs/jwt.js'


// Definimos una función asincrónica llamada 'register' que se encarga de registrar un nuevo usuario
export const register = async (req, res) => {

	const { nombre, email, password, rol } = req.body
	
	try {
		const hashedPassword = await bcrypt.hash(password, 12)

		const newUser = new User({
			nombre,
			email,
			password: hashedPassword,
			rol
		})

		const userSaved = await newUser.save()

		const token = await createAccessToken({ id: userSaved._id })
	
		res.cookie('token', token)

		res.json({ message: 'Usuario creado con éxito! 🥳' })
	
		console.log({
			mensaje: 'Usuario creado con éxito! 🥳',
			id: userSaved._id,
			nombre: userSaved.nombre,
			email: userSaved.email,
			rol: userSaved.rol,
			createdAt: userSaved.createdAt,
			updatedAt: userSaved.updatedAt
		})
	} catch (error) {
		console.log(`😱 Error al crear el usuario: ${error} 🙄`)
		res.status(500).json({ '😱 Error al crear el usuario:': error.message })
	}
}


// Definimos una función asincrónica llamada 'login' que se encarga de iniciar sesión con un usuario existente
export const login = async (req, res) => {
	
	const { email, password } = req.body
	
	try {
		
		const userFound = await User.findOne({ email })
		if (!userFound) return res.status(400).json({ message: 'Usuario no encontado! 🤥' })
	
		const isMatch = await bcrypt.compare(password, userFound.password)
		if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas! 😒' })
	
		const token = await createAccessToken({ id: userFound._id })
		res.cookie('token', token);
		res.json({ message: 'Sesión iniciada con éxito! 🥳' })
	
		console.log({
			mensaje: 'Sesión iniciada con éxito! 🥳',
			id: userFound._id,
			nombre: userFound.nombre,
			email: userFound.email,
			rol: userFound.rol,
			createdAt: userFound.createdAt,
			updatedAt: userFound.updatedAt
		})
	} catch (error) {
		console.log(error);
		res.status(500).json({ '😱 Error al iniciar sesión:': error.message })
	}
}


// Definimos una función llamada 'logout' que se encarga de cerrar sesión
export const logout = (req, res) => {
	res.cookie('token', '', { expires: new Date(0) })
	
	return res.sendStatus(200)
}


// Definimos una función asincrónica llamada 'profile' que se encarga de obtener el perfil del usuario autenticado
export const profile = async (req, res) => {
	const userFound = await User.findById(req.user.id)
	if (!userFound) return res.status(400).json({ message: 'Usuario no encontado! 😡' })
	
	return res.json({
		id: userFound._id,
		nombre: userFound.nombre,
		email: userFound.email,
		rol: userFound.rol,
		createdAt: userFound.createdAt,
		updatedAt: userFound.updatedAt
	})
}
