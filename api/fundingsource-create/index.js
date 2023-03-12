const sql = require('mssql');

module.exports = async function (context, req) {
    context.log("fundingsource-create processed a request");

    try {
      const database = await sql.connect(process.env.SQLConnectionString);

      const institutionID = req.body.institutionID;
      const amount = req.body.amount;
      const projectID = context.bindingData.id;
      const receivedDate = req.body.receivedDate;

      context.log(receivedDate);

      const query =
      `
        INSERT INTO FundingSource (
            InstitutionID, 
            Amount, 
            ProjectID, 
            ReceivedDate
        )
        VALUES (
            ${institutionID},
            ${amount},
            ${projectID},
            '${receivedDate}'
        )
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