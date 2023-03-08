const sql = require('msql');  
module.exports = async function (context, req) {
    context.log('inside-project-patch processed a request');

    try {
        // connect to the database
        const database = await sql.connect(process.env.SQLConnectionString)
        // for the meantime, i will leave placeholder parameters 
        // cast int id to string before we query
        var projectID = "WHERE ResearchProject.ID = " + "<temp id>"
        var title = "title = " + "<temp title>,"
        var description = "description = " +"<temp description>,"
        // JS uses timestamps, just need to find a way to get user parameters
        // then convert parameters into time stamps using Date class()
        var startDate =  "startDate = "+ "<temp start date>,"
        // this is nullable, but JS and frameworks aren't a fan
        // of unused variables. how can we deal with this?
        // var endDate = "<temp end date>,"
        // does JS support money types?
        var budget = "budget = " + "<temp budget> \n"
        const query = 
        `
            UPDATE FROM ResearchProject
            SET
        `;
        query += title;
        query += description;
        query += startDate;
        query += budget;
        query += (projectID + ';');
        // do we just want to generally display all project details?
        // this is all decision made with the front-end
        const result = await database.request().query(query);
        
        // close connection once request is fulfilled
        database.close();

        // send sucessful response with JSON
        context.res.json({status : 200, 
        headers : {"Content Type" : "application/json"}, 
        body : result.recordset});


    } catch (error) {
        context.res.json(
            {status : "500", body : "Failed to connect to database with error: " + error}
        );
    }
}