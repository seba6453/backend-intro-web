const dotenv = require('dotenv');

dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};


export const linkMongo = {
  secret: process.env.MONGO_KEY,
};