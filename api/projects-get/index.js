module.exports = async function (context, req) {
    context.log("Project GET processed a request");

    context.res.json({
      status: 200,
      body: "This endpoint will return paginated research project data."
    });
}