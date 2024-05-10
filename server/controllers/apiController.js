const getHandler = (req, res) => {
  res.json({ message: 'GET request handled' });
};

const postHandler = (req, res) => {
  const data = req.body;
  res.json({ message: 'POST request handled', data });
};

module.exports = { getHandler, postHandler };
