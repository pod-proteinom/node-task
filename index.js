'use strict';
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/task2A', function(req, res) {
    const a = 0 | parseInt(req.query.a);
    const b = 0 | parseInt(req.query.b);
    const result = a + b;
    res.end(result.toString());
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});
