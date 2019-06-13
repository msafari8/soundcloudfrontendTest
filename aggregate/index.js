/**
 * just for demonstration purpose for assignment
 * this function loads a json file and returns the content
 *
 *
 * @param {String} path to api urls
 */
function loadJson(path) {

    var results = fetch(path, {
        method: 'get'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    }).catch(function(err) {
        // handle error here
        console.log("Error:" + err);
    });
    return results;
}



/**
 * this function given certain options is used to filter array of objects 
 * and returns the results
 *
 *
 *
 * @param {Array.<Object>} items_data
 * @param {Object} options
 
 * @return {Array.<Object>} filtered data
 */

function select(items_data, options) {

    //if empty, return empty array
    if (!items_data.length) {
        return [];
    }

    // default options
    const options_default = {
        id: null,
        auto: null,
        minPlayTime: null,
        merge: false
    };

    //overwrite default options
    options = Object.assign({}, options_default, options);

    // shallow copy of original data
    let items = [...items_data];



    // lets check for merge && merge data first
    if (options.merge) {
        const itemsId = {};
        mergedItems = [];
        items.forEach((item) => {

            if (itemsId[item.id]) { //if item exists:

                // Get the previous item
                const prevItem = itemsId[item.id];

                //sum the playTime with new found item
                prevItem.playTime += item.playTime;

                //set the new property
                prevItem.auto = item.auto && prevItem.auto;

                // Remove the previous one
                mergedItems = mergedItems.filter(mergedItem => mergedItem.id !== item.id);

                // Add the previous item at new position
                mergedItems.push(prevItem);

            } else { //if item doesn't exists, add it:

                itemsId[item.id] = item;
                mergedItems.push(item);

            }
        });

        //set the merge results to items
        items = mergedItems;
    }




    // filter using all the other options if available

    items = items.filter((item) => {

        if (options.id && options.id !== item.id) return false;
        if (options.minPlayTime && options.minPlayTime > item.playTime) return false;
        if (options.auto !== null && options.auto !== item.auto) return false;
        return true;
    })



    return items;
}




// call json data
// do a quick test for select

loadJson('./sample-data.json')
    .then(function(JSON_Data) {
        console.log(
          select(JSON_Data, {
              merge: true,
              minPlayTime: 4000
          })
        );
    });




//module.exports=select; //remove comment for jest tests