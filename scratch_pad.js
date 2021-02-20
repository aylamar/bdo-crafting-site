// Promise Example
let p = new Promise((resolve, reject) => {
    let a = 1 + 1;
    if (a == 2) {
        resolve('Success');
    } else {
        reject('Failed');
    }
});

p.then((message) => {
    console.log('This is a success ' + message);
}).catch((message) => {
    console.log('This is a fail' + message);
});


// async example
async function doThing() {
    // put everything that can fail in try
    try {
        // wait at await until it is finished
        const response = await makeRequest();
        console.log('Response Recieved');
        const processedResponse = await processRequest(response);
        console.log(processedResponse);    
    } catch (err) {
        console.log(err);
    }
}

// working fetch request
const request = require('request');

request.get('https://bdo-api-helper.herokuapp.com/marketplace-clone/item-info/9065?region=na', (err, res, body) => {
    if(err) {
        return console.log(err);
    }
    var obj = JSON.parse(body);
    console.log(obj.detailList[0].pricePerOne);
});
