const axios = require('axios');
const console = require('../utils/logger').console;

module.exports = {
  async solveCardTask(req, res) {
    try {
      const solution = await axios.get(process.env.YOUCOM_API_URL, {
        params: {
          key: process.env.YOUCOM_API_TOKEN,
          inputs: `suggest a task solution: ${req.query.task}`,
        },
      });
      console.log(
        `\n----------\n${new Date()} - ${req.query.email}\nrequest - suggest a task solution: ${
          req.query.task
        }\nresponse:\n${solution.data.generated_text}`
      );
      res.status(200).json(solution.data);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },
  async summarizeCardDescription(req, res) {
    try {
      const summarization = await axios.get(process.env.YOUCOM_API_URL, {
        params: {
          key: process.env.YOUCOM_API_TOKEN,
          inputs: `summarize this text in 400 symbols: ${req.query.text}`,
        },
      });
      console.log(
        `\n----------\n${new Date()} - ${req.query.email}\nrequest - summarize this text in 400 symbols: ${
          req.query.text
        }\nresponse:\n${summarization.data.generated_text}`
      );
      res.status(200).json(summarization.data);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },
};
