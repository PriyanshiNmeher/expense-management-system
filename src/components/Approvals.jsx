export default function Approvals({ expenses, setExpenses }) {
  const handleDecision = (id, approver, decision) => {
    setExpenses((prev) =>
      prev.map((exp) => {
        if (exp.id === id) {
          const updatedApprovals = exp.approvals.map((a) =>
            a.approver === approver ? { ...a, status: decision } : a
          );

          const newStatus = updatedApprovals.every((a) => a.status !== "Pending")
            ? "Completed"
            : "In Progress";

          return { ...exp, approvals: updatedApprovals, finalStatus: newStatus };
        }
        return exp;
      })
    );
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h3 className="text-lg font-bold mb-4">Expenses Awaiting Approval</h3>
      <ul className="space-y-3">
        {expenses.map((exp) => (
          <li key={exp.id} className="border p-3 rounded">
            <div>{exp.category} - {exp.currency} {exp.amount}</div>
            <div className="text-sm text-gray-500">{exp.description}</div>
            {exp.approvals.map((a) => (
              <div key={a.approver} className="mt-2">
                <b>{a.approver}</b> - {a.status}
                {a.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleDecision(exp.id, a.approver, "Approved")}
                      className="ml-3 text-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecision(exp.id, a.approver, "Rejected")}
                      className="ml-2 text-red-600"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
