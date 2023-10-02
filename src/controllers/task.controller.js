import Task from '../models/task.model.js'



export const getTasks = async (req, res) => {
	const tasks = await Task.find().populate('autor', ['nombre'])
	res.json(tasks)
}


export const getTasksByUser = async (req, res) => {
	const tasks = await Task.find({ autor: req.user.id }).populate('autor', ['nombre', 'email'])
	res.json(tasks)
}


export const getTask = async (req, res) => {
	const task = await Task.findById(req.params.id).populate('autor', ['nombre', 'email'])
	if(!task) return res.status(404).json({ message: 'No existe la tarea 🫥' })

	res.json(task)
}


export const createTask = async (req, res) => {
	const { titulo, descripcion, fecha, autor } = req.body

	const newTask = new Task({
		titulo,
		descripcion,
		fecha,
		autor: req.user.id
	})

	const savedTask = await newTask.save()
	res.json(savedTask)
}


export const updateTask = async (req, res) => {

	const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	}).populate('autor', ['nombre', 'email'])

	if(!task) return res.status(404).json({ message: 'No existe la tarea 🫥' })

	res.json(task)
}


export const deleteTask = async (req, res) => {
	const task = await Task.findByIdAndDelete(req.params.id)
	if(!task) return res.status(404).json({ message: 'No existe la tarea 🫥' })

	return res.sendStatus(204)
}