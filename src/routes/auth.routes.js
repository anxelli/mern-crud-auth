import { Router } from 'express'

import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'
import {
	authRequired,
	authRol0
} from '../middlewares/validateToken.js'
import {
	register,
	login,
	logout,
	profile
} from '../controllers/auth.controller.js'


const router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)

router.post('/logout', logout)

router.get('/profile', authRol0, profile)


export default router;
