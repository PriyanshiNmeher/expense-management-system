import ExpenseForm from "./ExpenseForm";
import ExpenseHistory from "./ExpenseHistory";
import PendingApprovals from "./PendingApprovals";
import UserForm from "./UserForm";

export default function Dashboard({ user, users, setUsers, company, expenses, setExpenses }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Welcome, {user.name} ({user.role})
      </h2>

      {/* Employee Section */}
      {user.role === "Employee" && (
        <>
          <ExpenseForm expenses={expenses} setExpenses={setExpenses} user={user} company={company} />
          <ExpenseHistory expenses={expenses} user={user} />
        </>
      )}

      {/* Admin Section */}
      {user.role === "Admin" && (
        <>
          <UserForm users={users} setUsers={setUsers} />
          <PendingApprovals expenses={expenses} setExpenses={setExpenses} user={user} />
        </>
      )}

      {/* Manager Section */}
      {user.role === "Manager" && (
        <>
          <PendingApprovals expenses={expenses} setExpenses={setExpenses} user={user} />
        </>
      )}
    </div>
  );
}
