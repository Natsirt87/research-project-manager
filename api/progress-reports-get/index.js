const sql = require('mssql');  
module.exports = async function (context, req) {
    context.log('progress-reports-get processed a request');

    try {
        // connect to the database
        const database = await sql.connect(process.env.SQLConnectionString)

        const projectID = context.bindingData.projectID;
        // display all progress done of this project
        const query = 
        `
            SELECT P.ID, P.Description, P.PercentageComplete, P.ProgressDate, P.TotalSpending
            FROM Progress P
                JOIN ResearchProject RP ON (P.ProjectID = RP.ID)
            WHERE RP.ID = ${projectID}
        `;
        const result = await database.request().query(query);
        
        // close connection once request is fulfilled
        database.close();

        // send sucessful response with JSON
        context.res.json({
            status: 200,
            headers: {"Content-Type": "application/json"},
            body: result.recordset
          })


    } catch (error) {
        context.res.json(
            {status : "500", body : "Failed to connect to database with error: " + error}
        );
    }
}