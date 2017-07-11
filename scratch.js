const express = require('express');
const app = express();
const session = require('express-session');
//
// const adminRoutes = require('./routes/admin.js');
// const userRoutes = require('./routes/user.js');
// const authRoutes = require('./routes/auth.js');
// const cartRoutes = require('./routes/cart.js');
//
// app.use('/admin', adminRoutes);
// app.use('/auth', authRoutes);
// app.use('/user', userRoutes);
// app.use('/cart', cartRoutes);

app.use(session({'resave': false, 'saveUninitialized': true, 'secret': 'secret', cookie: {maxAge: 1000 * 60 * 60}}));

app.get('/test', (req, res, next) => {
  console.log(req.sessionID);
  res.send('<a href="/">Link</a>');
})

app.get('/', (req, res, next) => {
  console.log(req.sessionID);
  res.send('<a href="/test">Link</a>');
  next();
})

app.listen(3000, (err) => {
  console.log('Running on port 3000')
});

