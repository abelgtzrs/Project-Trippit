//Display Budget information------------------------------------------------------------------------------------
const saveBudget = document.querySelector("#save-budget");
const budgetInput = document.querySelector("#total-budget");
const budgetDisplay = document.querySelector("#display-budget");
const remainingBudgetDisplay = document.querySelector("#remaining-budget");
const categoryBudgetDisplay = document.querySelector("#category-budget-display");
const budgetChart = document.querySelector("#budget-chart");

let totalBudget;
let remainingBudget;
let chartInstance = null;

let currentCategory = "destination"; // Default category to display

const sections = {
  destination: document.querySelector("#destination-section"),
  flight: document.querySelector("#flight-section"),
  hotel: document.querySelector("#hotel-section"),
  food: document.querySelector("#food-section"),
  activity: document.querySelector("#activity-section"),
};

const categoryButtons = document.querySelectorAll(".category-button");

// Initialize category buttons
categoryButtons.forEach(button => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    switchCategory(button.dataset.category);
  });
});

function switchCategory(category) {
  // Hide all sections
  for (const key in sections) {
    sections[key]?.classList.add("hidden");
  }

  // Show the selected section
  sections[category]?.classList.remove("hidden");
  currentCategory = category;
}

switchCategory(currentCategory); // Initialize the first category display

saveBudget?.addEventListener("click", () => {
  totalBudget = parseFloat(budgetInput?.value) || 0;
  remainingBudget = totalBudget; // Initialize remaining budget
  budgetDisplay.textContent = `$${totalBudget.toFixed(2)}`;
  remainingBudgetDisplay.textContent = `$${remainingBudget.toFixed(2)}`;

   // Save total budget to local storage
   localStorage.setItem('totalBudget', totalBudget);

  // Reset all expenses
  for (const category in expenses) {
    expenses[category] = 0;
  }

  displayCategoryBudgets(); // Update chart and display

  // Clear input box
  budgetInput.value = "";
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

  const destination = destinationInput.value;
  const startDate = destinationStartDate.value;
  const endDate = destinationEndDate.value;

  if (destination && startDate && endDate) {
    localStorage.setItem('destination', destination);
    localStorage.setItem('destinationStartDate', startDate);
    localStorage.setItem('destinationEndDate', endDate);

    // Clear input boxes
    destinationInput.value = "";
    destinationStartDate.value = "";
    destinationEndDate.value = "";
  }
});

//Display Flight information------------------------------------------------------------------------------------

const addFlight = document.querySelector("#add-flight"); 

const airline = document.querySelector("#airline"); 
const flightNumber = document.querySelector("#flight-number");
const departingDate = document.querySelector("#departing-flight");
const returningDate = document.querySelector("#returning-flight");
const flightCostInput = document.querySelector("#flight-cost");
const flightTraveler = document.querySelector("#traveler-number");

const airlineDisplay = document.querySelector("#airline-display");
const flightNumberDisplay = document.querySelector("#flightnumber-display"); 
const departingDateDisplay = document.querySelector("#departingflight-display");
const returningDateDisplay = document.querySelector("#returningflight-display");
const flightCostDisplay = document.querySelector("#flightcost-display");
const flightTravelerDisplay = document.querySelector("#traveler-display");

function updateFlight() {
  const flightCost = parseFloat(flightCostInput?.value) || 0;
  const travelers = parseInt(flightTraveler?.value) || 1;
  const totalFlightCost = flightCost * travelers;

  airlineDisplay.textContent = airline?.value || "N/A";
  flightNumberDisplay.textContent = flightNumber?.value || "N/A";
  departingDateDisplay.textContent = departingDate?.value || "N/A";
  returningDateDisplay.textContent = returningDate?.value || "N/A";
  flightCostDisplay.textContent = `$${flightCost.toFixed(2)}`;
  flightTravelerDisplay.textContent = flightTraveler?.value || "N/A";

  flightCostDisplay.textContent = `$${totalFlightCost.toFixed(2)}`;
  flightTravelerDisplay.textContent = travelers || "N/A";

  recordExpense("transportation", totalFlightCost);
  displayCategoryBudgets();
}

