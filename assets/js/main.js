// Save and manage expenses with localStorage
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("expenseForm");
  if (form) {
    // Default date to today
    document.getElementById("date").valueAsDate = new Date();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const desc = document.getElementById("desc").value;
      const amount = parseFloat(document.getElementById("amount").value);
      const category = document.getElementById("category").value;
      const date = document.getElementById("date").value;

      if (amount <= 0 || isNaN(amount)) {
        alert("Enter a valid positive amount.");
        return;
      }

      const expense = { id: Date.now(), desc, amount, category, date };
      let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      expenses.push(expense);
      localStorage.setItem("expenses", JSON.stringify(expenses));

      alert("Expense added!");
      form.reset();
      document.getElementById("date").valueAs
