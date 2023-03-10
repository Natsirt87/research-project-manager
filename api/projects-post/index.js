const sql = require('mssql');

module.exports = async function (context, req) {
  context.log("projects-post processed a request");

  try {
    const database = await sql.connect(process.env.SQLConnectionString);

    const {title, description, startDate, endDate, budget} = req.body;

    const query =
      `
      INSERT INTO ResearchProject (Title, Description, StartDate, EndDate, Budget)
      VALUES (
        '${title.replace("'", "''")}', 
        '${description.replace("'", "''")}', 
        '${startDate}', 
        ${endDate != undefined ? `'${endDate}'` : "NULL"}, 
        ${budget})
      `;

    await database.request().query(query);

    database.close();

    context.res = {
      status: 200
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: "Failed to connect to database with error: " + error
    };
  }
};
