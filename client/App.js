import React, { useState, useEffect } from 'react';

function App() {
  const [venues, setVenues] = useState([]);
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/venues`)
      .then(res => res.json())
      .then(data => setVenues(data));
  }, []);

  const addToItinerary = (venue) => {
    setItinerary([...itinerary, venue]);
  };

  const confirmPlan = () => {
    fetch(`${process.env.REACT_APP_API_URL}/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itinerary })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Plan Your Night Out</h1>
      <h2>Recommendations</h2>
      {venues.map(v => (
        <div key={v.id} style={{ marginBottom: 10, border: '1px solid #ccc', padding: 10 }}>
          <h3>{v.name} ({v.type})</h3>
          <p>Times: {v.timeSlots.join(', ')}</p>
          <button onClick={() => addToItinerary(v)}>Add to Plan</button>
        </div>
      ))}
      <h2>Your Itinerary</h2>
      {itinerary.length === 0 ? <p>No items yet.</p> :
        itinerary.map((item, i) => <div key={i}>{item.name} @ {item.timeSlots[0]}</div>)
      }
      {itinerary.length > 0 && <button onClick={confirmPlan}>Confirm Plan</button>}
    </div>
  );
}

export default App;
