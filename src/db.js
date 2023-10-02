import mongoose from 'mongoose'

import { MONGODB_URI } from './config.js'


export const connectDB = async () => {
	try {
		await mongoose.connect(MONGODB_URI)
		console.log(`>>> Base de datos conectada 🛰️`)
	} catch (error) {
		console.log(`😱 Error al conectar a la base de datos: ${error} 🤬`);
	}
}
