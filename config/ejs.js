/* setup ejs */

const setup = (app, express) => {
  app.set('view engine', 'ejs'); // set up ejs for templating
  app.use(express.static('public'))
  return app;
}

module.exports = setup;
