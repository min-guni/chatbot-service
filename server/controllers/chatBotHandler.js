const chatBotHandler = (req, res) => {
  setTimeout(() => {
    res.json({ message: '아무 말 ㅋㅋ' });
  }, 3000);
};

module.exports = { chatBotHandler };
