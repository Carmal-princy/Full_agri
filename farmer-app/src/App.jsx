import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // State variables for inputs
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  
  // New state variables for date information
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  
  const [prediction, setPrediction] = useState(null);

  // Expanded dropdown options for crops (sample list)
  const cropOptions = [
    "Rice", "Wheat", "Maize", "Cotton", "Sugarcane", "Potato",
    "Tomato", "Onion", "Chili", "Groundnut", "Coconut", "Banana",
    "Mango", "Pomegranate", "Papaya", "Grapes"
  ];

  // Expanded dropdown options for Tamil Nadu districts (sample list)
  const locationOptions = [
    "Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
    "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanniyakumari",
    "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal",
    "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet",
    "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "Theni",
    "Thiruvallur", "Thiruvarur", "Tiruchirappalli", "Tirunelveli",
    "Tirupathur", "Tiruppur", "Tiruvannamalai", "Vellore", "Viluppuram",
    "Virudhunagar"
  ];

  // Function to simulate converting user-friendly inputs into 8 numerical features for the model.
  // For now, we use crop type, quantity, and location only.
  const convertInputsToFeatures = () => {
    const cropNum = cropOptions.indexOf(cropType) + 1;
    const quantityNum = Number(quantity);
    const locationNum = locationOptions.indexOf(location) + 1;
    // For demonstration, we add 5 dummy values to reach 8 features.
    return [cropNum, quantityNum, locationNum, 10, 20, 30, 40, 50];
  };

  // Handler for the year input that auto-fills month and day.
  const handleYearChange = (e) => {
    const inputYear = e.target.value;
    setYear(inputYear);
    if (inputYear !== '') {
      // When a year is entered, auto-fill with the current month and day.
      const now = new Date();
      // Month is 0-indexed in JS so we add 1; pad with zero for consistency.
      setMonth(String(now.getMonth() + 1).padStart(2, '0'));
      setDay(String(now.getDate()).padStart(2, '0'));
    } else {
      setMonth('');
      setDay('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const features = convertInputsToFeatures();
    try {
      // Ensure your Flask backend is running at http://127.0.0.1:5000
      const response = await axios.post('http://127.0.0.1:5000/predict', { features });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Market Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Crop Type:</label>
          <br />
          <select
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            style={{ padding: '8px', width: '300px', marginBottom: '10px' }}
          >
            <option value="">Select Crop</option>
            {cropOptions.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity (in Kg):</label>
          <br />
          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ padding: '8px', width: '300px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Location (District):</label>
          <br />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ padding: '8px', width: '300px', marginBottom: '10px' }}
          >
            <option value="">Select District</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Year:</label>
          <br />
          <input
            type="number"
            placeholder="Enter Year (e.g., 2025)"
            value={year}
            onChange={handleYearChange}
            style={{ padding: '8px', width: '300px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Month:</label>
          <br />
          <input
            type="text"
            value={month}
            disabled
            style={{ padding: '8px', width: '300px', marginBottom: '10px', backgroundColor: '#f0f0f0' }}
          />
        </div>
        <div>
          <label>Date:</label>
          <br />
          <input
            type="text"
            value={day}
            disabled
            style={{ padding: '8px', width: '300px', marginBottom: '10px', backgroundColor: '#f0f0f0' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Predict Price
        </button>
      </form>
      {prediction && (
        <div style={{ marginTop: '20px' }}>
          <h2>Predicted Price: ₹{prediction}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
