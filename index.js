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

app.get('/task2B', (req, res) => {
    const fullname = req.query.fullname;
    const decodeFullname = decodeURIComponent(fullname);
    if (!decodeFullname || /[0-9]+/g.test(decodeFullname)) {
        res.end('Invalid fullname');
    }

    const words = decodeFullname.replace(/\s\s+/g, ' ').split(' ');

    if (words.length > 3) {
        res.end('Invalid fullname');
    } else {
        if (words.length == 1) {
            res.end(words[0]);
        } else if (words.length == 2) {
            const firstName = words[0].slice(0, 1);
            const familyName = words[1];
            res.end(`${familyName} ${firstName}.`);
        } else {
            const firstName = words[0].slice(0, 1);
            const middleName = words[1].slice(0, 1);
            const familyName = words[2];
            res.end(`${familyName} ${firstName}. ${middleName}.`);
        }
    }
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});
