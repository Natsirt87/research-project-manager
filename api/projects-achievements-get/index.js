// projects-achievements-get

const sql = require('mssql');

module.exports = async function (context, req) {
    context.log("projects-get processed a request");

    try {
      const database = await sql.connect(process.env.SQLConnectionString);

      const projectID = context.bindingData.id;

      const query =
      `
        SELECT Achievement.ID AS ID, Achievement.Title AS Title, 
               Achievement.Date AS Date, Achievement.AchievementTypeID AS Type
        FROM ResearchProject
          JOIN Achievement ON (Achievement.ProjectID = ResearchProject.ID)
        WHERE ResearchProject.ID = ${projectID}
      `;

      const result = await database.request().query(query);

      database.close();

      context.res.json({
        status: 200,
        headers: {"Content-Type": "application/json"},
        body: result.recordset
      })

    } catch (error) {
      context.res.json({
        status: 500,
        body: "Failed to connect to database with error: " + error
      });
    }
}