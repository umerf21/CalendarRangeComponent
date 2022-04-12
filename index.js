const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));

app.get('/', (req, res) => {
  res.send('Hello Worldz');
});

app.get('/api/los-rules', (req, res) => {
  res.send([
    { day: '2022-04-20', LOS: 1 },
    { day: '2022-04-21', LOS: 2 },
    { day: '2022-04-22', LOS: 2 },
  ]);
});

app.get('/api/unavailable-dates', (req, res) => {
  res.send(['2022-04-18', '2022-04-19']);
});