addFlight?.addEventListener("click", (event) => {
  event.preventDefault();
  updateFlight();

  const airlineValue = airline.value;
  const flightNumberValue = flightNumber.value;
  const departingFlightValue = departingDate.value;
  const returningFlightValue = returningDate.value;
  const flightCostValue = flightCostInput.value;
  const travelerNumberValue = flightTraveler.value;

  if (airlineValue && flightNumberValue && departingFlightValue && returningFlightValue && flightCostValue && travelerNumberValue) {
    localStorage.setItem('airline', airlineValue);
    localStorage.setItem('flightNumber', flightNumberValue);
    localStorage.setItem('departingFlight', departingFlightValue);
    localStorage.setItem('returningFlight', returningFlightValue);
    localStorage.setItem('flightCost', flightCostValue);
    localStorage.setItem('travelerNumber', travelerNumberValue);

    // Clear input boxes
    airline.value = "";
    flightNumber.value = "";
    departingDate.value = "";
    returningDate.value = "";
    flightCostInput.value = "";
    flightTraveler.value = "";
  }
});

  const saveHotel = document.querySelector("#add-hotel");

  const hotelName = document.querySelector("#hotel-name");
  const hotelCheckIn = document.querySelector("#hotel-checkin");
  const hotelCheckOut = document.querySelector("#hotel-checkout");
  const hotelCostInput = document.querySelector("#hotel-cost");
  
  const hotelNameDisplay = document.querySelector("#hotelname-display");
  const hotelCheckInDisplay = document.querySelector("#hotelcheckin-display");
  const hotelCheckOutDisplay = document.querySelector("#hotelcheckout-display");
  const hotelCostDisplay = document.querySelector("#hotelcost-display");
  
  function updateHotel() {
    const hotelCost = parseFloat(hotelCostInput?.value) || 0;
    hotelNameDisplay.textContent = hotelName?.value || "N/A";
    hotelCheckInDisplay.textContent = hotelCheckIn?.value || "N/A";
    hotelCheckOutDisplay.textContent = hotelCheckOut?.value || "N/A";
    hotelCostDisplay.textContent = `$${hotelCost.toFixed(2)}`;
  
    recordExpense("accommodation", hotelCost);
    displayCategoryBudgets();
  }
  
  saveHotel?.addEventListener("click", (event) => {
    event.preventDefault();
    updateHotel();

    const hotelNameValue = hotelName.value;
    const hotelCheckinValue = hotelCheckIn.value;
    const hotelCheckoutValue = hotelCheckOut.value;
    const hotelCostValue = hotelCostInput.value;
  
    if (hotelNameValue && hotelCheckinValue && hotelCheckoutValue && hotelCostValue) {
      localStorage.setItem('hotelName', hotelNameValue);
      localStorage.setItem('hotelCheckin', hotelCheckinValue);
      localStorage.setItem('hotelCheckout', hotelCheckoutValue);
      localStorage.setItem('hotelCost', hotelCostValue);

      // Clear input boxes
      hotelName.value = "";
      hotelCheckIn.value = "";
      hotelCheckOut.value = "";
      hotelCostInput.value = "";
    }
  });

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
  const activityCost = parseFloat(activityCostInput?.value) || 0;
  activityNameDisplay.textContent = activityNameInput?.value || "N/A";
  activityDateDisplay.textContent = activityDateInput?.value || "N/A";
  activityTimeDisplay.textContent = activityTimeInput?.value || "N/A";
  activityCostDisplay.textContent = `$${activityCost.toFixed(2)}`;

  recordExpense("activities", activityCost);
  displayCategoryBudgets();
}

addActivityButton?.addEventListener("click", (event) => {
  event.preventDefault();
  updateActivity();

  const activityNameValue = activityNameInput.value;
  const activityDateValue = activityDateInput.value;
  const activityTimeValue = activityTimeInput.value;
  const activityCostValue = activityCostInput.value;

  if (activityNameValue && activityDateValue && activityTimeValue && activityCostValue) {
    localStorage.setItem('activityName', activityNameValue);
    localStorage.setItem('activityDate', activityDateValue);
    localStorage.setItem('activityTime', activityTimeValue);
    localStorage.setItem('activityCost', activityCostValue);

    // Clear input boxes
    activityNameInput.value = "";
    activityDateInput.value = "";
    activityTimeInput.value = "";
    activityCostInput.value = "";
  }
});

// Food Functionality ------------------------------------------------------------------------------------------
const addFoodButton = document.querySelector("#add-food");

const foodItemInput = document.querySelector("#food-item");
const foodDateInput = document.querySelector("#food-date");
const foodCostInput = document.querySelector("#food-cost");

const foodItemDisplay = document.querySelector("#fooditem-display");
const foodDateDisplay = document.querySelector("#fooddate-display");
const foodCostDisplay = document.querySelector("#foodcost-display");

