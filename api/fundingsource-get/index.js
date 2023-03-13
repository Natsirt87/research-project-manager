const sql = require('mssql');

module.exports = async function (context, req) {
    context.log("fundingsource-get processed a request");

    try {
      const database = await sql.connect(process.env.SQLConnectionString);

      const projectID = context.bindingData.id;

      const query =
      `
        SELECT F.ID, I.Name AS Institution, F.Amount, F.ReceivedDate
        FROM FundingSource F
          JOIN Institution I ON (I.ID = F.InstitutionID)
        WHERE F.ProjectID = ${projectID}
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

// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };
// }