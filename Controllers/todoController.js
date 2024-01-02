const { URLModel } = require("../Model/todo.model");

const shortid = require("shortid");

const HandleUrl = async (req, res) => {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortID = shortid();

  await URLModel.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
};
module.exports = { HandleUrl };
