import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Top Navbar */}
      <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
        {/* Hamburger Button (kiri) */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* App Title (kanan) */}
        <h1 className="text-xl font-bold text-gray-800">My App</h1>
      </nav>

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />
    </div>
  );
}
