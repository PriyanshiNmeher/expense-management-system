export default function ExpenseHistory({ expenses, user, company }) {
  const myExpenses = expenses.filter(e => e.employee === user.email);
  const companyCurrency = company?.currency || "INR"; // fallback if undefined

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-bold mb-4">My Expenses</h3>
      {myExpenses.length === 0 ? (
        <p>No expenses submitted yet.</p>
      ) : (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Original Amount</th>
              <th className="p-2 border">Converted ({companyCurrency})</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Approval History</th>
            </tr>
          </thead>
          <tbody>
            {myExpenses.map(exp => (
              <tr key={exp.id}>
                <td className="p-2 border">{exp.category}</td>
                <td className="p-2 border">{exp.amount} {exp.currency}</td>
                <td className="p-2 border">{exp.convertedAmount} {companyCurrency}</td>
                <td className="p-2 border">{exp.status}</td>
                <td className="p-2 border">
                  {exp.steps.map((s, i) => (
                    <div key={i} className="mb-1">
                      <strong>{s.role}</strong>: {s.status} {s.comment && `- "${s.comment}"`}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
