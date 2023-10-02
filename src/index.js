import app from './app.js'
import { PORT, URL } from './config.js'
import { connectDB } from './db.js'


connectDB()

app.listen(PORT)


console.log(`>>> Servidor respondiendo en ${URL}:${PORT} 🚀`)
