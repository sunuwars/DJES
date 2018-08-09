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
        const expected = '';
        getData('SELECT * FROM users', (err, gotdata) =>
        t.deepEquals(gotdata, expected, 'getData should return itself'));
        t.end();
    })
})