// researchers-id-patch

const sql = require('mssql');

module.exports = async function (context, req) {
    context.log("projects-get processed a request");

    try {
      const database = await sql.connect(process.env.SQLConnectionString);

      const researcherID = context.bindingData.id;
      const { Email, DepartmentID } = req.body;

      const query =
      `
        UPDATE Researcher
        SET Email = '${Email}', DepartmentID = ${DepartmentID}
        WHERE Researcher.ID = ${researcherID}
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