// Save to localStorage
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
      document.getElementById("date").valueAsDate = new Date();
    });
  }

  // Show expenses in summary
  const tableBody = document.getElementById("expenseTable");
  if (tableBody) renderExpenses();

  // Show total on home
  const homeTotal = document.getElementById("homeTotal");
  if (homeTotal) {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    homeTotal.textContent = total;
  }
});

function renderExpenses(filter = "All") {
  const tableBody = document.getElementById("expenseTable");
  const totalSpan = document.getElementById("total");
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  if (filter !== "All") {
    expenses = expenses.filter((e) => e.category === filter);
  }

  tableBody.innerHTML = "";
  let total = 0;
  expenses.forEach((e) => {
    total += e.amount;
    const row = `<tr>
      <td>${e.desc}</td>
      <td>${e.amount}</td>
      <td>${e.category}</td>
      <td>${e.date}</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteExpense(${e.id})">Delete</button></td>
    </tr>`;
    tableBody.innerHTML += row;
  });
  totalSpan.textContent = total;

  const filterSelect = document.getElementById("filterCategory");
  if (filterSelect) {
    filterSelect.onchange = () => renderExpenses(filterSelect.value);
  }
}

function deleteExpense(id) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses = expenses.filter((e) => e.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses(document.getElementById("filterCategory").value);
}

function clearAll() {
  if (confirm("Clear all expenses?")) {
    localStorage.removeItem("expenses");
    renderExpenses();
  }
}
