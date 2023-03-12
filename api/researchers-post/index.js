const sql = require('mssql');

module.exports = async function (context, req) {
  context.log("researchers-post processed a request");

  try {
    const database = await sql.connect(process.env.SQLConnectionString);

    const {firstName, lastName, email, departmentId} = req.body;

    const query =
      `
      INSERT INTO Researcher (FirstName, LastName, Email, DepartmentID)
      VALUES ('${firstName.replace("'", "''")}', '${lastName.replace("'", "''")}', '${email.replace("'", "''")}', ${departmentId})
      `;

    await database.request().query(query);

    database.close();

    context.res.json({
      status: 200
    });
  } catch (error) {
    context.res = {
      status: 500,
      body: "Failed to connect to database with error: " + error
    };
  }
};
