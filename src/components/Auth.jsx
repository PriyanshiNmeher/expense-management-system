import { useState } from "react";

export default function Auth({ setUser, users, setUsers }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Admin");
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = users.find((u) => u.email === email);
    if (foundUser) setUser(foundUser);
    else alert("User not registered. Please signup first.");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const exists = users.some((u) => u.email === email);
    if (exists) return alert("Email already registered!");
    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      managerId: null,
    };
    setUsers([...users, newUser]);
    alert(`${role} created! You can login now.`);
    setIsLogin(true);
  };

  return (
    <div className="flex justify-center items-center mt-16">
      <form
        onSubmit={isLogin ? handleLogin : handleSignup}
        className="bg-white shadow-lg rounded-lg p-6 w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option>Admin</option>
              <option>Manager</option>
              <option>Employee</option>
            </select>
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-gray-500 text-sm">
          {isLogin ? "New user?" : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}
