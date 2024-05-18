// Define the Budget class 
class Budget {
    constructor() {
        // Initializing properties for income, expenses, and totals
        this.income = 0; // Single income since most only have 1 job
        this.expenses = { // Object to store various expense categories
            giving: 0,
            savings: 0,
            food: 0,
            utilities: 0,
            housing: 0,
            transportation: 0,
            insurance: 0,
            householdItems: 0,
            debt: 0,
            retirement: 0,
            personalEntertainment: 0,
            other: 0
        };
        this.totalIncome = 0; // Total income
        this.totalExpenses = 0; // Total expenses
        this.totalBudget = 0; // Total budget (income - expenses)
        this.chart = null; // Chart instance
        this.initChart();  // Initialize the chart when the class is initialized
    }

    // Method to set the income value
    setIncome(amount) {
        this.income = amount; // Set the income
        this.calculateBudget(); // Calculate the budget based on the new income
    }

    // Method to calculate expenses based on input fields
    calculateExpenses() {
        // Loop through each expense category and retrieve the value from the input field
        for (let key in this.expenses) {
            const value = parseFloat(document.getElementById(key).value); // Parse input value
            this.expenses[key] = isNaN(value) ? 0 : value; // Parse input value or set to 0 if invalid
        }
        this.calculateBudget(); // Calculate the budget based on the new expenses
    }

    // Method to calculate the total income, expenses, and budget
    calculateBudget() {
        // Set the total income to the single income value
        this.totalIncome = this.income;
        // Calculate the total expenses by summing all expense values
        this.totalExpenses = Object.values(this.expenses).reduce((sum, amount) => sum + amount, 0);
        // Calculate the total budget (income - expenses)
        this.totalBudget = this.totalIncome - this.totalExpenses;
        this.updateUI(); // Update the user interface with the new values
    }

    // Method to update the user interface with the calculated values
    updateUI() {
        // Update the displayed total income
        document.getElementById('total-income').innerText = this.formatCurrency(this.totalIncome);
        // Update the displayed total expenses
        document.getElementById('total-expenses').innerText = this.formatCurrency(this.totalExpenses);
        // Update the displayed total expenses in the chart center
        document.getElementById('chart-center-value').innerText = this.formatCurrency(this.totalExpenses);
        // Update the displayed amount left (total budget)
        document.getElementById('total-budget').innerText = this.formatCurrency(this.totalBudget);
        this.updateChart(); // Update the chart with the new data
        this.updateDifference(); // Update the difference display
    }

    // Method that will format numbers to currency
    formatCurrency(value) {
        return `$${value.toFixed(2)}`; // Format the value to 2 decimal places with a dollar sign
    }

    // Method to initialize the chart Use Chart.JS
    initChart() {
        const ctx = document.getElementById('expense-chart').getContext('2d'); // Get the 2D version of the canvas
        this.chart = new Chart(ctx, {
            type: 'doughnut', // Set chart type to doughnut
            data: {
                labels: ['Giving', 'Savings', 'Food', 'Utilities', 'Housing', 'Transportation', 'Insurance', 'Household Items', 'Debt', 'Retirement', 'Personal and Entertainment', 'Other'], // Labels for each category
                datasets: [{
                    data: Object.values(this.expenses), // Initial data for each category
                    backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0', '#3F51B5', '#00BCD4', '#009688', '#795548', '#E91E63', '#607D8B', '#8BC34A'], // Colors for each category match the tooltips
                    hoverOffset: 4 // Offset for hover effect
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right', // Positioning the legend (what category the colors are attached to) to the right of the chart
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || ''; // Get the label of the current item
                                const value = context.raw; // Get the raw value of the current item
                                const total = context.dataset.data.reduce((a, b) => a + b, 0); // Get the total of all items
                                const percentage = ((value / total) * 100).toFixed(2); // Calculate the percentage
                                return `${label}: ${this.formatCurrency(value)} (${percentage}%)`; // Return the formatted label
                            }
                        }
                    }
                }
            }
        });
    }

    // Method to update the chart with the current expense data
    updateChart() {
        this.chart.data.datasets[0].data = Object.values(this.expenses); // Update the chart data
        this.chart.update(); // Refresh the chart display
    }

    // Method to update the differences between income and expenses
    updateDifference() {
        const differenceElement = document.getElementById('difference'); // Get the difference element
        const difference = this.totalIncome - this.totalExpenses; // Calculate the difference
        differenceElement.innerText = `Difference: ${this.formatCurrency(difference)}`; // Update the displayed difference
        differenceElement.style.color = difference >= 0 ? 'green' : 'red'; // Set the color based on whether the difference is positive(green) or negative (red)
        // Update summary colors based on the difference
        document.getElementById('total-income').style.color = difference >= 0 ? 'green' : 'red';
        document.getElementById('total-expenses').style.color = difference >= 0 ? 'green' : 'red';
        document.getElementById('total-budget').style.color = difference >= 0 ? 'green' : 'red';
    }
}

// Create a new Budget instance
const budget = new Budget();

// Event listener to handle setting the income
document.getElementById('income-amount').addEventListener('input', () => {
    const amount = parseFloat(document.getElementById('income-amount').value); // Parse the input value
    if (amount >= 0) { // Ensure the amount is positive
        budget.setIncome(amount); // Set the income in the budget
    }
});

// Event listeners to automatically update the chart when expenses change
document.querySelectorAll('.expenses input[type="number"]').forEach(input => {
    input.addEventListener('input', () => {
        budget.calculateExpenses(); // Calculate expenses when an input changes
    });
});
