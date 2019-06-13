const testData=[
    { "id": 8, "playTime":  500, "auto": false },
    { "id": 7, "playTime": 1500, "auto": true  },
    { "id": 1, "playTime":  100, "auto": true  },
    { "id": 7, "playTime": 1000, "auto": false },
    { "id": 7, "playTime": 2000, "auto": false },
    { "id": 2, "playTime": 2000, "auto": true  },
    { "id": 2, "playTime": 2000, "auto": true  }
];


//expected results based on test data given in readme.md

const testData_id2=[
    { "id": 2, "playTime": 2000, "auto": true   },
    { "id": 2, "playTime": 2000, "auto": true  }
];

const testData_minPlay4=[];

const testData_minPlay4TimeMerge=[
    { "id": 7, "playTime": 4500, "auto": false },
    { "id": 2, "playTime": 4000, "auto": true  }
];

module.exports={
testData,
testData_id2,
testData_minPlay4,
testData_minPlay4TimeMerge
};