const tape = require('tape');
const runDbBuild = require('../src/database/db_build');
const getData = require('../src/queries/getData');
// add postData here?

tape('tape is working', t => {
    t.equals(1,1,'one is one');
    t.end()
})

tape('test get data', t => {
    runDbBuild((err) => {
        t.error(err, 'No Error');
        const expected = 1;
        getData((err, gotdata) => {
        if (err) console.log(err);    
        t.deepEqual(gotdata[0].id, expected, 'getData should return itself');
        t.end();
    });      
    })
});