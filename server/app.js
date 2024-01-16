const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const { getHandler, postHandler } = require('./controllers/apiController');

const app = express();
const server = require('http').createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
  }),
);

app.use('/api/getTest', getHandler);
app.use('/api/postTest', postHandler);

server.listen(PORT, async () => {
  console.log(`Server running on PORT ${PORT}`);
});
