import { useState, useEffect } from "react";
import { fetchCountries, convertCurrency } from "../api/currencyApi"; // your API file

export default function ExpenseForm({ expenses, setExpenses, user, company }) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(company.currency);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [countries, setCountries] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Fetch countries on load
  useEffect(() => {
    fetchCountries().then(data => setCountries(data));
  }, []);

  // Convert whenever amount or currency changes
  useEffect(() => {
    if(amount && currency){
      convertCurrency(currency, company.currency, amount)
        .then(result => setConvertedAmount(result))
        .catch(err => setConvertedAmount(0));
    }
  }, [amount, currency]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      employee: user.email,
      amount,
      currency,
      convertedAmount, // in company currency
      category,
      description,
      date,
      status: "Pending",
      currentStep: 1,
      steps: [
        { role: "Manager", status: "Pending", approverEmail: null, comment: "" },
        { role: "Finance", status: "Pending", approverEmail: null, comment: "" },
        { role: "Director", status: "Pending", approverEmail: null, comment: "" },
      ],
      approvalRule: { type: "Hybrid", value: 60, specificApprover: "cfo@company.com" }
    };

    setExpenses([...expenses, newExpense]);
    setAmount(""); setCurrency(company.currency); setCategory(""); setDescription(""); setDate("");
    setConvertedAmount(0);
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h3 className="text-lg font-bold mb-4">Submit Expense</h3>
      <form onSubmit={handleSubmit} className="grid gap-4">

        <input type="number" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} className="border p-2 rounded w-full" required />

        <select value={currency} onChange={e=>setCurrency(e.target.value)} className="border p-2 rounded w-full">
          {countries.map(c => (
            <option key={c.name} value={c.currency}>{c.name} ({c.currency})</option>
          ))}
        </select>

        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded" required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded" required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-2 rounded" required />

        <p className="text-sm text-gray-500">Amount in company currency ({company.currency}): {convertedAmount}</p>

        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Submit</button>
      </form>
    </div>
  );
}
