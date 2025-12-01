const express = require('express');
const rateLimiter = require('./rateLimiter');
const app = express();


app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use(rateLimiter(10, 60*1000));

app.get("/", (req, res) => {
    res.send(" Rate-limiter working");
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});


