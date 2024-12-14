// Navbar Functionality ----------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('#navbarNavAltMarkup');

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
    });
  }
});

// Budget Functionality ----------------------------------------------------------------------------------------
const saveBudget = document.querySelector("#save-budget");
const textBudget = document.querySelector("#total-budget");
const budgetDisplay = document.querySelector("#display-budget");

let totalBudget = 0;

saveBudget?.addEventListener("click", () => {
  totalBudget = parseFloat(textBudget?.value) || 0;
  budgetDisplay.textContent = `$${totalBudget.toFixed(2)}`;
});

// Destination Functionality -----------------------------------------------------------------------------------
const addDestination = document.querySelector("#add-destination");

const destinationInput = document.querySelector("#destination");
const destinationStartDate = document.querySelector("#destination-start-date");
const destinationEndDate = document.querySelector("#destination-end-date");

const destinationDisplay = document.querySelector("#destination-display");
const startDateDisplay = document.querySelector("#startdate-display");
const endDateDisplay = document.querySelector("#enddate-display");

function updateDestination() {
  destinationDisplay.textContent = destinationInput?.value || "N/A";
  startDateDisplay.textContent = destinationStartDate?.value || "N/A";
  endDateDisplay.textContent = destinationEndDate?.value || "N/A";
}

addDestination?.addEventListener("click", (event) => {
  event.preventDefault();
  updateDestination();
});

// Flight Functionality ----------------------------------------------------------------------------------------
const addFlight = document.querySelector("#add-flight");

const airlineInput = document.querySelector("#airline");
const flightNumberInput = document.querySelector("#flight-number");
const departingDateInput = document.querySelector("#departing-flight");
const returningDateInput = document.querySelector("#returning-flight");
const flightCostInput = document.querySelector("#flight-cost");
const flightTravelerInput = document.querySelector("#traveler-number");

const airlineDisplay = document.querySelector("#airline-display");
const flightNumberDisplay = document.querySelector("#flightnumber-display");
const departingDateDisplay = document.querySelector("#departingflight-display");
const returningDateDisplay = document.querySelector("#returningflight-display");
const flightCostDisplay = document.querySelector("#flightcost-display");
const flightTravelerDisplay = document.querySelector("#traveler-display");

function updateFlight() {
  airlineDisplay.textContent = airlineInput?.value || "N/A";
  flightNumberDisplay.textContent = flightNumberInput?.value || "N/A";
  departingDateDisplay.textContent = departingDateInput?.value || "N/A";
  returningDateDisplay.textContent = returningDateInput?.value || "N/A";
  flightCostDisplay.textContent = `$${parseFloat(flightCostInput?.value || 0).toFixed(2)}`;
  flightTravelerDisplay.textContent = flightTravelerInput?.value || "N/A";
}

addFlight?.addEventListener("click", (event) => {
  event.preventDefault();
  updateFlight();
});

// Hotel Functionality -----------------------------------------------------------------------------------------
const saveHotel = document.querySelector("#add-hotel");

const hotelNameInput = document.querySelector("#hotel-name");
const hotelCheckInInput = document.querySelector("#hotel-checkin");
const hotelCheckOutInput = document.querySelector("#hotel-checkout");
const hotelCostInput = document.querySelector("#hotel-cost");

const hotelNameDisplay = document.querySelector("#hotelname-display");
const hotelCheckInDisplay = document.querySelector("#hotelcheckin-display");
const hotelCheckOutDisplay = document.querySelector("#hotelcheckout-display");
const hotelCostDisplay = document.querySelector("#hotelcost-display");

function updateHotel() {
  hotelNameDisplay.textContent = hotelNameInput?.value || "N/A";
  hotelCheckInDisplay.textContent = hotelCheckInInput?.value || "N/A";
  hotelCheckOutDisplay.textContent = hotelCheckOutInput?.value || "N/A";
  hotelCostDisplay.textContent = `$${parseFloat(hotelCostInput?.value || 0).toFixed(2)}`;
}

saveHotel?.addEventListener("click", (event) => {
  event.preventDefault();
  updateHotel();
});

// Activity Functionality --------------------------------------------------------------------------------------
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
  activityNameDisplay.textContent = activityNameInput?.value || "N/A";
  activityDateDisplay.textContent = activityDateInput?.value || "N/A";
  activityTimeDisplay.textContent = activityTimeInput?.value || "N/A";
  activityCostDisplay.textContent = `$${parseFloat(activityCostInput?.value || 0).toFixed(2)}`;
}

addActivityButton?.addEventListener("click", (event) => {
  event.preventDefault();
  updateActivity();
});

// Packing Checklist -------------------------------------------------------------------------------------------
const packingItemInput = document.querySelector("#new-item");
const addItemButton = document.querySelector("#add-item");
const checklistSection = document.querySelector("#checklist-section");

function addCheckbox() {
  const labelText = packingItemInput?.value.trim();
  if (!labelText) {
    alert("Please enter an item.");
    return;
  }

  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.justifyContent = "flex-start";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = labelText.replace(/\s/g, "_");

  const label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.textContent = labelText;
  label.style.marginLeft = "5px";

  container.appendChild(checkbox);
  container.appendChild(label);
  checklistSection?.appendChild(container);

  packingItemInput.value = "";
}

addItemButton?.addEventListener("click", addCheckbox);


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
updateRemainingBudgets();