const express = require('express');
const { default: logger } = require('./utils/logger');
const swaggerUI=require('swagger-ui-express')
const swaggerSpec=require('./swaggerConfig')

const cors = require('cors');
require('dotenv').config({quiet:true});
require('./DB/DBconfig');



//Route for login users
const userRouter=require('./Routes/UserRoutes');
const clientRouter=require('./Routes/ClientRoutes');



// const ContactRouter=require('./Routes/ContactRoutes')
// const PolicyRouter=require('./Routes/PolicyRoutes')

const app = express();
const PORT = process.env.PORT || 5000;
app.use('/api',swaggerUI.serve,swaggerUI.setup(swaggerSpec))
app.use(cors());
app.use(express.json());


app.use(userRouter);
app.use(clientRouter);



  
const IPaddress=process.env.IPaddress;
                    app.listen(PORT,() => {
                    logger.info(`Server is running on ${IPaddress}:${PORT}`);
                        logger.info(`Swagger document is running at ${IPaddress}:${PORT}/api`);
                    });


