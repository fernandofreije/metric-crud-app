import app from './app';

const port = process.env.PORT ?? 8080;
app.listen(process.env.PORT, function () {
  console.log(`App is listening on port ${port} !`);
});
