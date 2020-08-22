const express = require("express");
var request = require("request");
const ExpressError = require("./expressError");
const { stringToArr, calcMean, calcMedian, calcMode } = require("./helpers")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// homepage route
app.get("/", (request, res, next) => {
  return res.send("Express Routing");
});

// mean route
app.get("/mean", (request, res, next) => {
    let nums = request.query.nums;
    if (!nums) throw new ExpressError('Numbers not found', 404)
    let numsArr = stringToArr(nums);
    let meanResult = calcMean(numsArr);

    let result = {
        operation: "mean",
        result: meanResult,
    };
    res.send(result);
});

// median route
app.get("/median", (request, res, next) => {
    let nums = request.query.nums;
    if (!nums) throw new ExpressError("Numbers not found", 404);
    let numsArr = stringToArr(nums);
    let medianResult = calcMedian(numsArr);

    let result = {
        operation: "median",
        result: medianResult,
    };
    res.send(result);
});

// mode route
app.get("/mode", (request, res, next) => {
    let nums = request.query.nums;
    if (!nums) throw new ExpressError("Numbers not found", 404);
    let numsArr = stringToArr(nums);
    let modeResult = calcMode(numsArr);

    let result = {
        operation: "mode",
        result: modeResult,
    };
    res.send(result);
});


// route error handler
app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Requested route not Found", 404);
  return next(notFoundError);
});

// generic error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);

    return res.json({
        error: err,
        message: err.message,
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
