interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white p-6 shadow dark:bg-slate-900">
      <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">📚 Reading Tracker</h1>
          <p className="mt-2 text-blue-100">Track your reading journey.</p>
        </div>

        <button
          onClick={onToggleDarkMode}
          className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
}

export default Header;
