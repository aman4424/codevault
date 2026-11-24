const express =require("express");
const authRoutes=require('./routes/authRoutes');
const notebookRoutes=require('./routes/notebookRoutes')
const cors = require('cors');
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // your React dev server
  credentials: true // if using cookies/sessions
}));




app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/notebooks',notebookRoutes);

module.exports=app;