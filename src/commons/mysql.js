import { BadRequestException ,createMessageError} from './errors/exceptions'

var mysql = require('mysql');
const connection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'password',
    database: 'mambu'
});
connection.connect((err) => {
    if(err) throw err
    console.log('Connected MySQL')
})

const insertClient = async(idFinanciera,encodedKey,state,creationDate,lastModifiedDate,approvedDate,dateOperation,idOperation) =>{

    const query = `INSERT INTO clientes (idFinanciera,encodedKey,state,creationDate,lastModifiedDate,approvedDate,dateOperation,idOperation) 
                    VALUES(${idFinanciera},'${encodedKey}','${state}','${creationDate}','${lastModifiedDate}','${approvedDate}',
                    '${dateOperation}',${idOperation})`
    connection.query(
        query,
        function(err, result) {
       if(err != null){
           console.log("regresando false")
            return false;  
        }
        
        console.log("regresando true", result)
        return true; 
    })
} 

module.exports = {
    connection,
    insertClient
}