const express = require('express');
const app = express();
const session = require('express-session');
const ejs = require('ejs');
const port = process.env.PORT || 3000;

require('./config/ejs.js')(app, express);

const adminRoutes = require('./routes/admin.js');
const userRoutes = require('./routes/user.js');
const authRoutes = require('./routes/auth.js');
const cartRoutes = require('./routes/cart.js');
const baseRoute = require('./routes/base.js');

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/', baseRoute);

app.listen(port, (err) => {
  console.log('Running on port ' + port)
});

