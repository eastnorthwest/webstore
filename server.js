
const app = require('./config/common');

// setup subroutes
const adminRoutes = require('./routes/admin.js');
const userRoutes = require('./routes/user.js');
const registerRoutes = require('./routes/register.js');
const loginRoutes = require('./routes/login.js');
const logoutRoutes = require('./routes/logout.js');
const cartRoutes = require('./routes/cart.js');
const baseRoute = require('./routes/base.js');

app.use('/admin', adminRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/logout', loginRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/', baseRoute);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  console.log('Running on port ' + port)
});

