   // Calculate the total budget
    let totalBudget = transportationBudget + accommodationBudget + foodBudget + activitiesBudget + miscellaneousBudget;
  
    // Return the total budget
    return totalBudget; {

    }

// Function to calculate the total travel budget
function calculateTravelBudget(budget) {
    // Define variables for different budget categories
    let transportationBudget = budget * 0.3; // 30% for transportation
    let accommodationBudget = budget * 0.25; // 25% for accommodation
    let foodBudget = budget * 0.25; // 25% for food
    let activitiesBudget = budget * 0.15; // 15% for activities
    let miscellaneousBudget = budget * 0.05; // 5% for miscellaneous expenses
  }
  
  // Initialize expense categories and their initial budgets
  let expenses = {
    transportation: 0,
    accommodation: 0,
    food: 0,
    activities: 0,
    miscellaneous: 0
  };
  
  // Function to record an expense
  function recordExpense(category, amount) {
    expenses[category] += amount;
    updateRemainingBudget();
  }
  
  // Function to update the remaining budget in each category
  function updateRemainingBudget() {
    let totalBudget = calculateTravelBudget(3000); // Replace 3000 with your actual budget
  
    for (let category in expenses) {
      let remainingBudget = totalBudget * categoryPercentages[category] - expenses[category];
      console.log(`Remaining budget for ${category}: $${remainingBudget.toFixed(2)}`);
    }
  }
  
  // Record an expense for transportation
  recordExpense('transportation', 500);
  
  // Update and display the remaining budgets
  updateRemainingBudget();

  // ... (rest of your code, including the `calculateTravelBudget`, `recordExpense`, and `updateRemainingBudget` functions)

// Function to display the remaining budget dynamically
function displayRemainingBudget() {
    const budgetCategories = document.querySelectorAll('.budget-category');
  
    for (const categoryElement of budgetCategories) {
      const categoryName = categoryElement.dataset.category;
      const remainingBudget = totalBudget * categoryPercentages[categoryName] - expenses[categoryName];
  
      const remainingBudgetElement = categoryElement.querySelector('.remaining-budget');
      remainingBudgetElement.textContent = `$${remainingBudget.toFixed(2)}`;
    }
  }
  
  // ... (rest of your code)
  
  // Example usage
  // ... (rest of your code)
  
  // Initial display of the remaining budget
  displayRemainingBudget();
  
  // After recording an expense
  recordExpense('transportation', 500);
  updateRemainingBudget();
  displayRemainingBudget();
