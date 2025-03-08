import { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

// Define the Expense interface
interface Expense {
  date: string;
  description: string;
  category: string;
  amount: number;
}

function App() {
  // State hooks for income, expenses, and daily expenses
  const [income, setIncome] = useState(20000);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [dailyExpenses, setDailyExpenses] = useState<number[]>([3000, 2000, 1500, 1800, 2200, 3500, 2500]);

  // Handle income change
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(Number(e.target.value));
  };

  // Handle daily expense change
  const handleDailyExpenseChange = (index: number, value: number) => {
    const updatedExpenses = [...dailyExpenses];
    updatedExpenses[index] = value;
    setDailyExpenses(updatedExpenses);
  };

  // Add a new expense
  const addExpense = () => {
    setExpenses([...expenses, { date: "", description: "", category: "", amount: 0 }]);
  };

  // Handle expense change
  const handleExpenseChange = (index: number, field: keyof Expense, value: string | number) => {
    const updatedExpenses = expenses.map((expense, i) =>
      i === index ? { ...expense, [field]: value } : expense
    );
    setExpenses(updatedExpenses);
  };

  // Update expense categories
  const updateExpenseCategories = () => {
    const categoryMap: { [key: string]: number } = {};
    expenses.forEach((exp) => {
      categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
    });
    return categoryMap;
  };

  // Prepare data for the Pie chart
  const budgetCategories = updateExpenseCategories();
  const expenseData = {
    labels: Object.keys(budgetCategories),
    datasets: [
      {
        data: Object.values(budgetCategories),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8A2BE2", "#32CD32"],
      },
    ],
  };

  // Prepare data for the Bar chart
  const barData = {
    labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    datasets: [
      {
        label: "Income",
        data: Array(7).fill(income / 30),
        backgroundColor: "#36A2EB",
      },
      {
        label: "Spent",
        data: dailyExpenses,
        backgroundColor: "#FF6384",
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navigation bar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-700">VerziBiz</h1>
        <div className="flex space-x-6">
          <a href="#categories" className="text-gray-700 hover:text-purple-700">Categories</a>
          <a href="#success-stories" className="text-gray-700 hover:text-purple-700">Success Stories</a>
          <a href="#pricing" className="text-gray-700 hover:text-purple-700">Pricing</a>
        </div>
        <div className="flex space-x-4">
          <button className="text-gray-700 hover:text-purple-700">Sign In</button>
          <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800">Get Started</button>
        </div>
      </nav>

      <div className="flex flex-wrap p-6">
        {/* Income and daily expenses section */}
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-700 mb-4">Your Monthly Income</h3>
            <input
              type="number"
              value={income}
              onChange={handleIncomeChange}
              className="w-full p-2 border rounded-lg"
            />
            <h3 className="text-xl font-bold text-purple-700 mt-4 mb-2">Your Weekly Expenses</h3>
            {dailyExpenses.map((expense, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span className="text-gray-500">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}:</span>
                <input
                  type="number"
                  value={expense}
                  onChange={(e) => handleDailyExpenseChange(index, Number(e.target.value))}
                  className="w-24 p-1 border rounded"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Charts and expense table section */}
        <div className="w-full md:w-2/3 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Income vs Expenses</h2>
            <div className="h-64">
              <Bar data={barData} options={{ maintainAspectRatio: false, responsive: true }} />
            </div>
          </div>
          <div className="flex mt-6">
            <div className="w-1/2 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">Expense Breakdown</h2>
              <div className="h-64">
                <Pie data={expenseData} options={{ maintainAspectRatio: false, responsive: true }} />
              </div>
            </div>
            <div className="w-1/2 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">Expense Table</h2>
              <button onClick={addExpense} className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 mb-4">Add Expense</button>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-purple-700 text-white">
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => (
                    <tr key={index} className="text-center border">
                      <td className="p-2 border"><input type="date" value={expense.date} onChange={(e) => handleExpenseChange(index, "date", e.target.value)} className="w-full" /></td>
                      <td className="p-2 border"><input type="text" value={expense.description} onChange={(e) => handleExpenseChange(index, "description", e.target.value)} className="w-full" /></td>
                      <td className="p-2 border"><input type="text" value={expense.category} onChange={(e) => handleExpenseChange(index, "category", e.target.value)} className="w-full" /></td>
                      <td className="p-2 border"><input type="number" value={expense.amount} onChange={(e) => handleExpenseChange(index, "amount", Number(e.target.value))} className="w-full" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;