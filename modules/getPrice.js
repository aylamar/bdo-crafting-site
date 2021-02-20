var exports = module.exports;

const fetch = require('node-fetch');

async function getPrice(id) {
    var response = await fetch(`https://bdo-api-helper.herokuapp.com/marketplace-clone/item-info/${id}?region=na`);
    var test = await response.json();
    test = test.detailList[0].pricePerOne;

    return await test;


    // var dataset; // #1 Variable is declared
    // var response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    // //console.log(await response.json()); // this line will "wait" for the previous to be completed
  
    // return await response.json();
    // https://old.reddit.com/r/learnjavascript/comments/9zo92w/assign_fetch_response_to_variable/
      
            //=> {hello: 'world'}
    
        
/*        request.get(`https://bdo-api-helper.herokuapp.com/marketplace-clone/item-info/${id}?region=na`, (err, res, body) => {
            if (err) {
                console.log(err);
                return 0;
            }
            obj = JSON.parse(body);
            console.log(obj.detailList[0].pricePerOne);
            return obj.detailList[0].pricePerOne;
        });
    } catch {
        console.log('catch');
    }*/
}

module.exports = getPrice;