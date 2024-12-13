// javascript for Navbar----------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('#navbarNavAltMarkup');

  navbarToggler.addEventListener('click', function () {
    navbarCollapse.classList.toggle('show');
  });
});
//Display Budget information------------------------------------------------------------------------------------
const saveBudget = document.querySelector("#save-budget");
const textBudget = document.querySelector("#total-budget");
const budgetDisplay = document.querySelector("#display-budget")

let totalBudget;

saveBudget.addEventListener("click", function() {
  totalBudget = parseFloat(textBudget.value);
  budgetDisplay.textContent = `$${totalBudget}`;
} )

//Displays destination information-----------------------------------------------------------------------------
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

//Display Flight information------------------------------------------------------------------------------------

const addFlight = document.querySelector("#add-flight"); 

const airline = document.querySelector("#airline"); 
const flightNumber = document.querySelector("#flight-number");
const departingDate = document.querySelector("#departing-flight");
const returningDate = document.querySelector("#returning-flight");
const flightCost = document.querySelector("#flight-cost");
const flightTraveler = document.querySelector("#traveler-number");

const airlineDisplay = document.querySelector("#airline-display");
const flightNumberDisplay = document.querySelector("#flightnumber-display"); 
const departingDateDisplay = document.querySelector("#departingflight-display");
const returningDateDisplay = document.querySelector("#returningflight-display");
const flightCostDisplay = document.querySelector("#flightcost-display");
const flightTravelerDisplay = document.querySelector("#traveler-display");

function updateFlight() {
  airlineDisplay.textContent = airline.value || "N/A";
  flightNumberDisplay.textContent = flightNumber.value || "N/A";
  departingDateDisplay.textContent = departingDate.value || "N/A";
  returningDateDisplay.textContent = returningDate.value || "N/A";
  flightCostDisplay.textContent = flightCost.value || "N/A";
  flightTravelerDisplay.textContent = flightTraveler.value || "N/A";
}

addFlight.addEventListener("click", (event) => {
  event.preventDefault();
  updateFlight();
});

//Display Hotel information--------------------------------------------------------------------------------------
const saveHotel = document.querySelector("#add-hotel");

const hotelName = document.querySelector("#hotel-name");
const hotelCheckIn = document.querySelector("#hotel-checkin");
const hotelCheckOut = document.querySelector("#hotel-checkout");
const hotelCost = document.querySelector("#hotel-cost");

const hotelNameDisplay = document.querySelector("#hotelname-display");
const hotelCheckInDisplay = document.querySelector("#hotelcheckin-display");
const hotelCheckOutDisplay = document.querySelector("#hotelcheckout-display");
const hotelCostDisplay = document.querySelector("#hotelcost-display");

function updateHotel() {
  hotelNameDisplay.textContent = hotelName.value;
  hotelCheckInDisplay.textContent = hotelCheckIn.value;
  hotelCheckOutDisplay.textContent = hotelCheckOut.value;
  hotelCostDisplay.textContent = `$${hotelCost.value.toFixed(2)}`;
}

saveHotel.addEventListener("click", updateHotel)

//Display Activity information------------------------------------------------------------------------------------
const addActivityButton = document.querySelector("#add-activity");

const activityNameInput = document.querySelector("#activity-name");
const activityDateInput = document.querySelector("#activity-date");
const activityTimeInput = document.querySelector("#activity-time");
const activityCostInput = document.querySelector("#activity-cost");

const activityNameDisplay = document.querySelector("#activityname-display");
const activityDateDisplay = document.querySelector("#activitydate-display");
const activityTimeDisplay = document.querySelector("#activitytime-display");
const activityCostDisplay = document.querySelector("#activitycost-display");

function updateActivity() {
  // Get and validate input values
  const activityName = activityNameInput
  const activityDate = activityDateInput
  const activityTime = activityTimeInput
  const activityCost = parseFloat(activityCostInput.value) || 0;

  // Update the summary display
  activityNameDisplay.textContent = activityName.value || "N/A";;
  activityDateDisplay.textContent = activityDate.value || "N/A";;
  activityTimeDisplay.textContent = activityTime.value || "N/A";;
  activityCostDisplay.textContent = `$${activityCost.toFixed(2)}`;

// Add event listener to the "Add Activity" button
addActivityButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission or page refresh
  updateActivity();
});

// Calculate the total budget and allocate it to categories------------------------------------------------------
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
  miscellaneous: 0
};

// Function to record an expense
function recordExpense(category, amount) {
  expenses[category] += amount;
  updateRemainingBudgets();
}

// Function to update and display the remaining budget
function updateRemainingBudgets() {
  const totalBudget = 3000; // Replace with your actual budget
  const budgets = calculateBudgets(totalBudget);

  for (const category in budgets) {
    const remainingBudget = budgets[category] - expenses[category];
    console.log(`Remaining budget for ${category}: $${remainingBudget.toFixed(2)}`);
  }
}

// Example usage
const initialBudget = 3000;
const initialBudgets = calculateBudgets(initialBudget);

console.log("Initial Budgets:");
for (const category in initialBudgets) {
  console.log(`${category}: $${initialBudgets[category].toFixed(2)}`);
}

recordExpense('transportation', 500);
updateRemainingBudgets()}
