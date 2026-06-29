import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import StatsBar from "./components/StatsBar";
import LibraryControls from "./components/LibraryControls";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <SearchBar />

        <StatsBar />

        <LibraryControls />

        <section className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">My Library</h2>

          <p className="text-gray-500">No books added yet.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
