export default function Navbar({ user, setUser }) {
  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Expense Management System</h1>
      {user && (
        <button
          onClick={() => setUser(null)}
          className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-gray-200"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