function updateFood() {
  const foodCost = parseFloat(foodCostInput?.value) || 0;
  foodItemDisplay.textContent = foodItemInput?.value || "N/A";
  foodDateDisplay.textContent = foodDateInput?.value || "N/A";
  foodCostDisplay.textContent = `$${foodCost.toFixed(2)}`;

  recordExpense("food", foodCost);
  displayCategoryBudgets();
}

addFoodButton?.addEventListener("click", (event) => {
  event.preventDefault();
  updateFood();

  const foodItemValue = foodItemInput.value;
  const foodDateValue = foodDateInput.value;
  const foodCostValue = foodCostInput.value;

  if (foodItemValue && foodDateValue && foodCostValue) {
    localStorage.setItem('foodItem', foodItemValue);
    localStorage.setItem('foodDate', foodDateValue);
    localStorage.setItem('foodCost', foodCostValue);

    // Clear input boxes
    foodItemInput.value = "";
    foodDateInput.value = "";
    foodCostInput.value = "";
  }
});

// Packing Checklist -------------------------------------------------------------------------------------------
const packingItemInput = document.querySelector("#new-item");
const addItemButton = document.querySelector("#add-item");
const checklistSection = document.querySelector("#checklist-section");

function addCheckbox(labelText) {
  if (!labelText) {
    labelText = packingItemInput?.value.trim();
    if (!labelText) {
      alert("Please enter an item.");
      return;
    }
  }

  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.alignItems = "right";
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

  // Save checklist item to local storage
  let checklistItems = JSON.parse(localStorage.getItem('checklist')) || [];
  if (!checklistItems.includes(labelText)) {
    checklistItems.push(labelText);
    localStorage.setItem('checklist', JSON.stringify(checklistItems));
  }

  packingItemInput.value = "";
}

addItemButton?.addEventListener("click", (event) => {
  event.preventDefault();
  addCheckbox();

  // Clear input box
  packingItemInput.value = "";
});

//Remaining Budget Function---------------------------------------------------------------------------------
function updateRemainingBudget(expense){
  remainingBudget -= expense;
  if (remainingBudget < 0) {
    alert("You have exceeded your budget!");
  }
  remainingBudgetDisplay.textContent = `$${remainingBudget.toFixed(2)}`;
  };

//Display Category Expensess
function displayCategoryBudgets() {
  const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0);
  const openBudget = totalBudget - totalExpenses;
  

  // Clear existing category budgets
  categoryBudgetDisplay.innerHTML = "";

  // Prepare data for the chart
  const chartLabels = [];
  const chartData = [];

  for (const [category, amount] of Object.entries(expenses)) {
    const percentage = totalExpenses > 0 ? (amount / totalBudget) * 100 : 0;

    // Update category display
    const categoryRow = document.createElement("div");
    categoryRow.className = "category-row";
    categoryRow.innerHTML = `<p><strong>${category.charAt(0).toUpperCase() + category.slice(1)}:</strong> Spent: $${amount.toFixed(2)} (${percentage.toFixed(2)}%)</p>`;
    categoryBudgetDisplay.appendChild(categoryRow);

    // Update chart data
    chartLabels.push(category);
    chartData.push(percentage);
  }

  if (openBudget > 0) {
    chartLabels.push("Open Budget");
    chartData.push((openBudget / totalBudget) * 100);

    // Display open budget in the category display
    const openBudgetRow = document.createElement("div");
    openBudgetRow.className = "category-row";
    openBudgetRow.innerHTML = `
      <p><strong>Open Budget:</strong> $${openBudget.toFixed(2)} (${((openBudget / totalBudget) * 100).toFixed(2)}%)</p>
    `;
    categoryBudgetDisplay.appendChild(openBudgetRow);
  }
  
   function saveChartToLocalStorage(labels, data) {
    localStorage.setItem('chartLabels', JSON.stringify(labels));
    localStorage.setItem('chartData', JSON.stringify(data));
  }

  saveChartToLocalStorage(chartLabels, chartData);
  renderBudgetChart(chartLabels, chartData);
}

