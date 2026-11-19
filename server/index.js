const express = require('express');
const dotenv = require('dotenv');
const path = require('node:path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = Number(process.env.PORT || 5000);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'fixmender-api' });
});

app.listen(port, () => {
  console.log(`FixMender API listening on port ${port}`);
});

module.exports = app;
