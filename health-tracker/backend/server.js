const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Health = require('./models/Health.js');
const symptomCheckerRoute = require('./routes/SymptomChecker'); // ✅ ADD THIS
require('dotenv').config(); // to load .env

const app = express();
app.use(cors());
app.use(express.json());


// ✅ Use symptom checker route here
app.use('/api/symptoms', symptomCheckerRoute);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ Connection error:", err));

// Existing health tracker routes
// app.get('/',(req,res)=>{
//   res.send('Api is working')
// })
app.get('/',(req,res)=>{
  res.status(200).send('this is working')
})

app.get('/logs', async (req, res) => {
  const logs = await Health.find();
  res.json(logs);
});

app.post('/logs', async (req, res) => {
  const newLog = new Health(req.body);
  const saved = await newLog.save();
  res.json(saved);
});

app.delete('/logs/:id', async (req, res) => {
  await Health.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
});

// ✅ Server start
app.listen(8000, () => console.log('✅ Server running on http://localhost:8000'));
