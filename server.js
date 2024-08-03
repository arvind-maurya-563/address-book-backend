const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const sequelize = require('./config/db');
const verifySecureKey = require('./middleware/checkScurityMiddleware');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>{
  res.send('server is running');
})
app.use(verifySecureKey);

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
