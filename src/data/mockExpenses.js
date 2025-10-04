export const mockExpenses = [
  {
    id: 1,
    employee: "John Doe",
    amount: 1200,
    category: "Travel",
    date: "2025-10-01",
    status: "Pending",
    currentStep: 1, // current approval step
    steps: [
      { role: "Manager", status: "Pending" },
      { role: "Finance", status: "Pending" },
      { role: "Director", status: "Pending" },
    ],
  },
  {
    id: 2,
    employee: "Jane Smith",
    amount: 800,
    category: "Food",
    date: "2025-10-02",
    status: "Pending",
    currentStep: 1,
    steps: [
      { role: "Manager", status: "Pending" },
      { role: "Finance", status: "Pending" },
      { role: "Director", status: "Pending" },
    ],
  },
];
