import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
	{
		nombre: {
			type: String,
			required: [true, 'El nombe es requerido 🙄'],
			minLength: [3, 'El nombre debe tener al menos 3 caracteres 🙄'],
			maxLength: [50, 'El nombre no puede tener más de 50 caracteres 😤'],
			trim: true,
		},
		email: {
			type: String,
			unique: [true, 'El email ya existe 😳'],
			lowercase: true,
			required: [true, 'El email es requerido 😒'],
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email no es valido 🫥'],
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'El passwod es requerido 🫣'],
			minLength: [8, 'El password debe tener al menos 8 caracteres 😩'],
			trim: true,
		},
		rol: {
			type: String,
			required: true,
			trim: true,
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
)


export default mongoose.model('User', userSchema);
