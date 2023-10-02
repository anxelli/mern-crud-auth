import mongoose from 'mongoose'


const taskSchema = new mongoose.Schema(
	{
		titulo: {
			type: String,
			required: [true, 'El título es requerido 🙄'],
			trim: true,
		},
		descripcion: {
			type: String,
			required: [true, 'La descripción es requerida 😒'],
			trim: true,
		},
		fecha: {
			type: Date,
			default: Date.now,
			required: [true, 'La fecha es requerida 🤔'],
			trim: true,
		},
		autor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'El autor es requerido 🥸'],
			trim: true,
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
)


export default mongoose.model('Task', taskSchema);