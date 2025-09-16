import { ReactNode } from "react";
import Navbar from "../Components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar ada di dalam Navbar biar kontrol hamburger jalan */}
      <div className="flex-1">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
