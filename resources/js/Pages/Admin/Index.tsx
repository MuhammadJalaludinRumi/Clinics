import { useState } from "react";
import AdminNavbar from "./Component/AdminNavbar";
import HeroSection from "./Component/HeroSection";
import StatsSection from "./Component/StatsSection";
import QuickActionsSection from "./Component/QuickActionsSection";
import TodayScheduleSection from "./Component/TodayScheduleSection";
import SystemStatusSection from "./Component/SystemStatusSection";
import RecentReservationsSection from "./Component/RecentReservationsSection";

// ==== Type definitions ====
interface User {
    name: string;
    role: string;
    avatar: string;
}

interface Stats {
    totalReservations: number;
    pendingReservations: number;
    todayPatients: number;
    totalPatients: number;
}

interface ScheduleItem {
    time: string;
    patient: string;
    complaint: string;
    status: "waiting" | "in-progress" | "completed";
}

interface Reservation {
    id: number;
    regNo: string;
    name: string;
    time: string;
    status: "pending" | "approved" | "rejected" | "completed";
}

interface DashboardData {
    stats: Stats;
    todaySchedule: ScheduleItem[];
    recentReservations: Reservation[];
}

export default function AdminDashboard() {
    const [currentUser] = useState<User>({
        name: "Dr. Sarah Wijaya",
        role: "Dokter Poli Paru",
        avatar:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    });

    // Mock data - dalam real app ini dari API
    const dashboardData: DashboardData = {
        stats: {
            totalReservations: 45,
            pendingReservations: 12,
            todayPatients: 8,
            totalPatients: 1234,
        },
        todaySchedule: [
            { time: "08:00", patient: "Ahmad Fauzi", complaint: "Batuk berkepanjangan", status: "waiting" },
            { time: "08:30", patient: "Siti Nurhaliza", complaint: "Sesak napas", status: "in-progress" },
            { time: "09:00", patient: "Budi Santoso", complaint: "Kontrol rutin", status: "completed" },
            { time: "09:30", patient: "Maria Gonzales", complaint: "Nyeri dada", status: "waiting" },
        ],
        recentReservations: [
            { id: 1, regNo: "PARU-20250827-001", name: "John Doe", time: "10 menit yang lalu", status: "pending" },
            { id: 2, regNo: "PARU-20250827-002", name: "Jane Smith", time: "25 menit yang lalu", status: "approved" },
            { id: 3, regNo: "PARU-20250827-003", name: "Bob Johnson", time: "1 jam yang lalu", status: "pending" },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavbar currentUser={currentUser} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <HeroSection currentUser={currentUser} />

                <div className="space-y-8">
                    <StatsSection stats={dashboardData.stats} />

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-2 space-y-8">
                            <QuickActionsSection />
                            <RecentReservationsSection reservations={dashboardData.recentReservations} />
                        </div>

                        <div className="space-y-8">
                            <TodayScheduleSection schedule={dashboardData.todaySchedule} />
                            <SystemStatusSection />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
