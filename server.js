const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// add a basic route
app.get('/ping', function(req, res){
    res.json({'status': 'success', 'message': 'pong'});
});

// start the server
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});