const swaggerjsDoc=require('swagger-jsdoc');

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"ExpleoInsurance",
            version:"1.0.0",
            description:"Expleosurance application with list of all API's"
        },
        server:[
            {
                url:"https://localhost:5000"
            }
        ]
    },
    apis:[".//Routes/*.js"]
}

const swaggerSpec=swaggerjsDoc(options);
module.exports=swaggerSpec;