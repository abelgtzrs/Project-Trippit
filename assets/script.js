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
} )

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
const saveHotel = document.querySelector("#add-hotel");
const hotelName = document.querySelector("#hotel-name");
const hotelCheckIn = document.querySelector("#hotel-checkin");
const hotelCheckOut = document.querySelector("#hotel-checkout");
const hotelCost = document.querySelector("#hotel-cost");
const hotelNameDisplay = document.querySelector("#hotelname-display");
const hotelCheckInDisplay = document.querySelector("#hotelcheckin-display");
const hotelCheckOutDisplay = document.querySelector("#hotelcheckout-display");
const hotelCostDisplay = document.querySelector("#hotelcost-display")


//Display Hotel Information
saveHotel.addEventListener("click", function() {
  hotelNameDisplay.textContent = hotelName.value;
  hotelCheckInDisplay.textContent = hotelCheckIn.value;
  hotelCheckOutDisplay.textContent = hotelCheckOut.value;
  
})

// Displays packing checklist
const packingItem = document.querySelector("#new-item");
const addItemButton = document.querySelector("#add-item");
const checklistSection = document.querySelector("#checklist-section");

function addCheckbox() {
  let labelText = packingItem.value;
  let container = document.createElement("div");
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.justifyContent = "flex-start"; 
  
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = labelText.replace(/\s/g, "_");
  
  let label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.textContent = labelText;
  label.style.marginLeft = "5px"; 

  // Append elements to the container
  container.appendChild(checkbox);
  container.appendChild(label);
  // Append the container to the checklist section
  checklistSection.appendChild(container);

  // Clear the input field
  packingItem.value = "";
}
// Add an event listener to the add-item button
addItemButton.addEventListener("click", addCheckbox);


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
