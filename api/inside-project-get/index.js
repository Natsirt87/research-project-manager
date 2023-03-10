const sql = require('mssql');  
module.exports = async function (context, req) {
    context.log('inside-project-get processed a request');

    try {
        // connect to the database
        const database = await sql.connect(process.env.SQLConnectionString)
        // for the meantime, i will leave placeholder parameters 
        const projectID = context.bindingData.projectID;
        const query = 
        `
            SELECT *
            From ResearchProject
            WHERE ResearchProject.ID = ${projectID}
        `;
        // do we just want to generally display all project details?
        // this is all decision made with the front-end
        const result = await database.request().query(query);
        
        // close connection once request is fulfilled
        database.close();

        // send sucessful response with JSON
        context.res.json({
            status : 200,
            headers: {"Content-Type": "application/json"},
            body: result.recordsets
        });


    } catch (error) {
        context.res.json(
            {status : "500", body : "Failed to connect to database with error: " + error}
        );
    }
}