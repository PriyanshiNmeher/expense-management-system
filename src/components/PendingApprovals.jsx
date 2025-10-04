import { useState } from "react";

export default function PendingApprovals({ expenses, setExpenses, user, users, company }) {
  const [comment, setComment] = useState("");
  const [overrideStep, setOverrideStep] = useState({}); // Track step override per expense

  const handleAction = (id, action, stepIndex) => {
    setExpenses(expenses.map(exp => {
      if (exp.id === id) {
        const steps = [...exp.steps];
        steps[stepIndex].status = action;
        steps[stepIndex].approverEmail = user.email;
        steps[stepIndex].comment = comment;

        let currentStep = exp.currentStep;
        let status = exp.status;

        const rule = exp.approvalRule;
        if (rule) {
          if (rule.type === "Percentage") {
            const approvedSteps = steps.filter(s => s.status === "Approved").length;
            const totalSteps = steps.length;
            const percent = (approvedSteps / totalSteps) * 100;
            if (percent >= rule.value) status = "Approved";
          } else if (rule.type === "Specific") {
            const specificStep = steps.find(s => s.role.toLowerCase() === rule.specificApprover.split("@")[0]);
            if (specificStep?.status === "Approved") status = "Approved";
          } else if (rule.type === "Hybrid") {
            const approvedSteps = steps.filter(s => s.status === "Approved").length;
            const totalSteps = steps.length;
            const percent = (approvedSteps / totalSteps) * 100;
            const specificStep = steps.find(s => s.role.toLowerCase() === rule.specificApprover.split("@")[0]);
            if (percent >= rule.value || specificStep?.status === "Approved") status = "Approved";
          }
        }

        // Update currentStep only if not Admin override
        if (action === "Approved" && user.role !== "Admin" && currentStep < steps.length && status === "Pending") currentStep += 1;
        if (action === "Rejected") status = "Rejected";

        return { ...exp, steps, currentStep, status };
      }
      return exp;
    }));
    setComment("");
  };

  const companyCurrency = company?.currency || "INR";

  // Filter expenses:
  const filtered = expenses.filter(e =>
    e.status === "Pending" && (user.role === "Admin" || e.steps[e.currentStep - 1].role === user.role)
  );

  return (
    <div className="bg-white p-6 rounded shadow mt-4">
      <h3 className="text-lg font-bold mb-4">Pending Approvals</h3>
      {filtered.length === 0 ? (
        <p>No pending expenses.</p>
      ) : (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Converted ({companyCurrency})</th>
              <th className="p-2 border">Step</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(exp => {
              const currentStepIndex = exp.currentStep - 1;
              return (
                <tr key={exp.id}>
                  <td className="p-2 border">{exp.employee}</td>
                  <td className="p-2 border">{exp.category}</td>
                  <td className="p-2 border">{exp.amount} {exp.currency}</td>
                  <td className="p-2 border">{exp.convertedAmount} {companyCurrency}</td>

                  {/* Step selector for Admin override */}
                  <td className="p-2 border">
                    {user.role === "Admin" ? (
                      <select
                        value={overrideStep[exp.id] ?? currentStepIndex}
                        onChange={e => setOverrideStep({ ...overrideStep, [exp.id]: parseInt(e.target.value) })}
                        className="border p-1 rounded w-full"
                      >
                        {exp.steps.map((s, idx) => (
                          <option key={idx} value={idx}>
                            Step {idx + 1}: {s.role} ({s.status})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p>Step {exp.currentStep} of {exp.steps.length} ({exp.steps[currentStepIndex].role})</p>
                    )}
                  </td>

                  <td className="p-2 border space-y-2">
                    <textarea
                      placeholder="Add comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                    <div className="space-x-2 mt-1">
                      <button
                        onClick={() => handleAction(exp.id, "Approved", user.role === "Admin" ? (overrideStep[exp.id] ?? currentStepIndex) : currentStepIndex)}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(exp.id, "Rejected", user.role === "Admin" ? (overrideStep[exp.id] ?? currentStepIndex) : currentStepIndex)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
