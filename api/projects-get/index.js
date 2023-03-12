const sql = require('mssql');

module.exports = async function (context, req) {
    context.log("projects-get processed a request");

    try {
      const database = await sql.connect(process.env.SQLConnectionString);

      const query =
      `
        SELECT R.ID, R.Title, R.Description, R.StartDate, R.EndDate, R.Budget, 
          P.PercentageComplete AS Progress, P.TotalSpending AS Spending
        FROM ResearchProject R
          LEFT JOIN (
            SELECT ProjectID, MAX(ID) AS ProgressID
            FROM (  
                    SELECT ProjectID, ID, MAX(ProgressDate) OVER (PARTITION BY ProjectID) AS NewestDate
                    FROM Progress
                  ) AS Sub
            GROUP BY ProjectID, NewestDate
          ) AS ProgressNewest ON (ProgressNewest.ProjectID = R.ID)
          
          LEFT JOIN Progress P ON (P.ID = ProgressNewest.ProgressID)
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