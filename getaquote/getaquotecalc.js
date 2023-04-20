// Define the calculateQuote() function
function calculateQuote() {
  console.log("Calculating quote...");

  // Get the form data
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  // Check if all input fields are filled out
  if (!from || !to) {
    alert("Please fill out all fields.");
    return;
  }

  // Constants for the quote calculation
  const milePrice = 0.6;
  const insuranceRate = 0.75;
  const equipmentRate = 0.75;
  const maintenanceRate = 0.5;
  const fuelRate = 0.65;

  // Get the distance using the getDistance() function
  getDistance(from, to)
    .then(distance => {
      const totalFee = distance * (milePrice + fuelRate + insuranceRate + equipmentRate + maintenanceRate) * 1.2;

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

// Rest of the JavaScript code remains the same


// Rest of the JavaScript code remains the same


// Define the getDistance() function
function getDistance(from, to) {
  return new Promise((resolve, reject) => {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [from],
        destinations: [to],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      },
      (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          const distance = response.rows[0].elements[0].distance.value;
          resolve(distance / 1609.344); // Convert meters to miles
        } else {
          reject(status);
        }
      }
    );
  });
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