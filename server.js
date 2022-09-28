import app from './app';

const port = process.env.APP_PORT || 3001;

app.listen(port, () => {
  console.log();
  console.log('Escutando na posta ', port);
  console.log('CTRL + Clique -> https://localhost:3001');
});
