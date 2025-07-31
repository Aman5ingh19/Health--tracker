const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/check-symptoms', async (req, res) => {
  const options = {
    method: 'POST',
    url: 'https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/analyzeSymptomsAndDiagnose?noqueue=1',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '8eb53c1147mshf04f05f5dd26ad0p104fdfjsn32df47ce5e57',
      'X-RapidAPI-Host': 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com'
    },
    data: req.body
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Something went wrong while analyzing symptoms.' });
  }
});

module.exports = router;
