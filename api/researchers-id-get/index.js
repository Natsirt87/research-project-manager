// researchers-id-get

const sql = require('mssql');

module.exports = async function (context, req) {
    context.log("projects-get processed a request");

    try {
      const database = await sql.connect(process.env.SQLConnectionString);

      const researcherID = context.bindingData.id;

      const query =
      `
        SELECT Researcher.FirstName AS Firstname, Researcher.LastName AS Lastname, 
               Researcher.Email AS Email, ResearcherDepartment.Name AS Department
        FROM Researcher
          JOIN ResearcherDepartment ON (ResearcherDepartment.ID = Researcher.DepartmentID)
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