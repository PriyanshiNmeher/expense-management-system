import { useState } from "react";

export default function UserForm({ users, setUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Employee");
  const [managerId, setManagerId] = useState("");

  const managers = users.filter((u) => u.role === "Manager");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      managerId: role === "Employee" ? managerId || null : null, // only employees have manager
    };

    setUsers([...users, newUser]);

    setName("");
    setEmail("");
    setRole("Employee");
    setManagerId("");
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-4">
      <h3 className="text-lg font-bold mb-4">Create User</h3>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Employee</option>
          <option>Manager</option>
        </select>

        {role === "Employee" && (
          <select
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Manager</option>
            {managers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.email})
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Create User
        </button>
      </form>

      {users.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2">All Users</h4>
          <ul className="divide-y">
            {users.map((u) => (
              <li key={u.id} className="py-2 flex justify-between">
                <span>
                  {u.name} ({u.role}) - {u.email}
                  {u.managerId && (
                    <span className="text-gray-500">
                      {" "}
                      → Manager: {users.find((x) => x.id === u.managerId)?.name}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
