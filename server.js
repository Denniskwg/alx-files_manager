import express from 'express';
import injectRoutes from './routes';

const app = express();

const port = process.env.port || '5000';

injectRoutes(app);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

module.exports = app;
