const sql = require('mssql');  
module.exports = async function (context, req) {
    context.log('progress-reports-create processed a request');

    try {
        // connect to the database
        const database = await sql.connect(process.env.SQLConnectionString)

        const { description, percentageComplete, progressDate, totalSpending } = req.body;
        const projectID = context.bindingData.projectID;

        // display all progress done of this project
        const query = 
        `
            INSERT INTO Progress (ProjectID, Description, PercentageComplete, ProgressDate, TotalSpending)
            VALUES (${projectID}, '${description}', ${percentageComplete}, '${progressDate}', ${totalSpending})
        `;
        await database.request().query(query);
        
        // close connection once request is fulfilled
        database.close();

        // send sucessful response with JSON
        context.res.json({
            status : 201 // new resource created
        });


    } catch (error) {
        context.res.json(
            {status : "500", body : "Failed to connect to database with error: " + error}
        );
    }
}