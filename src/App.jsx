
import { useEffect, useState } from "react";
import Students from "./Components/Students";

const API = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const getStudents = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      const records = data.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city,
        department: [
          "Computer Science",
          "Information Technology",
          "Data Science",
          "Artificial Intelligence",
        ][(user.id - 1) % 4],
      }));

      setStudents(records);
    } catch (err) {
      setError("Unable to load student records. Check your internet.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    [
      student.name,
      student.email,
      student.city,
      student.department,
    ].some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-900 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-extrabold">
            Student<span className="text-violet-400">Sphere</span>
          </h1>

          <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            READ ONLY
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <section className="rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-950 via-slate-900 to-cyan-950 p-8 sm:p-12">
          <p className="mb-4 text-sm font-semibold tracking-widest text-cyan-300">
            STUDENT DATA PORTAL
          </p>

          <h2 className="text-4xl font-black sm:text-6xl">
            Every student.
            <br />
            <span className="text-violet-400">
              One smart view.
            </span>
          </h2>

          <p className="mt-5 text-gray-400">
            Student records powered by React and Fetch API.
          </p>

          <button
            onClick={getStudents}
            disabled={loading}
            className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500 disabled:opacity-50"
          >
            {loading ? "Loading..." : "↻ Refresh Records"}
          </button>
        </section>

        <section className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "TOTAL STUDENTS", value: students.length },
            { label: "SEARCH RESULTS", value: filteredStudents.length },
            { label: "DATA SOURCE", value: "API" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm text-gray-400">{item.label}</p>
              <h3 className="mt-3 text-3xl font-bold text-violet-300">
                {loading ? "—" : item.value}
              </h3>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-3xl font-bold">Student Records</h2>
          <p className="mt-2 text-gray-400">
            Search and view student details.
          </p>

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, city or department..."
            className="my-6 w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-violet-500"
          />

          {loading ? (
            <p className="py-16 text-center text-violet-300">
              Fetching student records...
            </p>
          ) : error ? (
            <div className="py-10 text-center">
              <p className="text-red-400">{error}</p>
              <button
                onClick={getStudents}
                className="mt-4 rounded-lg bg-violet-600 px-5 py-2"
              >
                Try Again
              </button>
            </div>
          ) : filteredStudents.length === 0 ? (
            <p className="py-12 text-center text-gray-400">
              No students found.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredStudents.map((student, index) => (
                <Students
                  key={student.id}
                  student={student}
                  index={index}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="mt-12 border-t border-white/10 py-6 text-center text-sm text-gray-500">
          STUDENTSPHERE · REACT PRACTICAL · FETCH API
        </footer>
      </main>
    </div>
  );
}

export default App;
