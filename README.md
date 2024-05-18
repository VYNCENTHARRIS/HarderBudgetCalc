Description
The Budget and Expense Calculator is a web-based application designed to help you manage your finances by tracking your monthly income and expenses. This tool allows you to input your monthly income, add expenses, and view a an interatcitve chart and summary of your finances, inlcuding total expenses and remained amount left. 

How to Use
Set Your Income:

Enter your monthly income after taxes in the "Income After Taxes" input field.
Add Expenses:

Enter amounts for different categories of expenses such as Giving, Savings, Food, Utilities, etc.
Tooltips are provided for each category to explain what they represent.

View Summary:

The summary section displays the total income, total expenses, and the remaining budget.
The difference between income and expenses is color-coded (green for positive, red for negative).
Visualize Expenses:

The doughnut chart provides a visual representation of the distribution of your expenses across different categories.
Hover over the chart sections to see detailed information about each expense category.

Chart Functionality
The application uses the Chart.js library to create a dynamic doughnut chart that visualizes the distribution of expenses. The chart updates in real-time as you enter or modify expense amounts.

Chart Explanation
Labels: The chart includes labels for each expense category.
Colors: Each expense category is represented by a distinct color(same color as the tooltips in our HTML).
Hover Effect: Hovering over a chart segment displays the expense amount and its percentage of the total expenses.
Center Text: The center of the chart displays the total expenses amount.
Chart Implementation
The chart is initialized and updated using the following methods in the Budget class:

initChart(): Initializes the chart with labels and default data.
updateChart(): Updates the chart data based on the current expenses.
formatCurrency(): Formats the expense amounts as currency.
We use the tag (canva) to create the chart, only allowing JS 

Known Issues
There may be some formatting issues with the media queries for responsive design on certain screen sizes. Further testing and adjustments may be needed to ensure optimal display across all devices.
Sometimes users may need to clear out the income and re-enter it so the chart will update with the new or edited expenses.
