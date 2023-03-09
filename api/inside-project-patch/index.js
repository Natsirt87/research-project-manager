const sql = require('mssql');  
module.exports = async function (context, req) {
    context.log('inside-project-patch processed a request');

    try {
        // connect to the database
        const database = await sql.connect(process.env.SQLConnectionString)

        const { title, description, startDate, endDate, budget } = req.body;
        const projectID = context.bindingData.projectID;

        const query = 
        `
            UPDATE ResearchProject
            SET title = '${title}',
                description = '${description}',
                startDate = '${startDate}',
                endDate = ${`'${endDate}'` ?? "NULL"},
                budget = ${budget}
            WHERE ResearchProject.ID = ${projectID}
        `;
        // do we just want to generally display all project details?
        // this is all decision made with the front-end
        await database.request().query(query);
        
        // close connection once request is fulfilled
        database.close();

        // send sucessful response with JSON
        context.res.json({
            status : 200
        });


    } catch (error) {
        context.res.json(
            {status : "500", body : "Failed to connect to database with error: " + error}
        );
    }
}