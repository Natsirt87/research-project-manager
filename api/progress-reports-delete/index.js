const sql = require('msql');  
module.exports = async function (context, req) {
    context.log('inside-project-delete processed a request');

    try {
        // connect to the database
        const database = await sql.connect(process.env.SQLConnectionString)
        const {projectID, progressID} = req.body;

        const query = 
        `
            DELETE FROM Progress
            WHERE ID = ${progressID} AND ProjectID = ${projectID}
        `;
        const result = await database.request().query(query);
        
        // close connection once request is fulfilled
        database.close();

        // send sucessful response with JSON
        context.res.json({status : 200});


    } catch (error) {
        context.res.json(
            {status : "500", body : "Failed to connect to database with error: " + error}
        );
    }
}