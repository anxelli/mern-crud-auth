import { Router } from 'express'

import { validateSchema } from '../middlewares/validator.middleware.js'
import { createTaskSchema } from '../schemas/task.schema.js'
import {
	authRequired,
	authRol0
} from '../middlewares/validateToken.js'
import {
	getTasksByUser,
	getTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask
} from '../controllers/task.controller.js'


const router = Router()

router.get('/tasksU', authRol0, getTasksByUser)
router.get('/tasks', authRol0, getTasks)
router.get('/tasks/:id', authRol0, getTask)
router.post('/tasks', authRol0, validateSchema(createTaskSchema), createTask)
router.put('/tasks/:id', authRol0, updateTask)
router.delete('/tasks/:id', authRol0, deleteTask)


export default router;
