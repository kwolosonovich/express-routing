const express = require("express");
const ExpressError = require("./expressError");
var request = require("request");

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// statistical operation
const calcMean = (nums) => {
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
    total += nums[i];
    }
    mean = total / nums.length;
    return mean;
}

const calcMedian = (nums) => {
    const mid = Math.floor(nums.length / 2),
      numbers = nums.sort((a, b) => a - b);
        median =
          nums.length % 2 !== 0
            ? numbers[mid]
            : (numbers[mid - 1] + numbers[mid]) / 2;
    return median
}

const calcMode = (nums) => {
    var mode = {};
    var max = 0,
    count = 0;

    nums.forEach(function (e) {
      if (mode[e]) {
        mode[e]++;
      } else {
        mode[e] = 1;
      }

      if (count < mode[e]) {
        max = e;
        count = mode[e];
      }
    });

    return max;
}

const stringToArr = (nums) => {
  let numsArr = nums.split(',').map(Number)
  return numsArr
}

// homepage route
app.get("/", function (req, res) {
  return res.send("Express Routing");
});

// mean route
app.get('/mean', (req, res) => {
    let nums = request.query.nums
    let numsArr = stringToArr(nums)
    let meanResult = calcMean(numsArr)
    
    let result = {
      operation: 'mean',
      result: meanResult
    }
    res.send(result)
})


// error handler
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