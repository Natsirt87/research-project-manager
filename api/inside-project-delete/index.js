const sql = require('mssql');  
module.exports = async function (context, req) {
    context.log('inside-project-delete processed a request');

    try {
        // connect to the database
        const database = await sql.connect(process.env.SQLConnectionString)
        const projectID = context.bindingData.projectID;

        let query = 
        `
            DELETE FROM FundingSource
            WHERE ProjectID = ${projectID}
        `;
        await database.request().query(query);

        query = 
        `
            DELETE FROM Progress
            WHERE ProjectID = ${projectID}
        `;
        await database.request().query(query);

        query = 
        `
            DELETE FROM ResearchersProject
            WHERE ProjectID = ${projectID}
        `;
        await database.request().query(query);

        query = 
        `
            DELETE FROM Achievement
            WHERE ProjectID = ${projectID}
        `;
        await database.request().query(query);

        query = 
        `
            DELETE FROM ResearchProject
            WHERE ID = ${projectID}
        `;
        await database.request().query(query);
        
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