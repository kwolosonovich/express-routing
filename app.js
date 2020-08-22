const express = require("express");
const app = express();

app.use(express.json())

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


