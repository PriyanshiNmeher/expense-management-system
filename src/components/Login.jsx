import { useState } from "react";

export default function Login({ setUser, users }) {
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = users.find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
    } else {
      alert("User not found! Ask Admin to create your account.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-16">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-6 w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
