// javascript for Navbar
document.addEventListener('DOMContentLoaded', function () {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('#navbarNavAltMarkup');

  navbarToggler.addEventListener('click', function () {
    navbarCollapse.classList.toggle('show');
  });
});
//Save and display Budget
const saveBudget = document.querySelector("#save-budget");
const textBudget = document.querySelector("#total-budget");
const budgetDisplay = document.querySelector("#display-budget")

let totalBudget;

saveBudget.addEventListener("click", function() {
  totalBudget = parseFloat(textBudget.value);
  budgetDisplay.textContent = `$${totalBudget}`;
});

//Displays destination information
document.addEventListener('DOMContentLoaded', function () {
  const destination = document.querySelector("#destination");
  const destinationStartDate = document.querySelector("#destination-start-date");
  const destinationEndDate = document.querySelector("#destination-end-date");
  const addDestinationButton = document.querySelector("#add-destination");

  function updateDestinationInfo() {
      document.querySelector("#destination-display").textContent = destination.value;
      document.querySelector("#startdate-display").textContent = destinationStartDate.value;
      document.querySelector("#enddate-display").textContent = destinationEndDate.value;
  }

  addDestinationButton.addEventListener("click", updateDestinationInfo);
});

//Add and display hotels
function displayHotels() {
  $("#hotel-name").autocomplete({
    source: ["Hotel A", "Hotel B", "Hotel C", "Hotel D", "Hotel ABCDE"]
  });
}

const saveHotel = document.querySelector("#add-hotel");
const hotelName = document.querySelector("#hotel-name");
const hotelCheckIn = document.querySelector("#hotel-checkin");
const hotelCheckOut = document.querySelector("#hotel-checkout");
const hotelCost = document.querySelector("#hotel-cost");
const hotelNameDisplay = document.querySelector("#hotelname-display");
const hotelCheckInDisplay = document.querySelector("#hotelcheckin-display");
const hotelCheckOutDisplay = document.querySelector("#hotelcheckout-display");
const hotelCostDisplay = document.querySelector("#hotelcost-display")

//Displays destination information
document.addEventListener('DOMContentLoaded', function () {
  const destination = document.querySelector("#destination");
  const destinationStartDate = document.querySelector("#destination-start-date");
  const destinationEndDate = document.querySelector("#destination-end-date");
  const addDestinationButton = document.querySelector("#add-destination");

  function updateDestinationInfo() {
      document.querySelector("#destination-display").textContent = destination.value;
      document.querySelector("#startdate-display").textContent = destinationStartDate.value;
      document.querySelector("#enddate-display").textContent = destinationEndDate.value;
  }

  addDestinationButton.addEventListener("click", updateDestinationInfo);
});

//Display Hotel Information
saveHotel.addEventListener("click", function() {
  hotelNameDisplay.textContent = hotelName.value;
  hotelCheckInDisplay.textContent = hotelCheckIn.value;
  hotelCheckOutDisplay.textContent = hotelCheckOut.value;
  
})
//
// Display flight information
const flightName = document.querySelector("#airline");
const flightNumber = document.querySelector("#flight-number");
const departingFlight = document.querySelector("#departing-flight");
const returningFlight = document.querySelector("#returning-flight");
const flightPrice = document.querySelector("#flight-price");
const travelerNumber = document.querySelector("#traveler-number");
const addFlight = document.querySelector("#add-flight")

function addFlightInfo () {
  const  flightData = {
    airline: flightName.value,
    flightNumber: flightName.value,
    departingFlight: departingFlight.value,
    returningFlight: returningFlight.value,
    flightPrice: flightPrice.value,
    travelerNumber: travelerNumber.value,
    addFlight: addFlight.value
  }
  
}
document.addEventListener()
// Calculate the total budget and allocate it to categories
function calculateBudgets(totalBudget) {
  const percentages = {
    transportation: 0.3,
    accommodation: 0.25,
    food: 0.25,
    activities: 0.15,
    miscellaneous: 0.05
  };

  const budgets = {};
  for (const category in percentages) {
    budgets[category] = totalBudget * percentages[category];
  }

  return budgets;
}

// Initialize expense tracking
const expenses = {
  transportation: 0,
  accommodation: 0,
  food: 0,
  activities: 0,
  miscellaneous: 0,
};

// Function to record an expense
function recordExpense(category, amount) {
  expenses[category] += amount;
  updateRemainingBudgets();
}

// Function to update and display the remaining budget
function updateRemainingBudgets() {
  const totalBudget = 5000; // Replace with your actual budget
  const budgets = calculateBudgets(totalBudget);

  for (const category in budgets) {
    const remainingBudget = budgets[category] - expenses[category];
    console.log(`Remaining budget for ${category}: $${remainingBudget.toFixed(2)}`);
  }
}

// Example usage
const initialBudget = 5000;
const initialBudgets = calculateBudgets(initialBudget);

console.log("Initial Budgets:");
for (const category in initialBudgets) {
  console.log(`${category}: $${initialBudgets[category].toFixed(2)}`);
}

recordExpense('transportation', 500);
updateRemainingBudgets();

// ... (rest of your code)

// Error Handling
function validateInput(input, errorMessage) {
  if (!input.value.trim()) {
    alert(errorMessage);
    return false;
  }
  return true;
}

saveBudget.addEventListener("click", function() {
  if (!validateInput(textBudget, "Please enter a valid budget.")) {
    return;
  }
  // ... (rest of the saveBudget logic)
});

// Data Persistence (using Local Storage)
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Load saved data on page load
document.addEventListener('DOMContentLoaded', function () {
  const savedBudget = loadFromLocalStorage('totalBudget');
  if (savedBudget) {
    totalBudget = savedBudget;
    budgetDisplay.textContent = `$${totalBudget}`;
  }
  // ... (other initialization logic)
});

// Save data on budget change
saveBudget.addEventListener("click", function() {
  // ... (rest of the saveBudget logic)
  saveToLocalStorage('totalBudget', totalBudget);
});

 // ... (rest of your code)