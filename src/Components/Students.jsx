
import React from "react";

function Students({ student, index }) {
  const colors = [
    "from-violet-500 to-purple-700",
    "from-cyan-500 to-blue-700",
    "from-pink-500 to-rose-700",
    "from-emerald-500 to-teal-700",
  ];

  const initials = student.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:bg-white/[0.07]">
      <div className="flex items-center justify-between">
        <span className="text-xs tracking-widest text-gray-500">
          STUDENT #{String(student.id).padStart(3, "0")}
        </span>

        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
          ● Active
        </span>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${
            colors[index % colors.length]
          } text-xl font-bold text-white shadow-lg`}
        >
          {initials}
        </div>

        <div className="min-w-0">
          <h2 className="break-words text-lg font-bold text-white">
            {student.name}
          </h2>

          <p className="text-sm text-violet-300">
            @{student.username}
          </p>
        </div>
      </div>

      <div className="my-5 border-t border-white/10" />

      <div className="space-y-4 text-sm">
        <p className="break-all text-gray-300">
          <span className="mr-2 text-violet-400">✉</span>
          {student.email}
        </p>

        <p className="text-gray-300">
          <span className="mr-2 text-cyan-400">⌘</span>
          {student.department}
        </p>

        <p className="text-gray-300">
          <span className="mr-2 text-pink-400">⌖</span>
          {student.city}
        </p>
      </div>

      <div className="mt-6 flex justify-between border-t border-white/10 pt-4 text-xs">
        <span className="text-gray-500">STUDENT ID</span>

        <span className="font-semibold text-violet-300">
          STU-{String(student.id).padStart(4, "0")}
        </span>
      </div>
    </div>
  );
}

export default Students;
