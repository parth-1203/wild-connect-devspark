const express = require('express');
const bodyParser = require('body-parser');
const { writeJob } = require('./util');
const fs = require('fs').promises;
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// Handle form submission
app.post('/postjob', async (req, res) => {
  const { jobTitle, location, jobDescription, qualifications, applicationDeadline } = req.body;

  // Create an object with the form data
  const job = {
    jobTitle,
    location,
    jobDescription,
    qualifications,
    applicationDeadline,
  };

  await writeJob(job);
  // redirect to another page, successful response or not
  res.redirect("success.html");
});

app.get('/apply', async (_, res) => {
    const jsData = await fs.readFile('data.json','utf-8');
    res.send(jsData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server has started: http://localhost:${PORT}`));
