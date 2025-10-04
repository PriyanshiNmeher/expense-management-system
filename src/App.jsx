import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import './index.css'

export default function App() {
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Auto-create default company and Admin on first load
    if (!company) {
      const defaultCompany = {
        id: 1,
        name: "My Company",
        country: "India",
        currency: "INR",
      };
      setCompany(defaultCompany);

      const adminUser = {
        id: Date.now(),
        name: "Admin User",
        email: "admin@company.com",
        role: "Admin",
        managerId: null,
      };
      setUsers([adminUser]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} setUser={setUser} />
      {!user ? (
        <Auth setUser={setUser} users={users} setUsers={setUsers} />
      ) : (
        <Dashboard
          user={user}
          users={users}
          setUsers={setUsers}
          company={company}
          expenses={expenses}
          setExpenses={setExpenses}
        />
      )}
    </div>
  );
}
