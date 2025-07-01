const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const venues = [
  { id: 1, name: "Sushi Samba", type: "restaurant", timeSlots: ["6:00 PM", "7:00 PM", "8:00 PM"] },
  { id: 2, name: "Soho Comedy Club", type: "event", timeSlots: ["8:30 PM", "9:00 PM"] },
  { id: 3, name: "Nightjar Jazz Bar", type: "bar", timeSlots: ["10:00 PM", "11:00 PM"] }
];

app.get('/venues', (req, res) => res.json(venues));
app.post('/confirm', (req, res) => {
  console.log("Confirmed plan:", req.body.itinerary);
  res.json({ message: "Plan confirmed successfully!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
