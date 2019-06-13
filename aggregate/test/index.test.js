const select=require('../index.js');
const {  testData,
         testData_id2,
         testData_minPlay4,
         testData_minPlay4TimeMerge} = require('./testData.js');


//fix issue with fetch
function mockFetch(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
}
fetch = mockFetch({});


//=======Begin tests
describe('Test different parameters for Select function', () => {

//select all items with no options
test('test: select all with no options', () => {
  expect(select(testData)).toEqual(testData);
});


// select only items with ID: 2
test('test: id = 2 ', () => {
  expect(select(testData,{id:2})).toEqual(testData_id2);
});


// select items with minPlayTime >= 4000
test('test: minPlayTime >=4000 ', () => {
  expect(select(testData,{minPlayTime:4000})).toEqual(testData_minPlay4);
});

//select items with minPlayTime >=4000 but merge them first
test('test: minPlayTime >=4000 and merge is true', () => {
  expect(select(testData,{minPlayTime:4000,merge:true})).toEqual(testData_minPlay4TimeMerge);
});


});
