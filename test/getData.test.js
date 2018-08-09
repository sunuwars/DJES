const tape = require('tape');
const runDbBuild = require('../src/database/db_build');
const getData = require('../src/queries/getData');
// add postData here?

tape('tape is working', t => {
    t.equals(1,1,'one is one');
    t.end()
})