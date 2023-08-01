const notFound = (req,res,next) => {
    const error = new Error('notFound : ${req.orignalUrl}');
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode);
    res.json({
        massage: err?.massage,
        stack: err?.stack,
    });
};
module.exports = {errorHandler, notFound};