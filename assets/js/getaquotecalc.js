function calculateQuote() {
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

  const distance = getDistance(from, to);
  const weightFee = weight * weightRate;
  const volume = length * width * height;
  const volumeFee = volume * volumeRate;
  const totalFee = basePrice + (distance * distanceRate) + weightFee + volumeFee;

  // Display the quote
  const quoteAmount = document.getElementById("quote-amount");
  quoteAmount.innerText = "$" + totalFee.toFixed(2);
}
