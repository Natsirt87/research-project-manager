const sql = require('mssql');

module.exports = async function (context, req) {
    context.log("researchers-achievements-get processed a request");

    try {
      const database = await sql.connect(process.env.SQLConnectionString);

      const researcherId = context.bindingData.id;

      const query =
      `
        SELECT A.ID, A.Title, A.Date, A.AchievementTypeID
        FROM Achievement A
        JOIN ResearchersProject RP ON (RP.ProjectID = A.ProjectID)
        JOIN Researcher R ON (R.ID = RP.ResearcherID)
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