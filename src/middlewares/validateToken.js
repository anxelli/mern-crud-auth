import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import { TOKEN_SECRET } from '../config.js'


export const authRequired = (req, res, next) => {
	const { token } = req.cookies;
	if (!token) return res.status(401).json({ message: 'Sin token, acceso denegado! 🤬' })
	
	jwt.verify(token, TOKEN_SECRET, (err, user) => {
		
		if (err) return res.status(403).json({ message: 'Token inválido... 😱' })
	
		req.user = user
	
		next()
	})
}


export const authRol0 = (req, res, next) => {
	const { token } = req.cookies
	if (!token) return res.status(401).json({ message: 'Sin token, acceso denegado! 🤬' })

	jwt.verify(token, TOKEN_SECRET, async (err, user) => {
		if (err) return res.status(403).json({ message: 'Token inválido... 😱' })
		
		req.user = user
		
		const { rol } = await User.findById(user.id).select('rol')

		if (rol !== 'Chalan') return res.status(403).json({ message: 'No tienes permiso de estar aquí! 😾' })

		next()
	})
}