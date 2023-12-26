import mongoose from 'mongoose';
import config from '../config/config.js';


export const init = async () => {
  try {
    const URI = config.db.mongodbUri;
    await mongoose.connect(URI);
    console.log('Database connected 🚀');   
  } catch (error) {
    console.error('Ah ocurrido un error al intentar conectarnos a la DB', error.message);
  }
}


// MongoDb Atlas
// user: developer
// pass: LeuUQkqrnaBPzQ0c
// mongodb+srv://developer:LeuUQkqrnaBPzQ0c@cluster0.ssusme2.mongodb.net/?retryWrites=true&w=majority