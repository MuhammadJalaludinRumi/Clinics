import { Link } from "@inertiajs/react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      {/* Overlay (muncul kalau sidebar terbuka) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 text-lg font-bold border-b flex justify-between items-center">
          Menu
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-md hover:bg-gray-200"
          >
            ✕
          </button>
        </div>
        <nav className="p-4 flex flex-col space-y-3">
          <Link href="/dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/users" className="hover:text-blue-600">
            Users
          </Link>
          <Link href="/settings" className="hover:text-blue-600">
            Settings
          </Link>
        </nav>
      </aside>
    </>
  );
}