// Render Budget Chart ------------------------------------------------------------------------------------------
function renderBudgetChart(labels, data) {
  if (budgetChart) {
    const ctx = budgetChart.getContext("2d");
    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#A8B820"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  }
}

// Calculate the total budget and allocate it to categories-----------------------------------------------
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
let expenses = {
  transportation: 0,
  food: 0,
  accommodation: 0,
  entertainment: 0,
  activities: 0
};

// Function to record an expense
function recordExpense(category, amount) {
  if (!expenses.hasOwnProperty(category)) {
    console.error(`Category ${category} does not exist.`);
    return;
  }
  expenses[category] += amount;
  updateRemainingBudget(amount);
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

function recallLocalStorage() {
  // Recall budget
  const savedBudget = localStorage.getItem('totalBudget');
  if (savedBudget !== null) {
    budgetInput.value = savedBudget;
    budgetDisplay.textContent = `$${savedBudget}`;
    remainingBudget = parseFloat(savedBudget);
    remainingBudgetDisplay.textContent = `$${remainingBudget.toFixed(2)}`;
  }

  // Recall destinations
  const savedDestination = localStorage.getItem('destination');
  const savedStartDate = localStorage.getItem('destinationStartDate');
  const savedEndDate = localStorage.getItem('destinationEndDate');

  if (savedDestination !== null && savedStartDate !== null && savedEndDate !== null) {
    destinationInput.value = savedDestination;
    destinationStartDate.value = savedStartDate;
    destinationEndDate.value = savedEndDate;
    updateDestination();
  }

  // Recall flights
  const savedAirline = localStorage.getItem('airline');
  const savedFlightNumber = localStorage.getItem('flightNumber');
  const savedDepartingFlight = localStorage.getItem('departingFlight');
  const savedReturningFlight = localStorage.getItem('returningFlight');
  const savedFlightCost = localStorage.getItem('flightCost');
  const savedTravelerNumber = localStorage.getItem('travelerNumber');

  if (savedAirline !== null && savedFlightNumber !== null && savedDepartingFlight !== null && savedReturningFlight !== null && savedFlightCost !== null && savedTravelerNumber !== null) {
    airline.value = savedAirline;
    flightNumber.value = savedFlightNumber;
    departingDate.value = savedDepartingFlight;
    returningDate.value = savedReturningFlight;
    flightCostInput.value = savedFlightCost;
    flightTraveler.value = savedTravelerNumber;
    updateFlight();
  }

  // Recall hotels
  const savedHotelName = localStorage.getItem('hotelName');
  const savedHotelCheckin = localStorage.getItem('hotelCheckin');
  const savedHotelCheckout = localStorage.getItem('hotelCheckout');
  const savedHotelCost = localStorage.getItem('hotelCost');

  if (savedHotelName !== null && savedHotelCheckin !== null && savedHotelCheckout !== null && savedHotelCost !== null) {
    hotelName.value = savedHotelName;
    hotelCheckIn.value = savedHotelCheckin;
    hotelCheckOut.value = savedHotelCheckout;
    hotelCostInput.value = savedHotelCost;
    updateHotel();
  }

  // Recall food
  const savedFoodItem = localStorage.getItem('foodItem');
  const savedFoodDate = localStorage.getItem('foodDate');
  const savedFoodCost = localStorage.getItem('foodCost');

  if (savedFoodItem !== null && savedFoodDate !== null && savedFoodCost !== null) {
    foodItemInput.value = savedFoodItem;
    foodDateInput.value = savedFoodDate;
    foodCostInput.value = savedFoodCost;
    updateFood();
  }

  // Recall activities
  const savedActivityName = localStorage.getItem('activityName');
  const savedActivityDate = localStorage.getItem('activityDate');
  const savedActivityTime = localStorage.getItem('activityTime');
  const savedActivityCost = localStorage.getItem('activityCost');
  
  if (savedActivityName !== null && savedActivityDate !== null && savedActivityTime !== null && savedActivityCost !== null) {
    activityNameInput.value = savedActivityName;
    activityDateInput.value = savedActivityDate;
    activityTimeInput.value = savedActivityTime;
    activityCostInput.value = savedActivityCost;
    updateActivity();
  }

  // Recall Chart from local storage
  const savedChartLabels = JSON.parse(localStorage.getItem('chartLabels')) || [];
  const savedChartData = JSON.parse(localStorage.getItem('chartData')) || [];
  // Update chart with recalled data
  if (savedChartLabels.length && savedChartData.length) {
    renderBudgetChart(savedChartLabels, savedChartData);
  }

  // Recall checklist items
  const savedChecklist = JSON.parse(localStorage.getItem('checklist')) || [];
  savedChecklist.forEach(item => addCheckbox(item));
}

// Call the function to recall data when the page loads
document.addEventListener('DOMContentLoaded', recallLocalStorage);
