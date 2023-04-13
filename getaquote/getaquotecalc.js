// Define the calculateQuote() function
function calculateQuote() {
  console.log("Calculating quote...");

  // Get the form data
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const weight = Number(document.getElementById("weight").value);
  const length = Number(document.getElementById("length").value);
  const width = Number(document.getElementById("width").value);
  const height = Number(document.getElementById("height").value);

  // Check if all input fields are filled out
  if (!from || !to || !weight || !length || !width || !height) {
    alert("Please fill out all fields.");
    return;
  }

  // Check if the input values are valid numbers
  if (isNaN(weight) || isNaN(length) || isNaN(width) || isNaN(height)) {
    alert("Please enter valid numbers for weight, length, width, and height.");
    return;
  }

  // Calculate the quote
  const basePrice = 50;
  const distanceRate = 0.5;
  const weightRate = 0.1;
  const volumeRate = 0.05;

  // Get the distance using the getDistance() function
  getDistance(from, to)
    .then(distance => {
      const weightFee = weight * weightRate;
      const volume = length * width * height;
      const volumeFee = volume * volumeRate;
      const totalFee = basePrice + (distance * distanceRate) + weightFee + volumeFee;

      // Display the quote
      const quoteAmount = document.getElementById("quote-amount");
      quoteAmount.innerText = "$" + totalFee.toFixed(2);
    })
    .catch(error => {
      console.error(error);
      alert('Failed to get distance. Please try again later.');
      return;
    });
}


// Define the getDistance() function
async function getDistance(from, to) {
  const apiKey = 'AIzaSyCfW2ZTDz1tgFRrRumh1dnPil0cdWRfZ58'; // Replace with your own API key
  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${from}&destinations=${to}&key=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.status === 'OK') {
      const distance = data.rows[0].elements[0].distance.value;
      return distance / 1609.344; // Convert meters to miles
    } else {
      throw new Error('Failed to get distance');
    }
  } catch (error) {
    throw error;
  }
}

// Initialize Google Maps Places Autocomplete for the "From" and "To" fields
function initAutocomplete() {
  const fromInput = document.getElementById('from');
  const toInput = document.getElementById('to');

  const fromAutocomplete = new google.maps.places.Autocomplete(fromInput);
  const toAutocomplete = new google.maps.places.Autocomplete(toInput);
}

// Initialize the Autocomplete feature when the page loads
document.addEventListener('DOMContentLoaded', initAutocomplete);