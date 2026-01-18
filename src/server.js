import app from './app.js';
import { connectDatabase } from './config/database.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDatabase();
}



app.listen(PORT, () => {
  console.log(` Servidor ejecutandose en el puerto ${PORT}`);
});


startServer();