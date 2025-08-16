const mongoose = require('mongoose');
const { default: logger } = require('../utils/logger');
require('dotenv').config({path:"../.env", quiet: true });

const DBusername = process.env.MongoUsername;
const DBpassword = process.env.MongoPassword;
const DBIPaddress = process.env.MongoIP;
const DBname = process.env.DatabaseName;

if (!DBusername || !DBpassword || !DBIPaddress || !DBname) {
 logger.error(" Missing environment variables related to Database. Check your .env file.");
  process.exit(1);
}

const MongoURI = `mongodb://${DBusername}:${DBpassword}@${DBIPaddress}:27017/${DBname}?authSource=admin&directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0`;


mongoose.connect(MongoURI)
  .then(() => logger.info('MongoDB connected successfully'))
  .catch((err) => logger.error(' MongoDB connection error'));
