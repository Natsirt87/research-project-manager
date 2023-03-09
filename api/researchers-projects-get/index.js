const sql = require('mssql');

module.exports = async function (context, req) {
    context.log("researchers-projects-get processed a request");

    try {
      const database = await sql.connect(process.env.SQLConnectionString);

      const researcherId = context.bindingData.id;

      const query =
      `
      SELECT *
      FROM ResearchProject
      JOIN ResearchersProject ON (ResearchersProject.ProjectID = ResearchProject.ID)
      JOIN Researcher ON (Researcher.ID = ResearchersProject.ResearcherID)
      WHERE Researcher.ID = '${researcherId}'      
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

