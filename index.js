const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const productRoute = require('./src/routes/product.route');
const modelRoute = require('./src/routes/model.route');
const categoryRoute = require('./src/routes/category.route');
const userRoute = require('./src/routes/user.route');
const imageRoute = require('./src/routes/image.route');

app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));

app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
  })
);

app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
  })
);

//ROUTES
app.use('/api', productRoute);
app.use('/api', modelRoute);
app.use('/api', categoryRoute);
app.use('/api', userRoute);
app.use('/api', imageRoute);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Apple-Store API.',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});
