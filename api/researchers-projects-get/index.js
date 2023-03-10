const sql = require('mssql');

module.exports = async function (context, req) {
    context.log("researchers-projects-get processed a request");

    try {
      const database = await sql.connect(process.env.SQLConnectionString);

      const researcherId = context.bindingData.id;

      const query =
      `
      SELECT RP.ID, RP.Title, RP.Description, RP.StartDate, RP.EndDate, RP.Budget
      FROM ResearchProject RP
      JOIN ResearchersProject RSP ON (RSP.ProjectID = RP.ID)
      JOIN Researcher R ON (R.ID = RSP.ResearcherID)
      WHERE R.ID = '${researcherId}'      
      `;

      const result = await database.request().query(query);

      database.close();

      context.res.json({
        status: 200,
        headers: {"Content-Type": "application/json"},
        body: result.recordsets
      })

    } catch (error) {
      context.res.json({
        status: 500,
        body: "Failed to connect to database with error: " + error
      });
    }
}

