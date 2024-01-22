const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const { getHandler, postHandler } = require('./controllers/apiController');
const { chatBotHandler } = require('./controllers/chatBotHandler');
const { lectureHandler } = require('./controllers/lectureHandler');
const { savedLectureHandler } = require('./controllers/savedLectureHandler');

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
app.use('/api/chatBot', chatBotHandler);
app.use('/api/saved-lecture', savedLectureHandler); // 나중에 user 하면 바꿀 예정
app.use('/api/lecture', lectureHandler);

server.listen(PORT, async () => {
  console.log(`Server running on PORT ${PORT}`);
});
