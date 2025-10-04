// Example approval rule engine
export const checkApprovalStatus = (approvals, rules) => {
  const approvedCount = approvals.filter(a => a.status === "Approved").length;
  const total = approvals.length;

  // Rule: 60% rule or CFO auto-approval
  if (rules.type === "percentage") {
    return (approvedCount / total) * 100 >= rules.threshold ? "Approved" : "Pending";
  }
  if (rules.type === "specific") {
    return approvals.some(a => a.approver === "CFO" && a.status === "Approved")
      ? "Approved"
      : "Pending";
  }
  if (rules.type === "hybrid") {
    const percentOK = (approvedCount / total) * 100 >= rules.threshold;
    const cfoOK = approvals.some(a => a.approver === "CFO" && a.status === "Approved");
    return percentOK || cfoOK ? "Approved" : "Pending";
  }
  return "Pending";
};
