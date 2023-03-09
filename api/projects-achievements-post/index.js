// projects-achievements-post

const sql = require('mssql');

module.exports = async function (context, req) {
    context.log("projects-get processed a request");

    try {
      const database = await sql.connect(process.env.SQLConnectionString);

      const projectID = context.bindingData.id;
      const { Title, Date, AchievementTypeID } = req.body;

      const query =
      `
        INSERT INTO Achievement (Title, Date, ProjectID, AchievementTypeID)
        VALUES ('${Title}', '${Date}', ${projectID}, ${AchievementTypeID})
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