const express = require('express');
const path = require('path');
const api = require('./Routes/apiRoutes');
const html = require('./Routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Develop/public'));
app.use('/api', api);
app.use('/', html);

// set up routes for /notes as referred to in the provided code. 


app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`)
);




// localhost:3001/api/note/4