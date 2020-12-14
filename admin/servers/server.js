const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port =process.env.PORT || 3002;
const route = require('./route/index');

app.use(bodyParser.json());
app.use('/api', route);

app.listen(port, () => {
    console.log(`express is running on ${port}`);
})